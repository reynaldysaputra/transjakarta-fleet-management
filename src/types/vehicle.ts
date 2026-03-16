import type { ApiRelationship, ApiRelationships } from './api'

export type VehicleStatus =
  | 'INCOMING_AT'
  | 'STOPPED_AT'
  | 'IN_TRANSIT_TO'
  | string

export interface VehicleCarriage {
  occupancy_status?: string | null
  occupancy_percentage?: number | null
  label?: string | null
}

export interface VehicleAttributes {
  updated_at?: string | null
  speed?: number | null
  revenue_status?: string | null
  occupancy_status?: string | null
  longitude?: number | null
  latitude?: number | null
  label?: string | null
  direction_id?: number | null
  current_stop_sequence?: number | null
  current_status?: VehicleStatus | null
  carriages?: VehicleCarriage[] | null
  bearing?: number | null
}

export interface VehicleRelationships extends ApiRelationships {
  trip?: ApiRelationship
  stop?: ApiRelationship
  route?: ApiRelationship
}

export interface Vehicle {
  type: string
  id: string
  attributes: VehicleAttributes
  relationships?: VehicleRelationships
}