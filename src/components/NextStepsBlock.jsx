import { Rocket } from 'lucide-react'

export default function NextStepsBlock({ steps }) {
  return (
    <div className="section-wash rounded-[2rem] border border-surface-border bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-green/10 text-accent-green">
          <Rocket size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-green">
            Implementacao guiada
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900">
            Proximos passos para tirar do papel
          </h3>
        </div>
      </div>

      <div className="space-y-5">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-green/25 bg-accent-green/10">
                <span className="text-sm font-bold text-accent-green">{index + 1}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="mt-2 h-12 w-px bg-gradient-to-b from-accent-green/30 to-surface-border" />
              )}
            </div>

            <div className="min-w-0 flex-1 rounded-[1.4rem] border border-surface-border bg-surface-raised px-4 py-4">
              <p className="text-base font-semibold text-slate-900">{step.passo}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detalhe}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 border-t border-surface-border pt-4 text-sm italic leading-relaxed text-slate-500">
        Essa trilha funciona bem em apresentacao porque mostra um caminho progressivo: comecar simples,
        validar com usuarios e depois adicionar automacao aos poucos.
      </p>
    </div>
  )
}
