import axios from 'axios'
import { apiClient } from './client'
import type { ApiErrorResponse, JsonApiResponse } from '../types/api'
import type { Vehicle } from "../types/vehicle"

export const getVehicles = async () => {
  const response = await apiClient.get<JsonApiResponse<Vehicle>>('/vehicles')
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