import { api } from '../api/client'

export async function applyToGroup(groupId) {
  const response = await api.post(
    `/groups/${groupId}/applications`,
  )
  return response.data.data
}

export async function approveApplication(groupId, applicationId) {
  const response = await api.post(
    `/groups/${groupId}/applications/${applicationId}/approve`,
  )
  return response.data.data
}

export async function rejectApplication(groupId, applicationId) {
  const response = await api.post(
    `/groups/${groupId}/applications/${applicationId}/reject`,
  )
  return response.data.data
}
