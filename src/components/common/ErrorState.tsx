interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

function ErrorState({
  message = 'Something went wrong while fetching data.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <h3 className="text-base font-semibold text-red-700">Failed to load data</h3>
      <p className="mt-2 text-sm text-red-600">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorState