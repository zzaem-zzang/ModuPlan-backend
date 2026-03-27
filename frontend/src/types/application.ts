export type CreateApplicationResponse = {
  applicationId: number
}

export type ProcessApplicationResponse = {
  applicationId: number
  status: 'APPROVED' | 'REJECTED'
}
