import type { ApiRelationships } from './api'

export interface RouteAttributes {
  long_name?: string | null
  short_name?: string | null
  description?: string | null
  direction_names?: string[] | null
  sort_order?: number | null
}

export interface Route {
  id: string
  type: 'route' | string
  attributes: RouteAttributes
  relationships?: ApiRelationships
}