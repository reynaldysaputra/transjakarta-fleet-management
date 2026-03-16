import { FiMapPin, FiClock, FiNavigation } from 'react-icons/fi'
import type { Vehicle } from '../../types/vehicle'
import { formatDateTime } from '../../utils/formatDate'
import StatusBadge from '../common/StatusBadge'

interface VehicleCardProps {
  vehicle: Vehicle
  onClick?: (vehicle: Vehicle) => void
}

function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const { attributes, relationships } = vehicle

  const routeId =
    relationships?.route?.data &&
    !Array.isArray(relationships.route.data) &&
    relationships.route.data.id

  const tripId =
    relationships?.trip?.data &&
    !Array.isArray(relationships.trip.data) &&
    relationships.trip.data.id

  return (
    <button
      type="button"
      onClick={() => onClick?.(vehicle)}
      className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Vehicle Label
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            {attributes.label || '-'}
          </h3>
        </div>

        <StatusBadge status={attributes.current_status} />
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <FiMapPin className="shrink-0" />
          <span>
            {attributes.latitude ?? '-'}, {attributes.longitude ?? '-'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FiClock className="shrink-0" />
          <span>{formatDateTime(attributes.updated_at)}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiNavigation className="shrink-0" />
          <span>Route: {routeId || '-'} | Trip: {tripId || '-'}</span>
        </div>
      </div>
    </button>
  )
}

export default VehicleCard