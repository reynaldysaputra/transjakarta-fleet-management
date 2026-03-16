interface EmptyStateProps {
  title?: string
  description?: string
}

function EmptyState({
  title = 'No data found',
  description = 'There is no data available to display at the moment.',
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  )
}

export default EmptyState