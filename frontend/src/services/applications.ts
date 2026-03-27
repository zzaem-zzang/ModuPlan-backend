import { api } from '../api/client'
import type { ApiResponse } from '../types/api'
import type { CreateApplicationResponse, ProcessApplicationResponse } from '../types/application'

export async function applyToGroup(groupId: number) {
  const response = await api.post<ApiResponse<CreateApplicationResponse>>(
    `/groups/${groupId}/applications`,
  )
  return response.data.data
}

export async function approveApplication(groupId: number, applicationId: number) {
  const response = await api.post<ApiResponse<ProcessApplicationResponse>>(
    `/groups/${groupId}/applications/${applicationId}/approve`,
  )
  return response.data.data
}

export async function rejectApplication(groupId: number, applicationId: number) {
  const response = await api.post<ApiResponse<ProcessApplicationResponse>>(
    `/groups/${groupId}/applications/${applicationId}/reject`,
  )
  return response.data.data
}
