import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { LocalStorage } from '@/shared/lib/LocalStorage'
import { baseQuery } from './baseQuery'

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  const url = typeof args === 'string' ? args : args.url
  if (result.error?.status === 401 && !url.includes('/token/')) {
    const refreshToken = LocalStorage.get('refreshToken')

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/token/refresh/',
          method: 'POST',
          body: { refresh: refreshToken },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        const { access, refresh } = refreshResult.data as { access: string; refresh?: string }
        LocalStorage.set('accessToken', access)
        if (refresh) LocalStorage.set('refreshToken', refresh)
        result = await baseQuery(args, api, extraOptions)
      } else {
        LocalStorage.delete('accessToken')
        LocalStorage.delete('refreshToken')
        window.location.href = '/login'
      }
    } else {
      window.location.href = '/login'
    }
  }

  return result
}
