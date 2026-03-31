import { useQuery } from '@tanstack/react-query'
import { fetchGroupDetail, fetchGroups, fetchMyGroups } from '../services/groups'

export function useGroupsQuery(params, enabled = true) {
  return useQuery({
    queryKey: ['groups', params],
    queryFn: () => fetchGroups(params),
    enabled,
  })
}

export function useGroupDetailQuery(groupId) {
  return useQuery({
    queryKey: ['groups', groupId],
    queryFn: () => fetchGroupDetail(groupId),
  })
}

export function useMyGroupsQuery(page, size, enabled) {
  return useQuery({
    queryKey: ['my-groups', page, size],
    queryFn: () => fetchMyGroups(page, size),
    enabled,
  })
}
