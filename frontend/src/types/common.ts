export type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export type PagedResponse<T> = {
  content: T[]
  page: number
  size: number
  totalElements: number
}
