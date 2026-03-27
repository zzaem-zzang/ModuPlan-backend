import { api } from '../api/client'
import type { ApiResponse } from '../types/api'
import type {
  CreateScheduleRequest,
  CreateScheduleResponse,
  ScheduleListResponse,
} from '../types/schedule'

export async function fetchSchedules(groupId: number) {
  const response = await api.get<ApiResponse<ScheduleListResponse>>(`/groups/${groupId}/schedules`)
  return response.data.data
}

export async function createSchedule(groupId: number, payload: CreateScheduleRequest) {
  const response = await api.post<ApiResponse<CreateScheduleResponse>>(
    `/groups/${groupId}/schedules`,
    payload,
  )
  return response.data.data
}
