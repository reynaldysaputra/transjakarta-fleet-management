interface LoadingSpinnerProps {
  label?: string
  fullScreen?: boolean
}

function LoadingSpinner({
  label = 'Loading data...',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )

  if (fullScreen) {
    return <div className="min-h-[50vh]">{content}</div>
  }

  return content
}

export default LoadingSpinner