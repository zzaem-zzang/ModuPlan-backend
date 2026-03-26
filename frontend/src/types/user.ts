export type MyProfile = {
  userId: number
  email: string
  nickname: string
  createdAt: string
}

export type UserProfile = {
  userId: number
  nickname: string
  joinedGroupCount: number
}

export type DeleteUserRequest = {
  password: string
}
