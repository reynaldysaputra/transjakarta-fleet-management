import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import ErrorState from '../components/common/ErrorState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import VehicleFilters from '../components/vehicles/vehicleFilter'
import Pagination from '../components/pagination/Pagination'
import VehicleDetailModal from '../components/vehicles/vehicleDetailModal'
import VehicleGrid from '../components/vehicles/vehicleGrid'
import { getApiErrorMessage, getVehicles } from '../api/mbta'
import type { Vehicle } from '../types/vehicle'

function FleetManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>([])
  const [selectedTripIds, setSelectedTripIds] = useState<string[]>([])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await getVehicles()
      setVehicles(response.data)
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const routeId = vehicle.relationships?.route?.data?.id || ''
      const tripId = vehicle.relationships?.trip?.data?.id || ''

      const matchRoute =
        selectedRouteIds.length === 0 || selectedRouteIds.includes(routeId)

      const matchTrip =
        selectedTripIds.length === 0 || selectedTripIds.includes(tripId)

      return matchRoute && matchTrip
    })
  }, [vehicles, selectedRouteIds, selectedTripIds])

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const currentVehicles = filteredVehicles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setCurrentPage(1)
  }

  const handleRouteChange = (routeIds: string[]) => {
    setSelectedRouteIds(routeIds)
    setCurrentPage(1)
  }

  const handleTripChange = (tripIds: string[]) => {
    setSelectedTripIds(tripIds)
    setCurrentPage(1)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8">
          <p className="text-sm font-medium text-blue-600">PT Transjakarta - Technical Test</p>
          <h1 className="text-3xl font-bold text-slate-900">Fleet Management System</h1>
          <p className="mt-2 text-sm text-slate-600">
            Active vehicles from MBTA API
          </p>
        </header>

        {loading ? (
          <LoadingSpinner label="Fetching vehicle data..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchVehicles} />
        ) : (
          <>
            <VehicleFilters
              selectedRouteIds={selectedRouteIds}
              selectedTripIds={selectedTripIds}
              onRouteChange={handleRouteChange}
              onTripChange={handleTripChange}
            />

            {filteredVehicles.length === 0 ? (
              <EmptyState
                title="No vehicles found"
                description="No vehicle matched the selected route or trip filters."
              />
            ) : (
              <>
                <VehicleGrid
                  vehicles={currentVehicles}
                  onVehicleClick={setSelectedVehicle}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalData={filteredVehicles.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              </>
            )}
          </>
        )}
      </div>

      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </main>
  )
}

export default FleetManagementPage