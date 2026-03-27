import { useQuery } from '@tanstack/react-query'
import { fetchMyInfo, fetchUserDetail } from '../services/users'

export function useMyInfoQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: fetchMyInfo,
    enabled,
  })
}

export function useUserDetailQuery(userId: number, enabled: boolean) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserDetail(userId),
    enabled,
  })
}
