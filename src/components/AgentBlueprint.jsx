import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bot,
  Code2,
  GitBranch,
  Globe,
  Target,
  Users,
  Wrench,
} from 'lucide-react'

const COMPLEXITY_STYLE = {
  basico: 'badge-basico',
  intermediario: 'badge-intermediario',
  avancado: 'badge-avancado',
}

function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function Section({ icon: Icon, label, color = 'text-accent-cyan', children }) {
  return (
    <div className="section-wash relative rounded-[1.75rem] border border-surface-border bg-white p-5 shadow-sm sm:p-6">
      <div className={`mb-4 flex items-center gap-2 ${color}`}>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised">
          <Icon size={15} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function List({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent-cyan/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function FlowList({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-sm text-slate-700 sm:text-base">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-cyan/10 text-sm font-bold text-accent-cyan">
            {index + 1}
          </span>
          <span className="pt-1 leading-relaxed">{item.replace(/^\d+\.\s/, '')}</span>
        </li>
      ))}
    </ol>
  )
}

export default function AgentBlueprint({ data }) {
  const complexityKey = normalizeText(data.complexidade)
  const complexityClass = COMPLEXITY_STYLE[complexityKey] || 'badge-intermediario'

  return (
    <div className="space-y-5">
      <div className="section-wash card-elevated overflow-hidden rounded-[2rem] border border-accent-cyan/15 bg-white">
        <div className="h-2 bg-gradient-to-r from-accent-cyan via-accent-green to-accent-orange" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-accent-cyan to-accent-purple text-white shadow-lg shadow-accent-cyan/15">
                <Bot size={28} />
              </div>

              <div>
                <div className="inline-flex items-center rounded-full bg-surface-raised px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-cyan">
                  Blueprint principal
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {data.nome}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Gerado em {data.geradoEm}
                </p>
              </div>
            </div>

            <span className={`w-fit rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${complexityClass}`}>
              {data.complexidade}
            </span>
          </div>

          <div className="mt-6 grid gap-5 border-t border-surface-border pt-6 lg:grid-cols-[1.4fr_0.6fr]">
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              {data.descricao}
            </p>

            <div className="rounded-[1.5rem] border border-surface-border bg-surface-raised p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
                Leitura da proposta
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                O agente foi organizado para apresentar objetivo, funcionamento e possibilidades de
                implementacao de forma mais didatica.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Section icon={Target} label="Objetivo" color="text-accent-blue">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{data.objetivo}</p>
        </Section>

        <Section icon={Users} label="Publico-alvo" color="text-accent-pink">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{data.publicoAlvo}</p>
        </Section>
      </div>

      <Section icon={ArrowDownToLine} label="Entradas" color="text-accent-green">
        <List items={data.entradas} />
      </Section>

      <Section icon={GitBranch} label="Fluxo de funcionamento" color="text-accent-purple">
        <FlowList items={data.fluxo} />
      </Section>

      <Section icon={ArrowUpFromLine} label="Saidas" color="text-accent-cyan">
        <List items={data.saidas} />
      </Section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Section icon={Wrench} label="Ferramentas" color="text-accent-orange">
          <List items={data.ferramentas} />
        </Section>

        <Section icon={Globe} label="APIs possiveis" color="text-accent-blue">
          <List items={data.apis} />
        </Section>
      </div>

      <Section icon={Code2} label="Tecnologias sugeridas" color="text-accent-cyan">
        <div className="flex flex-wrap gap-2.5">
          {data.tecnologias.map((tech, index) => (
            <span
              key={index}
              className="rounded-full border border-accent-cyan/18 bg-surface-raised px-3.5 py-2 text-xs font-semibold text-accent-purple sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      <Section icon={AlertTriangle} label="Limitacoes" color="text-accent-orange">
        <List items={data.limitacoes} />
      </Section>
    </div>
  )
}
