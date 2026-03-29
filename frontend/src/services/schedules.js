import { api } from '../api/client'

export async function fetchSchedules(groupId) {
  const response = await api.get(`/groups/${groupId}/schedules`)
  return response.data.data
}

export async function createSchedule(groupId, payload) {
  const response = await api.post(
    `/groups/${groupId}/schedules`,
    payload,
  )
  return response.data.data
}
