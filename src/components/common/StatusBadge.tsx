interface StatusBadgeProps {
  status?: string | null
}

const getStatusClassName = (status?: string | null) => {
  switch (status) {
    case 'IN_TRANSIT_TO':
      return 'bg-blue-100 text-blue-700'
    case 'STOPPED_AT':
      return 'bg-amber-100 text-amber-700'
    case 'INCOMING_AT':
      return 'bg-emerald-100 text-emerald-700'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClassName(
        status,
      )}`}
    >
      {status || 'UNKNOWN'}
    </span>
  )
}

export default StatusBadge