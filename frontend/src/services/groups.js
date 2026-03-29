import { api } from '../api/client'

export async function fetchGroups(params) {
  const response = await api.get('/groups', { params })
  return response.data.data
}

export async function fetchGroupDetail(groupId) {
  const response = await api.get(`/groups/${groupId}`)
  return response.data.data
}

export async function fetchMyGroups(page, size) {
  const response = await api.get('/groups/me', {
    params: { page, size },
  })
  return response.data.data
}

export async function createGroup(payload) {
  const response = await api.post('/groups', payload)
  return response.data.data
}

export async function deleteGroup(groupId) {
  const response = await api.delete(`/groups/${groupId}`)
  return response.data
}
