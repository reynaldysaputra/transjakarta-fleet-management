import type { Vehicle } from '../../types/vehicle'
import VehicleCard from './vehicleCard'

interface VehicleGridProps {
  vehicles: Vehicle[]
  onVehicleClick?: (vehicle: Vehicle) => void
}

function VehicleGrid({ vehicles, onVehicleClick }: VehicleGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onClick={onVehicleClick}
        />
      ))}
    </div>
  )
}

export default VehicleGrid