import type { ApiRelationship, ApiRelationships } from './api'

export type VehicleStatus =
  | 'INCOMING_AT'
  | 'STOPPED_AT'
  | 'IN_TRANSIT_TO'
  | 'UNKNOWN'
  | string

export interface VehicleAttributes {
  label?: string | null
  current_status?: VehicleStatus | null
  latitude?: number | null
  longitude?: number | null
  updated_at?: string | null
  current_stop_sequence?: number | null
  direction_id?: number | null
  speed?: number | null
  bearing?: number | null
}

export interface VehicleRelationships extends ApiRelationships {
  route?: ApiRelationship
  trip?: ApiRelationship
  stop?: ApiRelationship
}

export interface Vehicle {
  id: string
  type: 'vehicle' | string
  attributes: VehicleAttributes
  relationships?: VehicleRelationships
}