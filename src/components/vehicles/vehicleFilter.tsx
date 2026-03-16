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

const PAGE_LIMIT = 20

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

  const [routePage, setRoutePage] = useState(1)
  const [tripPage, setTripPage] = useState(1)

  const [hasMoreRoutes, setHasMoreRoutes] = useState(true)
  const [hasMoreTrips, setHasMoreTrips] = useState(false)

  useEffect(() => {
    fetchRoutes(1, false)
  }, [])

  useEffect(() => {
    if (selectedRouteIds.length === 0) {
      setTrips([])
      setTripPage(1)
      setHasMoreTrips(false)
      onTripChange([])
      return
    }

    setTrips([])
    setTripPage(1)
    onTripChange([])
    fetchTrips(selectedRouteIds, 1, false)
  }, [selectedRouteIds])

  const fetchRoutes = async (page: number, append: boolean) => {
    try {
      setLoadingRoutes(true)

      const response = await getRoutes(page, PAGE_LIMIT)
      const newRoutes = response.data || []

      setRoutes((prev) => (append ? [...prev, ...newRoutes] : newRoutes))
      setRoutePage(page)
      setHasMoreRoutes(newRoutes.length === PAGE_LIMIT)
    } catch (error) {
      console.error('Failed to fetch routes:', error)
    } finally {
      setLoadingRoutes(false)
    }
  }

  const fetchTrips = async (
    routeIds: string[],
    page: number,
    append: boolean
  ) => {
    try {
      setLoadingTrips(true)

      const response = await getTrips(page, PAGE_LIMIT, '', routeIds)
      const newTrips = response.data || []

      setTrips((prev) => (append ? [...prev, ...newTrips] : newTrips))
      setTripPage(page)
      setHasMoreTrips(newTrips.length === PAGE_LIMIT)
    } catch (error) {
      console.error('Failed to fetch trips:', error)
      setHasMoreTrips(false)
    } finally {
      setLoadingTrips(false)
    }
  }

  const loadMoreRoutes = async () => {
    if (loadingRoutes || !hasMoreRoutes) return
    await fetchRoutes(routePage + 1, true)
  }

  const loadMoreTrips = async () => {
    if (loadingTrips || !hasMoreTrips || selectedRouteIds.length === 0) return
    await fetchTrips(selectedRouteIds, tripPage + 1, true)
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
    setTrips([])
    setTripPage(1)
    setHasMoreTrips(false)
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
                {loadingRoutes && routes.length === 0 ? (
                  <p className="text-sm text-slate-500">Loading routes...</p>
                ) : (
                  <>
                    {routes.map((route) => {
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
                    })}

                    {hasMoreRoutes && (
                      <button
                        type="button"
                        onClick={loadMoreRoutes}
                        disabled={loadingRoutes}
                        className="mt-2 w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
                      >
                        {loadingRoutes ? 'Loading...' : 'Load More Routes'}
                      </button>
                    )}
                  </>
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
            onClick={() => {
              if (selectedRouteIds.length === 0) return
              setShowTrips(!showTrips)
            }}
            disabled={selectedRouteIds.length === 0}
            className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          >
            <span>
              {selectedRouteIds.length === 0
                ? 'Select Route First'
                : getButtonLabel(selectedTripIds, 'Select Trips')}
            </span>
            <span>{showTrips ? '▲' : '▼'}</span>
          </button>

          {showTrips && selectedRouteIds.length > 0 && (
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
                {loadingTrips && trips.length === 0 ? (
                  <p className="text-sm text-slate-500">Loading trips...</p>
                ) : trips.length === 0 ? (
                  <p className="text-sm text-slate-500">No trips available</p>
                ) : (
                  <>
                    {trips.map((trip) => {
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
                    })}

                    {hasMoreTrips && (
                      <button
                        type="button"
                        onClick={loadMoreTrips}
                        disabled={loadingTrips}
                        className="mt-2 w-full rounded-md border px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
                      >
                        {loadingTrips ? 'Loading...' : 'Load More Trips'}
                      </button>
                    )}
                  </>
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