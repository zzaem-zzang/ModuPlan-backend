import { api } from '../api/client'
import type { ApiResponse } from '../types/api'
import type { MyInfo, UserDetail, WithdrawRequest } from '../types/user'

export async function fetchMyInfo() {
  const response = await api.get<ApiResponse<MyInfo>>('/users/me')
  return response.data.data
}

export async function fetchUserDetail(userId: number) {
  const response = await api.get<ApiResponse<UserDetail>>(`/users/${userId}`)
  return response.data.data
}

export async function withdraw(payload: WithdrawRequest) {
  const response = await api.delete<ApiResponse<null>>('/users/me', {
    data: payload,
  })
  return response.data
}
