import { api } from '../api/client'
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../types/auth'
import type { ApiResponse } from '../types/common'

export async function signup(payload: SignupRequest) {
  const response = await api.post<ApiResponse<SignupResponse>>('/api/auth/signup', payload)
  return response.data
}

export async function login(payload: LoginRequest) {
  const response = await api.post<ApiResponse<LoginResponse>>('/api/auth/login', payload)
  return response.data
}
