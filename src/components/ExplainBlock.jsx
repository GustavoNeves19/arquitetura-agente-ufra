import { ArrowRight, Lightbulb } from 'lucide-react'

export default function ExplainBlock({ data }) {
  const steps = [
    { label: 'Problema', value: data.problema, color: 'border-accent-orange bg-[#fffaf0]' },
    { label: 'Entrada', value: data.entrada, color: 'border-accent-green bg-[#f4fbf3]' },
    { label: 'Processamento', value: data.processamento, color: 'border-accent-cyan bg-[#f1faf4]' },
    { label: 'Saida', value: data.saida, color: 'border-accent-purple bg-[#f5faf6]' },
  ]

  return (
    <div className="section-wash h-full rounded-[1.75rem] border border-surface-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-orange/10 text-accent-orange">
          <Lightbulb size={18} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
            Logica da solucao
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900">
            Como esse agente foi pensado?
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.label}>
            <div className={`rounded-[1.4rem] border-l-4 px-4 py-4 ${step.color}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {step.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.value}</p>
            </div>

            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowRight size={14} className="rotate-90 text-accent-cyan/60" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-surface-border pt-4 text-sm italic leading-relaxed text-slate-500">
        A narrativa segue uma linha simples para apresentacao: explicar o problema, mostrar o que entra,
        contar como o agente pensa e encerrar com o que ele entrega.
      </p>
    </div>
  )
}
