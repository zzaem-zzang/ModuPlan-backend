import { useQuery } from '@tanstack/react-query'
import { fetchMyInfo, fetchUserDetail } from '../services/users'

export function useMyInfoQuery(enabled) {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: fetchMyInfo,
    enabled,
  })
}

export function useUserDetailQuery(userId, enabled) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserDetail(userId),
    enabled,
  })
}
