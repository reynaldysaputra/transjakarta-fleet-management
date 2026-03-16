import { format } from 'date-fns'

export const formatDateTime = (value?: string | null) => {
  if (!value) return '-'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return format(date, 'dd MMM yyyy, HH:mm:ss')
}