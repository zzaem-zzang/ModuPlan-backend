import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { GroupApplicationsPage } from '../pages/GroupApplicationsPage'
import { GroupCreatePage } from '../pages/GroupCreatePage'
import { GroupDetailPage } from '../pages/GroupDetailPage'
import { GroupListPage } from '../pages/GroupListPage'
import { GroupSchedulesPage } from '../pages/GroupSchedulesPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { MyGroupsPage } from '../pages/MyGroupsPage'
import { MyInfoPage } from '../pages/MyInfoPage'
import { OAuthCallbackPage } from '../pages/OAuthCallbackPage'
import { SignupPage } from '../pages/SignupPage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'
import { ROUTES } from './route-paths'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.groups} element={<GroupListPage />} />
          <Route path="/groups/:groupId" element={<GroupDetailPage />} />
          <Route
            path={ROUTES.myGroups}
            element={
              <ProtectedRoute>
                <MyGroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.createGroup}
            element={
              <ProtectedRoute>
                <GroupCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.myInfo}
            element={
              <ProtectedRoute>
                <MyInfoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:groupId/applications/manage"
            element={
              <ProtectedRoute>
                <GroupApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:groupId/schedules"
            element={
              <ProtectedRoute>
                <GroupSchedulesPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.oauthCallback} element={<OAuthCallbackPage />} />
          <Route
            path={ROUTES.login}
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path={ROUTES.signup}
            element={
              <PublicOnlyRoute>
                <SignupPage />
              </PublicOnlyRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.login} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
