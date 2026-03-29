import { api } from '../api/client'

export async function signup(payload) {
  const response = await api.post('/auth/signup', payload)
  return response.data.data
}

export async function login(payload) {
  const response = await api.post('/auth/login', payload)
  return response.data.data
}

export async function reissue(payload) {
  const response = await api.post('/auth/reissue', payload)
  return response.data.data
}

export async function logout() {
  const response = await api.post('/auth/logout')
  return response.data
}
