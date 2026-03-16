import { useCallback, useEffect, useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import ErrorState from '../components/common/ErrorState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import VehicleGrid from '../components/vehicles/vehicleGrid'
import { getApiErrorMessage, getVehicles } from '../api/mbta'
import type { Vehicle } from '../types/vehicle'

function FleetManagementPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicles = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    void fetchVehicles()
  }, [fetchVehicles])

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
            <h2 className='font-bold text-xs'>By Reynaldy Saputra</h2>
          </div>
        </header>

        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Vehicle Overview</h2>
            <p className="mt-2 text-sm text-slate-600">
              Active vehicles fetched from the MBTA Vehicle API.
            </p>
          </div>

          {loading ? (
            <LoadingSpinner label="Fetching vehicle data..." />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchVehicles} />
          ) : vehicles.length === 0 ? (
            <EmptyState
              title="No vehicles found"
              description="The API returned no active vehicle data."
            />
          ) : (
            <VehicleGrid vehicles={vehicles} />
          )}
        </section>
      </div>
    </main>
  )
}

export default FleetManagementPage