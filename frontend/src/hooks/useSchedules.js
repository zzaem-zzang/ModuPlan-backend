import { useQuery } from '@tanstack/react-query'
import { fetchSchedules } from '../services/schedules'

export function useSchedulesQuery(groupId, enabled) {
  return useQuery({
    queryKey: ['schedules', groupId],
    queryFn: () => fetchSchedules(groupId),
    enabled,
  })
}
