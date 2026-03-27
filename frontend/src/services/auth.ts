import { api } from '../api/client'
import type { ApiResponse } from '../types/api'
import type {
  LoginRequest,
  LoginResponse,
  ReissueRequest,
  ReissueResponse,
  SignupRequest,
  SignupResponse,
} from '../types/auth'

export async function signup(payload: SignupRequest) {
  const response = await api.post<ApiResponse<SignupResponse>>('/auth/signup', payload)
  return response.data.data
}

export async function login(payload: LoginRequest) {
  const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', payload)
  return response.data.data
}

export async function reissue(payload: ReissueRequest) {
  const response = await api.post<ApiResponse<ReissueResponse>>('/auth/reissue', payload)
  return response.data.data
}

export async function logout() {
  const response = await api.post<ApiResponse<null>>('/auth/logout')
  return response.data
}
