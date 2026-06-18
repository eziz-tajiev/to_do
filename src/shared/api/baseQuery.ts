import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LocalStorage } from '@/shared/lib/LocalStorage'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers) => {
    const token = LocalStorage.get('accessToken')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})
