import { Bot, Code2, Leaf, Sparkles, Zap } from 'lucide-react'

function apiTooltip(apiStatus, hasApiKey) {
  if (hasApiKey) return 'OpenAI conectada com sucesso'
  if (apiStatus?.keyConfigured) return apiStatus.lastError || 'Chave configurada, mas a conexao ainda nao foi validada'
  return 'Adicione OPENAI_API_KEY no ambiente do servidor'
}

export default function Header({ mode, setMode, hasApiKey, apiStatus }) {
  return (
    <header className="sticky top-0 z-50 border-b border-accent-cyan/10 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-accent-cyan to-accent-purple text-white shadow-lg shadow-accent-cyan/20">
            <Leaf size={24} className="absolute -left-1 top-1 text-white/70" />
            <Bot size={22} className="relative z-10" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Arquiteto de Agentes
              </h1>
              <span className="rounded-full bg-accent-cyan/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan">
                UFRA
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-600">
              Universidade Federal Rural da Amazonia
            </p>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-raised px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-purple">
              <Sparkles size={12} />
              Apresentacao para calouros
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-1 rounded-full border border-accent-cyan/10 bg-surface-card p-1.5 shadow-sm">
            <button
              onClick={() => setMode('template')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                mode === 'template'
                  ? 'bg-surface-raised text-accent-purple shadow-sm'
                  : 'text-slate-500 hover:text-accent-purple'
              }`}
            >
              <Code2 size={13} />
              Templates
            </button>
            <button
              onClick={() => setMode('api')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                mode === 'api'
                  ? 'bg-accent-cyan text-white shadow-sm shadow-accent-cyan/20'
                  : 'text-slate-500 hover:text-accent-cyan'
              }`}
              title={apiTooltip(apiStatus, hasApiKey)}
            >
              <Zap size={13} />
              LLM
              {!hasApiKey && <span className="text-[10px] font-medium opacity-75">(indisponivel)</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
