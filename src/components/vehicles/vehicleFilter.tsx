import { useEffect, useState } from 'react'
import { getRoutes, getTrips } from '../../api/mbta'
import type { Route } from '../../types/route'
import type { Trip } from '../../types/trip'

type VehicleFiltersProps = {
  selectedRouteIds: string[]
  selectedTripIds: string[]
  onRouteChange: (routeIds: string[]) => void
  onTripChange: (tripIds: string[]) => void
}

function VehicleFilters({
  selectedRouteIds,
  selectedTripIds,
  onRouteChange,
  onTripChange,
}: VehicleFiltersProps) {
  const [routes, setRoutes] = useState<Route[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [loadingRoutes, setLoadingRoutes] = useState(false)
  const [loadingTrips, setLoadingTrips] = useState(false)

  const [showRoutes, setShowRoutes] = useState(false)
  const [showTrips, setShowTrips] = useState(false)

  useEffect(() => {
    fetchRoutes()
  }, [])

  useEffect(() => {
    fetchTrips(selectedRouteIds)
    onTripChange([])
  }, [selectedRouteIds])

  const fetchRoutes = async () => {
    try {
      setLoadingRoutes(true)
      const response = await getRoutes(1, 100)
      setRoutes(response.data)
    } catch (error) {
      console.error('Failed to fetch routes:', error)
    } finally {
      setLoadingRoutes(false)
    }
  }

  const fetchTrips = async (routeIds: string[]) => {
    try {
      setLoadingTrips(true)
      const response = await getTrips(1, 100, '', routeIds)
      setTrips(response.data)
    } catch (error) {
      console.error('Failed to fetch trips:', error)
    } finally {
      setLoadingTrips(false)
    }
  }

  const toggleSelection = (
    value: string,
    selectedValues: string[],
    onChange: (values: string[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  const getButtonLabel = (selectedValues: string[], defaultLabel: string) => {
    if (selectedValues.length === 0) return defaultLabel
    return `${selectedValues.length} selected`
  }

  const clearRoutes = () => {
    onRouteChange([])
    onTripChange([])
  }

  const clearTrips = () => {
    onTripChange([])
  }

  return (
    <div className="mb-6 rounded-xl border bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Vehicle Filters</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Route Filter */}
        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Filter by Route
          </label>

          <button
            type="button"
            onClick={() => setShowRoutes(!showRoutes)}
            className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm"
          >
            <span>{getButtonLabel(selectedRouteIds, 'Select Routes')}</span>
            <span>{showRoutes ? '▲' : '▼'}</span>
          </button>

          {showRoutes && (
            <div className="absolute z-20 mt-2 w-full rounded-lg border bg-white p-3 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold">Routes</p>
                <button
                  type="button"
                  onClick={clearRoutes}
                  className="text-xs text-red-500"
                >
                  Clear
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {loadingRoutes ? (
                  <p className="text-sm text-slate-500">Loading routes...</p>
                ) : (
                  routes.map((route) => {
                    const routeName =
                      route.attributes.long_name ||
                      route.attributes.short_name ||
                      route.id

                    return (
                      <label
                        key={route.id}
                        className="flex items-start gap-2 rounded-md p-2 hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRouteIds.includes(route.id)}
                          onChange={() =>
                            toggleSelection(route.id, selectedRouteIds, onRouteChange)
                          }
                        />
                        <span className="text-sm">
                          <strong>{route.id}</strong> - {routeName}
                        </span>
                      </label>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Trip Filter */}
        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Filter by Trip
          </label>

          <button
            type="button"
            onClick={() => setShowTrips(!showTrips)}
            className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm"
          >
            <span>{getButtonLabel(selectedTripIds, 'Select Trips')}</span>
            <span>{showTrips ? '▲' : '▼'}</span>
          </button>

          {showTrips && (
            <div className="absolute z-20 mt-2 w-full rounded-lg border bg-white p-3 shadow-lg">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold">Trips</p>
                <button
                  type="button"
                  onClick={clearTrips}
                  className="text-xs text-red-500"
                >
                  Clear
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {loadingTrips ? (
                  <p className="text-sm text-slate-500">Loading trips...</p>
                ) : trips.length === 0 ? (
                  <p className="text-sm text-slate-500">No trips available</p>
                ) : (
                  trips.map((trip) => {
                    const tripName =
                      trip.attributes.headsign ||
                      trip.attributes.name ||
                      trip.id

                    return (
                      <label
                        key={trip.id}
                        className="flex items-start gap-2 rounded-md p-2 hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTripIds.includes(trip.id)}
                          onChange={() =>
                            toggleSelection(trip.id, selectedTripIds, onTripChange)
                          }
                        />
                        <span className="text-sm">
                          <strong>{trip.id}</strong> - {tripName}
                        </span>
                      </label>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VehicleFilters