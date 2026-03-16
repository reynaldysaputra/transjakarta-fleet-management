import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://api-v3.mbta.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})