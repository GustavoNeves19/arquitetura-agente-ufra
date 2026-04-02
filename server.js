import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = Number(process.env.PORT || 3001)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || ''
const OPENAI_MODEL = process.env.OPENAI_MODEL || process.env.VITE_OPENAI_MODEL || 'gpt-5-mini'
const DIST_PATH = path.join(__dirname, 'dist')

const app = express()

app.use(express.json({ limit: '1mb' }))

const auditEvents = []
const apiStatus = {
  apiAvailable: false,
  keyConfigured: Boolean(OPENAI_API_KEY),
  connectionCheckedAt: null,
  lastError: null,
  model: OPENAI_MODEL,
}

function createAuditEvent({ status, title, message, meta = {} }) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status,
    title,
    message,
    timestamp: new Date().toISOString(),
    meta,
  }
}

function pushAudit(event) {
  auditEvents.unshift(event)
  if (auditEvents.length > 20) {
    auditEvents.length = 20
  }

  console.log(
    JSON.stringify({
      scope: 'audit',
      ...event,
    }),
  )
}

const BLUEPRINT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    nome: { type: 'string' },
    descricao: { type: 'string' },
    objetivo: { type: 'string' },
    publicoAlvo: { type: 'string' },
    entradas: {
      type: 'array',
      items: { type: 'string' },
      minItems: 4,
      maxItems: 6,
    },
    fluxo: {
      type: 'array',
      items: { type: 'string' },
      minItems: 5,
      maxItems: 7,
    },
    saidas: {
      type: 'array',
      items: { type: 'string' },
      minItems: 4,
      maxItems: 5,
    },
    ferramentas: {
      type: 'array',
      items: { type: 'string' },
      minItems: 4,
      maxItems: 5,
    },
    apis: {
      type: 'array',
      items: { type: 'string' },
      minItems: 3,
      maxItems: 4,
    },
    tecnologias: {
      type: 'array',
      items: { type: 'string' },
      minItems: 4,
      maxItems: 5,
    },
    limitacoes: {
      type: 'array',
      items: { type: 'string' },
      minItems: 3,
      maxItems: 4,
    },
    complexidade: {
      type: 'string',
      enum: ['basico', 'intermediario', 'avancado'],
    },
    comoPensado: {
      type: 'object',
      additionalProperties: false,
      properties: {
        problema: { type: 'string' },
        entrada: { type: 'string' },
        processamento: { type: 'string' },
        saida: { type: 'string' },
      },
      required: ['problema', 'entrada', 'processamento', 'saida'],
    },
    llmVsAgente: {
      type: 'object',
      additionalProperties: false,
      properties: {
        tipo: {
          type: 'string',
          enum: ['LLM', 'Agente', 'LLM + Agente'],
        },
        nivel: {
          type: 'number',
          minimum: 0,
          maximum: 100,
        },
        razao: { type: 'string' },
      },
      required: ['tipo', 'nivel', 'razao'],
    },
    proximosPassos: {
      type: 'array',
      minItems: 5,
      maxItems: 5,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          passo: { type: 'string' },
          detalhe: { type: 'string' },
        },
        required: ['passo', 'detalhe'],
      },
    },
  },
  required: [
    'nome',
    'descricao',
    'objetivo',
    'publicoAlvo',
    'entradas',
    'fluxo',
    'saidas',
    'ferramentas',
    'apis',
    'tecnologias',
    'limitacoes',
    'complexidade',
    'comoPensado',
    'llmVsAgente',
    'proximosPassos',
  ],
}

const SYSTEM_PROMPT = `Voce e um arquiteto especialista em sistemas de agentes de IA.
Sua tarefa e gerar um blueprint tecnico-didatico detalhado para um agente de IA, em portugues do Brasil.

Escreva com linguagem acessivel para estudantes universitarios.
Preencha todos os campos do schema com conteudo especifico, pratico e coerente.

Regras importantes:
- Use "basico", "intermediario" ou "avancado" no campo complexidade.
- Em "fluxo", comece cada item com "1.", "2.", "3." e assim por diante.
- Em "apis", explique o papel de cada API em uma frase curta.
- Em "llmVsAgente.nivel", retorne um numero de 0 a 100.
- Evite texto fora do JSON estruturado.`

function extractOutputText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text
  }

  if (!Array.isArray(data.output)) return null

  const texts = data.output.flatMap(item => {
    if (!Array.isArray(item.content)) return []
    return item.content
      .filter(content => content.type === 'output_text' && typeof content.text === 'string')
      .map(content => content.text)
  })

  return texts.join('\n').trim() || null
}

function normalizeBlueprint(parsed) {
  return {
    ...parsed,
    complexidade:
      parsed.complexidade === 'basico'
        ? 'básico'
        : parsed.complexidade === 'avancado'
          ? 'avançado'
          : 'intermediário',
  }
}

async function verifyOpenAIConnection() {
  apiStatus.keyConfigured = Boolean(OPENAI_API_KEY)
  apiStatus.connectionCheckedAt = new Date().toISOString()

  if (!OPENAI_API_KEY) {
    apiStatus.apiAvailable = false
    apiStatus.lastError = 'OPENAI_API_KEY nao configurada'
    pushAudit(
      createAuditEvent({
        status: 'error',
        title: 'Chave da OpenAI ausente',
        message: 'O servidor subiu sem OPENAI_API_KEY configurada.',
      }),
    )
    return apiStatus
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `Falha ${response.status} ao validar a chave`)
    }

    apiStatus.apiAvailable = true
    apiStatus.lastError = null

    pushAudit(
      createAuditEvent({
        status: 'success',
        title: 'Conexao com a OpenAI validada',
        message: `A chave de API foi aceita com sucesso para o modelo ${OPENAI_MODEL}.`,
      }),
    )
  } catch (error) {
    apiStatus.apiAvailable = false
    apiStatus.lastError = error.message

    pushAudit(
      createAuditEvent({
        status: 'error',
        title: 'Falha na validacao da OpenAI',
        message: error.message,
      }),
    )
  }

  return apiStatus
}

async function generateBlueprint(userInput) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        {
          role: 'system',
          content: [{ type: 'input_text', text: SYSTEM_PROMPT }],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `Gere um blueprint completo para o seguinte agente:\n\n"${userInput}"`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'agent_blueprint',
          strict: true,
          schema: BLUEPRINT_SCHEMA,
        },
      },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `Erro ${response.status} na API da OpenAI`)
  }

  const data = await response.json()
  const text = extractOutputText(data)

  if (!text) {
    throw new Error('Resposta inesperada da OpenAI')
  }

  const parsed = JSON.parse(text)
  const normalized = normalizeBlueprint(parsed)

  return {
    ...normalized,
    categoria: 'llm',
    geradoEm: new Date().toLocaleString('pt-BR'),
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'arquiteto-agentes' })
})

app.get('/api/status', async (_req, res) => {
  if (apiStatus.keyConfigured && !apiStatus.connectionCheckedAt) {
    await verifyOpenAIConnection()
  }

  res.json(apiStatus)
})

app.get('/api/audit', (_req, res) => {
  res.json({
    events: auditEvents,
  })
})

app.post('/api/generate', async (req, res) => {
  const userInput = req.body?.userInput

  if (!userInput || typeof userInput !== 'string' || userInput.trim().length < 5) {
    return res.status(400).json({ error: 'Descreva melhor o problema para gerar um blueprint completo.' })
  }

  if (!OPENAI_API_KEY) {
    return res.status(503).json({ error: 'OPENAI_API_KEY nao configurada no servidor.' })
  }

  try {
    const result = await generateBlueprint(userInput)

    apiStatus.apiAvailable = true
    apiStatus.connectionCheckedAt = new Date().toISOString()
    apiStatus.lastError = null

    pushAudit(
      createAuditEvent({
        status: 'success',
        title: 'Blueprint gerado com sucesso',
        message: `Resultado gerado via OpenAI para a solicitacao com ${userInput.trim().length} caracteres.`,
        meta: {
          model: OPENAI_MODEL,
        },
      }),
    )

    return res.json({ result })
  } catch (error) {
    apiStatus.apiAvailable = false
    apiStatus.connectionCheckedAt = new Date().toISOString()
    apiStatus.lastError = error.message

    pushAudit(
      createAuditEvent({
        status: 'error',
        title: 'Falha ao gerar blueprint',
        message: error.message,
        meta: {
          model: OPENAI_MODEL,
        },
      }),
    )

    return res.status(500).json({ error: error.message || 'Erro interno ao gerar blueprint.' })
  }
})

app.use(express.static(DIST_PATH))

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next()
  }

  return res.sendFile(path.join(DIST_PATH, 'index.html'))
})

app.listen(PORT, async () => {
  console.log(`Servidor iniciado em http://0.0.0.0:${PORT}`)
  await verifyOpenAIConnection()
})
