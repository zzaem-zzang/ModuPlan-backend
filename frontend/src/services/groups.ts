import { api } from '../api/client'
import type { ApiResponse } from '../types/api'
import type {
  CreateGroupRequest,
  CreateGroupResponse,
  GroupDetail,
  GroupListParams,
  GroupListResponse,
  MyGroupListResponse,
} from '../types/group'

export async function fetchGroups(params: GroupListParams) {
  const response = await api.get<ApiResponse<GroupListResponse>>('/groups', { params })
  return response.data.data
}

export async function fetchGroupDetail(groupId: number) {
  const response = await api.get<ApiResponse<GroupDetail>>(`/groups/${groupId}`)
  return response.data.data
}

export async function fetchMyGroups(page: number, size: number) {
  const response = await api.get<ApiResponse<MyGroupListResponse>>('/groups/me', {
    params: { page, size },
  })
  return response.data.data
}

export async function createGroup(payload: CreateGroupRequest) {
  const response = await api.post<ApiResponse<CreateGroupResponse>>('/groups', payload)
  return response.data.data
}

export async function deleteGroup(groupId: number) {
  const response = await api.delete<ApiResponse<null>>(`/groups/${groupId}`)
  return response.data
}
