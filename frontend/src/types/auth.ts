export type SignupRequest = {
  email: string
  password: string
  nickname: string
}

export type SignupResponse = {
  userId: number
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  id: number
  nickname: string
  accessToken: string
  refreshToken: string
}

export type ReissueRequest = {
  refreshToken: string
}

export type ReissueResponse = {
  accessToken: string
  refreshToken: string
}
