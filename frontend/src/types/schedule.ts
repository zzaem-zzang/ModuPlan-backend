export type CreateScheduleRequest = {
  title: string
  description: string
  scheduledAt: string
  location: string
}

export type CreateScheduleResponse = {
  scheduleId: number
}

export type ScheduleItem = {
  scheduleId: number
  title: string
  description: string
  scheduledAt: string
  location: string
}

export type ScheduleListResponse = {
  schedules: ScheduleItem[]
}
