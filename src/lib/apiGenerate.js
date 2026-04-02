/**
 * apiGenerate.js
 * Integracao com OpenAI Responses API para geracao via LLM.
 *
 * Como usar:
 *   1. Adicione sua chave em .env: VITE_OPENAI_API_KEY=sk-...
 *   2. Opcionalmente defina o modelo: VITE_OPENAI_MODEL=gpt-5-mini
 *
 * ATENCAO: Em producao, nunca exponha a API key no frontend.
 * Use um backend para fazer as chamadas.
 */

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-5-mini'

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

export async function generateAgentWithLLM(userInput) {
  if (!API_KEY) {
    throw new Error('API key da OpenAI nao configurada')
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
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

export function hasApiKey() {
  return Boolean(API_KEY)
}
