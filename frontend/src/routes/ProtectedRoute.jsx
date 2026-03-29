import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from './route-paths'
import { useAuth } from '../store/auth/useAuth'

export function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated, isInitialized } = useAuth()

  if (!isInitialized) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname + location.search }} />
  }

  return <>{children}</>
}
