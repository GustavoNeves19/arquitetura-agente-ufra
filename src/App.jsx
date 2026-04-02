import { useEffect, useState } from 'react'
import Header from './components/Header'
import InputForm from './components/InputForm'
import AgentBlueprint from './components/AgentBlueprint'
import ExplainBlock from './components/ExplainBlock'
import LLMvsAgentBlock from './components/LLMvsAgentBlock'
import NextStepsBlock from './components/NextStepsBlock'
import AuditPanel from './components/AuditPanel'
import { generateAgent } from './lib/generateAgent'
import { generateAgentWithLLM, getApiStatus, getAuditTrail } from './lib/apiGenerate'

const INITIAL_API_STATUS = {
  apiAvailable: false,
  keyConfigured: false,
  connectionCheckedAt: null,
  lastError: null,
  model: null,
}

export default function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('template')
  const [apiStatus, setApiStatus] = useState(INITIAL_API_STATUS)
  const [auditEvents, setAuditEvents] = useState([])

  async function refreshAuditData() {
    const [status, audit] = await Promise.all([
      getApiStatus(),
      getAuditTrail(),
    ])

    setApiStatus(status)
    setAuditEvents(audit.events || [])

    return status
  }

  useEffect(() => {
    let isMounted = true

    async function loadBackendState() {
      try {
        const status = await refreshAuditData()
        if (isMounted && status.apiAvailable) {
          setMode('api')
        }
      } catch (loadError) {
        if (!isMounted) return
        setApiStatus({
          ...INITIAL_API_STATUS,
          lastError: loadError.message || 'Nao foi possivel consultar o backend',
        })
      }
    }

    loadBackendState()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleGenerate(text) {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let data
      if (mode === 'api') {
        try {
          data = await generateAgentWithLLM(text)
        } catch (apiErr) {
          console.warn('API falhou, usando templates:', apiErr.message)
          data = generateAgent(text)
        }
      } else {
        await new Promise(r => setTimeout(r, 800))
        data = generateAgent(text)
      }

      setResult(data)

      try {
        await refreshAuditData()
      } catch (auditError) {
        console.warn('Nao foi possivel atualizar a auditoria:', auditError.message)
      }

      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err.message || 'Erro ao gerar o blueprint.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setResult(null)
    setError(null)
    setInput('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative isolate min-h-screen grid-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-white/50 to-transparent" />
        <div className="absolute -left-28 top-28 h-72 w-72 rounded-full bg-accent-green/10 blur-3xl" />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-accent-cyan/10 blur-3xl" />
      </div>

      <Header
        mode={mode}
        setMode={setMode}
        hasApiKey={apiStatus.apiAvailable}
        apiStatus={apiStatus}
      />

      <main className="relative mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        <InputForm
          input={input}
          setInput={setInput}
          onGenerate={handleGenerate}
          loading={loading}
          hasResult={Boolean(result)}
          onReset={handleReset}
        />

        <div className="mt-6">
          <AuditPanel apiStatus={apiStatus} auditEvents={auditEvents} />
        </div>

        {error && (
          <div className="mt-6 rounded-3xl border border-red-200 bg-white px-5 py-4 text-sm text-red-700 shadow-sm animate-fade-in">
            <span className="font-semibold">Erro:</span> {error}
          </div>
        )}

        {result && (
          <div id="result-section" className="mt-10 space-y-8 animate-slide-up">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-cyan">
                  Blueprint gerado
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Estrutura pronta para apresentar e explicar.
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  O resultado abaixo organiza a ideia do agente com leitura mais leve, visual institucional
                  e foco educacional para o contexto da UFRA.
                </p>
              </div>
            </div>

            <AgentBlueprint data={result} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ExplainBlock data={result.comoPensado} />
              <LLMvsAgentBlock data={result.llmVsAgente} />
            </div>

            <NextStepsBlock steps={result.proximosPassos} />

            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="rounded-full border border-accent-cyan/20 bg-white px-6 py-3 text-sm font-semibold text-accent-purple shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-cyan/35 hover:text-accent-cyan"
              >
                Desenhar outro agente
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
