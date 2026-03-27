export type MyInfo = {
  userId: number
  email: string
  nickname: string
  createdAt: string
}

export type UserDetail = {
  userId: number
  nickname: string
  joinGroupCount: number
}

export type WithdrawRequest = {
  password: string
}
