import type { Vehicle } from '../../types/vehicle'

type VehicleDetailModalProps = {
  vehicle: Vehicle | null
  onClose: () => void
}

function VehicleDetailModal({ vehicle, onClose }: VehicleDetailModalProps) {
  if (!vehicle) return null

  const label = vehicle.attributes.label || '-'
  const status = vehicle.attributes.current_status || '-'
  const latitude = vehicle.attributes.latitude ?? '-'
  const longitude = vehicle.attributes.longitude ?? '-'
  const updatedAt = vehicle.attributes.updated_at || '-'

  const routeId = vehicle.relationships?.route?.data?.id || '-'
  const tripId = vehicle.relationships?.trip?.data?.id || '-'
  const stopId = vehicle.relationships?.stop?.data?.id || '-'

  const speed = vehicle.attributes.speed ?? '-'
  const directionId = vehicle.attributes.direction_id ?? '-'
  const bearing = vehicle.attributes.bearing ?? '-'
  const revenueStatus = vehicle.attributes.revenue_status || '-'
  const occupancyStatus = vehicle.attributes.occupancy_status || '-'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Vehicle Detail</h2>
            <p className="text-sm text-slate-500">Detailed information of selected vehicle</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Main Information</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Label:</strong> {label}</p>
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Updated At:</strong> {updatedAt}</p>
              <p><strong>Revenue Status:</strong> {revenueStatus}</p>
              <p><strong>Occupancy Status:</strong> {occupancyStatus}</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Location</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Latitude:</strong> {latitude}</p>
              <p><strong>Longitude:</strong> {longitude}</p>
              <p><strong>Direction ID:</strong> {directionId}</p>
              <p><strong>Bearing:</strong> {bearing}</p>
              <p><strong>Speed:</strong> {speed}</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Route & Trip</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Route ID:</strong> {routeId}</p>
              <p><strong>Trip ID:</strong> {tripId}</p>
              <p><strong>Stop ID:</strong> {stopId}</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Additional Data</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Vehicle ID:</strong> {vehicle.id}</p>
              <p><strong>Type:</strong> {vehicle.type || '-'}</p>
              <p><strong>Current Stop Sequence:</strong> {vehicle.attributes.current_stop_sequence ?? '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleDetailModal