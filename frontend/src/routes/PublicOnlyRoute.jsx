import { Navigate } from 'react-router-dom'
import { ROUTES } from './route-paths'
import { useAuth } from '../store/auth/useAuth'

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isInitialized } = useAuth()

  if (!isInitialized) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />
  }

  return <>{children}</>
}
