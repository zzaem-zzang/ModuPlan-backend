export type ScheduleItem = {
  scheduleId: number
  title: string
  description: string | null
  scheduledAt: string
  location: string | null
}

export type ScheduleListResponse = {
  schedules: ScheduleItem[]
}

export type CreateScheduleRequest = {
  title: string
  description: string
  scheduledAt: string
  location: string
}

export type CreateScheduleResponse = {
  scheduleId: number
}
