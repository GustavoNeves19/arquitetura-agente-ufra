import { Brain, BrainCircuit, Sparkles, Zap } from 'lucide-react'

const TYPE_CONFIG = {
  LLM: {
    icon: Brain,
    color: 'text-accent-blue',
    border: 'border-accent-blue/20',
    badge: 'bg-accent-blue/10',
    label: 'Principalmente LLM',
    desc: 'O maior valor esta na geracao de texto e interpretacao feita pelo modelo.',
  },
  Agente: {
    icon: BrainCircuit,
    color: 'text-accent-cyan',
    border: 'border-accent-cyan/20',
    badge: 'bg-accent-cyan/10',
    label: 'Agente completo',
    desc: 'Executa tarefas, usa ferramentas e interage com outros sistemas.',
  },
  'LLM + Agente': {
    icon: Zap,
    color: 'text-accent-green',
    border: 'border-accent-green/20',
    badge: 'bg-accent-green/10',
    label: 'LLM com capacidades agenticas',
    desc: 'Combina raciocinio textual com acoes praticas e automacao.',
  },
}

export default function LLMvsAgentBlock({ data }) {
  const config = TYPE_CONFIG[data.tipo] || TYPE_CONFIG['LLM + Agente']
  const Icon = config.icon
  const percentage = Math.min(100, Math.max(0, data.nivel))

  return (
    <div className={`section-wash h-full rounded-[1.75rem] border bg-white p-6 shadow-sm ${config.border}`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Leitura conceitual
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900">
            Isso e mais LLM ou agente?
          </h3>
        </div>
      </div>

      <div className={`flex items-start gap-4 rounded-[1.5rem] border p-4 ${config.border} ${config.badge}`}>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white ${config.color}`}>
          <Icon size={22} />
        </div>

        <div>
          <p className={`text-sm font-bold ${config.color}`}>{config.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{config.desc}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span>LLM puro</span>
          <span>Agente autonomo</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-surface-raised">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-green transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-2 text-right text-xs font-semibold text-accent-purple">
          {percentage}% agentico
        </p>
      </div>

      <p className="mt-6 border-t border-surface-border pt-4 text-sm leading-relaxed text-slate-700">
        {data.razao}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[1.25rem] border border-surface-border bg-surface-raised p-4 text-center">
          <p className="text-sm font-semibold text-slate-700">LLM</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">Gera texto</p>
        </div>
        <div className="rounded-[1.25rem] border border-surface-border bg-surface-raised p-4 text-center">
          <p className="text-sm font-semibold text-slate-700">Agente</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">Age no mundo</p>
        </div>
      </div>
    </div>
  )
}
