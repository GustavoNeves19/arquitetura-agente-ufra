import { ArrowRight, GraduationCap, Leaf, RotateCcw, Sparkles } from 'lucide-react'

const EXAMPLES = [
  {
    label: 'Guia do Calouro',
    text: 'Quero um agente para apoiar calouros universitarios na adaptacao a universidade, respondendo duvidas sobre servicos, rotinas e recursos do campus.',
  },
  {
    label: 'Organizar estudos',
    text: 'Quero um agente para ajudar estudantes universitarios a organizar suas disciplinas, criar cronogramas de estudo e se preparar para provas.',
  },
  {
    label: 'Eventos da UFRA',
    text: 'Quero um agente para informar eventos, palestras e oportunidades academicas para estudantes que estao chegando na universidade.',
  },
  {
    label: 'Gestao de tarefas',
    text: 'Quero um agente para organizar tarefas de um time de desenvolvimento, priorizar demandas e avisar sobre prazos em risco.',
  },
]

export default function InputForm({ input, setInput, onGenerate, loading, hasResult, onReset }) {
  function handleSubmit(e) {
    e.preventDefault()
    onGenerate(input)
  }

  function handleExample(text) {
    setInput(text)
    document.getElementById('main-input')?.focus()
  }

  return (
    <section className="pb-8 pt-10 sm:pt-14">
      {!hasResult && (
        <div className="hero-banner rounded-[2rem] px-6 py-8 text-white sm:px-10 sm:py-12">
          <div className="relative z-10 max-w-3xl">
            <div className="hero-ribbon inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              <Leaf size={14} />
              Visual institucional e educativo
            </div>

            <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Apresente agentes com mais clareza, energia e cara de UFRA.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
              Transforme uma ideia em um blueprint visual mais acolhedor para calouros, com linguagem
              simples, identidade em verde e branco e explicacoes que fazem sentido em sala ou apresentacao.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="hero-ribbon rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">Tom</p>
                <p className="mt-1 text-sm font-semibold">Mais humano e menos painel tecnico</p>
              </div>
              <div className="hero-ribbon rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">Cores</p>
                <p className="mt-1 text-sm font-semibold">Paleta verde e branca inspirada na UFRA</p>
              </div>
              <div className="hero-ribbon rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">Uso</p>
                <p className="mt-1 text-sm font-semibold">Perfeito para explicar ideias a calouros</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`${!hasResult ? '-mt-6 sm:-mt-10' : ''} relative z-10`}>
        <div className="card-elevated rounded-[2rem] border border-surface-border bg-white p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                Descreva o desafio
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900">
                Qual agente voce quer apresentar?
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-surface-raised px-4 py-2 text-xs font-semibold text-accent-purple">
              <GraduationCap size={14} />
              Foco em aprendizado e demonstracao
            </div>
          </div>

          <div className="relative rounded-[1.6rem] border-gradient">
            <textarea
              id="main-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ex: Quero um agente para recepcionar calouros da UFRA, explicar setores do campus, apresentar servicos e orientar os primeiros passos na universidade..."
              rows={6}
              className="w-full resize-none rounded-[1.6rem] border border-surface-border bg-surface-card px-5 py-5 text-[15px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-accent-cyan/35 focus:outline-none transition-all duration-200"
              disabled={loading}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit(e)
              }}
            />

            <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-400 select-none">
              {input.length > 0 ? `${input.length} chars` : 'Ctrl+Enter para enviar'}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-slate-500">
              Use uma necessidade real da universidade ou de um projeto academico para gerar um exemplo mais convincente.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-green px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-cyan/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="flex gap-1">
                      <span className="dot-1 h-1.5 w-1.5 rounded-full bg-white" />
                      <span className="dot-2 h-1.5 w-1.5 rounded-full bg-white" />
                      <span className="dot-3 h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    Gerando blueprint...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    Desenhar agente
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              {hasResult && (
                <button
                  type="button"
                  onClick={onReset}
                  className="flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-accent-cyan/30 hover:text-accent-cyan"
                >
                  <RotateCcw size={14} />
                  Novo
                </button>
              )}
            </div>
          </div>

          {!hasResult && (
            <div className="mt-7 border-t border-surface-border pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Sugestoes para demonstrar
              </p>
              <div className="flex flex-wrap gap-2.5">
                {EXAMPLES.map(example => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => handleExample(example.text)}
                    className="rounded-full border border-surface-border bg-surface-raised px-4 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-cyan/25 hover:bg-white hover:text-accent-purple"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
