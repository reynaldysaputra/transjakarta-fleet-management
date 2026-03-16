import axios from 'axios'
import { apiClient } from './client'
import type { ApiErrorResponse, JsonApiResponse } from '../types/api'
import type { Vehicle } from '../types/vehicle'
import type { Route } from '../types/route'
import type { Trip } from '../types/trip'

export const getVehicles = async () => {
  const response = await apiClient.get<JsonApiResponse<Vehicle>>('/vehicles')
  return response.data
}

export const getRoutes = async (page = 1, limit = 20, search = '') => {
  const params: Record<string, string | number> = {
    'page[limit]': limit,
    'page[offset]': (page - 1) * limit,
  }

  if (search.trim()) {
    params['filter[id]'] = search.trim()
  }

  const response = await apiClient.get<JsonApiResponse<Route>>('/routes', { params })
  return response.data
}

export const getTrips = async (
  page = 1,
  limit = 20,
  search = '',
  routeIds: string[] = []
) => {
  const params: Record<string, string | number> = {
    'page[limit]': limit,
    'page[offset]': (page - 1) * limit,
  }

  if (search.trim()) {
    params['filter[id]'] = search.trim()
  }

  if (routeIds.length > 0) {
    params['filter[route]'] = routeIds.join(',')
  }

  const response = await apiClient.get<JsonApiResponse<Trip>>('/trips', { params })
  return response.data
}

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const apiMessage = error.response?.data?.errors?.[0]?.detail

    if (apiMessage) {
      return apiMessage
    }

    const status = error.response?.status

    if (status === 403) {
      return 'Access to the MBTA API is forbidden.'
    }

    if (status === 429) {
      return 'Rate limit exceeded. Please try again in a moment.'
    }

    if (status === 400) {
      return 'Invalid request sent to the API.'
    }
  }

  return 'Failed to fetch vehicle data. Please try again.'
}