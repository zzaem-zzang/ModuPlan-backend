import type { PagedResponse } from './common'

export type GroupCategory =
  | 'SPORTS'
  | 'STUDY'
  | 'HOBBY'
  | 'CULTURE'
  | 'ETC'

export type GroupSummary = {
  groupId: number
  name: string
  description: string
  currentMembers: number
  maxMembers: number
  region: string
  category: GroupCategory
}

export type GroupLeader = {
  userId: number
  nickname: string
}

export type GroupDetail = {
  groupId: number
  name: string
  description: string
  category: GroupCategory
  region: string
  currentMembers: number
  maxMembers: number
  leader: GroupLeader
  isPublic: boolean
  createdAt: string
}

export type CreateGroupRequest = {
  name: string
  description: string
  category: GroupCategory
  maxMembers: number
  region: string
  isPublic: boolean
}

export type CreateGroupResponse = {
  groupId: number
}

export type MyGroupSummary = {
  groupId: number
  name: string
  role: 'LEADER' | 'MEMBER'
  currentMembers: number
  maxMembers: number
}

export type GroupListResponse = PagedResponse<GroupSummary>
export type MyGroupListResponse = PagedResponse<MyGroupSummary>
