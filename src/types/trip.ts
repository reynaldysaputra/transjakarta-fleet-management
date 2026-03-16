import type { ApiRelationships } from './api'

export interface TripAttributes {
  headsign?: string | null
  name?: string | null
  direction_id?: number | null
}

export interface Trip {
  id: string
  type: 'trip' | string
  attributes: TripAttributes
  relationships?: ApiRelationships
}