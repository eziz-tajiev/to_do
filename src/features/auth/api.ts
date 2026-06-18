import { api } from '@/shared/api'
import { LocalStorage } from '@/shared/lib/LocalStorage'

type LoginRequest = {
  username: string
  password: string
}

type LoginResponse = {
  access: string
  refresh: string
}

type RegisterRequest = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/token/',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        const { data } = await queryFulfilled
        LocalStorage.set('accessToken', data.access)
        LocalStorage.set('refreshToken', data.refresh)
      },
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (body) => ({
        url: '/register/',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
