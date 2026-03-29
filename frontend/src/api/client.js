import axios from 'axios'
import { clearStoredSession, getStoredSession, setStoredSession } from '../store/auth/auth-storage'

export class ApiRequestError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

function rejectWithApiError(error) {
  const status = error.response?.status ?? 500
  const message = error.response?.data?.message ?? error.message ?? '요청 처리 중 오류가 발생했습니다.'
  return Promise.reject(new ApiRequestError(message, status))
}

let refreshPromise = null

async function refreshAccessToken() {
  const currentSession = getStoredSession()

  if (!currentSession?.refreshToken) {
    clearStoredSession()
    return null
  }

  try {
    const response = await refreshClient.post('/auth/reissue', {
      refreshToken: currentSession.refreshToken,
    })

    const nextTokens = response.data.data
    const nextSession = {
      ...currentSession,
      accessToken: nextTokens.accessToken,
      refreshToken: nextTokens.refreshToken,
    }

    setStoredSession(nextSession)
    return nextSession.accessToken
  } catch {
    clearStoredSession()
    window.dispatchEvent(new Event('auth:expired'))
    window.location.assign('/login')
    return null
  }
}

api.interceptors.request.use((config) => {
  const currentSession = getStoredSession()

  if (currentSession?.accessToken) {
    config.headers.Authorization = `Bearer ${currentSession.accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const status = error.response?.status
    const path = request?.url ?? ''
    const isAuthPath =
      path.includes('/auth/login') || path.includes('/auth/signup') || path.includes('/auth/reissue')

    if (status === 401 && request && !request._retry && !isAuthPath && getStoredSession()?.refreshToken) {
      request._retry = true

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null
        })
      }

      const nextToken = await refreshPromise

      if (nextToken) {
        request.headers.Authorization = `Bearer ${nextToken}`
        return api(request)
      }
    }

    return rejectWithApiError(error)
  },
)
