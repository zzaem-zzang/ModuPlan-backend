import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../routes/route-paths'
import { setStoredSession } from '../store/auth/auth-storage'

export function OAuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const userId = searchParams.get('userId')
    const nickname = searchParams.get('nickname')
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (!userId || !nickname || !accessToken || !refreshToken) {
      navigate(ROUTES.login, { replace: true })
      return
    }

    setStoredSession({
      userId: Number(userId),
      nickname,
      accessToken,
      refreshToken,
    })

    window.location.replace(ROUTES.home)
  }, [navigate, searchParams])

  return (
    <div className="grid min-h-[40vh] place-items-center p-8 text-sm font-semibold text-slate-600">
      Login processing...
    </div>
  )
}
