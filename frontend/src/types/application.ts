export type CreateApplicationResponse = {
  applicationId: number
}

export type ApplicationDecisionResponse = {
  applicationId: number
  status: 'APPROVED' | 'REJECTED'
}
