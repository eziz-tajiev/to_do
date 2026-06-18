import { Navigate, Outlet } from 'react-router-dom'
import { LocalStorage } from '@/shared/lib/LocalStorage'

export const ProtectedRoute = () => {
  const token = LocalStorage.get('accessToken')
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export const GuestRoute = () => {
  const token = LocalStorage.get('accessToken')
  return token ? <Navigate to="/" replace /> : <Outlet />
}
