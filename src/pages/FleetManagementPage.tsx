import EmptyState from '../components/common/EmptyState'

function FleetManagementPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-blue-600">PT Transjakarta - Technical Test</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Fleet Management System
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Monitor active vehicles, filter by route and trip, and inspect vehicle
              details in a clean, responsive interface.
            </p>
          </div>
        </header>

        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Vehicle Overview</h2>
            <p className="mt-2 text-sm text-slate-600">
              API integration will be added in the next step.
            </p>
          </div>

          <EmptyState
            title="Vehicle data is not loaded yet"
          />
        </section>
      </div>
    </main>
  )
}

export default FleetManagementPage