import { useEffect, useMemo, useState } from 'react'
import { clearStoredSession, getStoredSession, setStoredSession } from './auth-storage'
import { login, logout, signup } from '../../services/auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setSession(getStoredSession())
    setIsInitialized(true)

    const handleAuthExpired = () => {
      clearStoredSession()
      setSession(null)
    }

    window.addEventListener('auth:expired', handleAuthExpired)
    return () => window.removeEventListener('auth:expired', handleAuthExpired)
  }, [])

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isInitialized,
      async loginAction(payload) {
        const result = await login(payload)
        const nextSession = {
          userId: result.id,
          nickname: result.nickname,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        }
        setStoredSession(nextSession)
        setSession(nextSession)
      },
      async signupAction(payload) {
        await signup(payload)
      },
      async logoutAction() {
        try {
          if (getStoredSession()) {
            await logout()
          }
        } finally {
          clearStoredSession()
          setSession(null)
        }
      },
      clearSession() {
        clearStoredSession()
        setSession(null)
      },
    }),
    [isInitialized, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
