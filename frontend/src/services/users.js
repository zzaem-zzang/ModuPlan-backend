import { api } from '../api/client'

export async function fetchMyInfo() {
  const response = await api.get('/users/me')
  return response.data.data
}

export async function fetchUserDetail(userId) {
  const response = await api.get(`/users/${userId}`)
  return response.data.data
}

export async function withdraw(payload) {
  const response = await api.delete('/users/me', {
    data: payload,
  })
  return response.data
}
