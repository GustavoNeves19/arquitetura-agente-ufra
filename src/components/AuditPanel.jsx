import { Activity, CheckCircle2, Clock3, ServerCrash } from 'lucide-react'

function formatTimestamp(value) {
  if (!value) return 'aguardando verificacao'
  return new Date(value).toLocaleString('pt-BR')
}

function badgeClasses(status) {
  if (status === 'success') {
    return 'bg-green-50 text-green-700 border-green-200'
  }

  if (status === 'error') {
    return 'bg-red-50 text-red-700 border-red-200'
  }

  return 'bg-surface-raised text-slate-600 border-surface-border'
}

function iconFor(status) {
  if (status === 'success') {
    return <CheckCircle2 size={16} />
  }

  if (status === 'error') {
    return <ServerCrash size={16} />
  }

  return <Clock3 size={16} />
}

export default function AuditPanel({ apiStatus, auditEvents }) {
  const isConnected = apiStatus?.apiAvailable
  const connectionState = isConnected ? 'success' : apiStatus?.keyConfigured ? 'warning' : 'idle'

  return (
    <section className="section-wash rounded-[1.75rem] border border-surface-border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan">
              <Activity size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                Auditoria operacional
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900">
                Validacao da API e geracoes
              </h3>
            </div>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${badgeClasses(connectionState)}`}>
          {iconFor(connectionState)}
          {isConnected ? 'OpenAI conectada' : apiStatus?.keyConfigured ? 'Chave configurada' : 'API indisponivel'}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-surface-border bg-surface-raised p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Modelo</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{apiStatus?.model || 'nao informado'}</p>
        </div>

        <div className="rounded-[1.4rem] border border-surface-border bg-surface-raised p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ultima verificacao</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {formatTimestamp(apiStatus?.connectionCheckedAt)}
          </p>
          {apiStatus?.lastError && (
            <p className="mt-2 text-sm text-red-600">{apiStatus.lastError}</p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {auditEvents?.length ? (
          auditEvents.map(event => (
            <div
              key={event.id}
              className="rounded-[1.3rem] border border-surface-border bg-white px-4 py-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${badgeClasses(event.status)}`}>
                    {iconFor(event.status)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                    <p className="text-sm text-slate-600">{event.message}</p>
                  </div>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  {formatTimestamp(event.timestamp)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.3rem] border border-dashed border-surface-border bg-surface-raised px-4 py-4 text-sm text-slate-500">
            Nenhum evento de auditoria ainda. Quando a API validar a chave e um blueprint subir com sucesso,
            os registros vao aparecer aqui.
          </div>
        )}
      </div>
    </section>
  )
}
