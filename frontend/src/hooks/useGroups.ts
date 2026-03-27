import { useQuery } from '@tanstack/react-query'
import { fetchGroupDetail, fetchGroups, fetchMyGroups } from '../services/groups'
import type { GroupListParams } from '../types/group'

export function useGroupsQuery(params: GroupListParams) {
  return useQuery({
    queryKey: ['groups', params],
    queryFn: () => fetchGroups(params),
  })
}

export function useGroupDetailQuery(groupId: number) {
  return useQuery({
    queryKey: ['groups', groupId],
    queryFn: () => fetchGroupDetail(groupId),
  })
}

export function useMyGroupsQuery(page: number, size: number, enabled: boolean) {
  return useQuery({
    queryKey: ['my-groups', page, size],
    queryFn: () => fetchMyGroups(page, size),
    enabled,
  })
}
