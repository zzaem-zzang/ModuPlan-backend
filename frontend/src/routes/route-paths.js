export const ROUTES = {
  home: '/',
  login: '/login',
  oauthCallback: '/oauth/callback',
  signup: '/signup',
  groups: '/groups',
  groupDetail: (groupId) => `/groups/${groupId}`,
  myGroups: '/my-groups',
  createGroup: '/groups/new',
  myInfo: '/me',
  groupApplications: (groupId) => `/groups/${groupId}/applications/manage`,
  groupSchedules: (groupId) => `/groups/${groupId}/schedules`,
}
