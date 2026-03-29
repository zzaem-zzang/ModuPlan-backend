import { useState } from 'react'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'
import { Pagination } from '../components/ui/Pagination'
import { useMyGroupsQuery } from '../hooks/useGroups'
import { useAuth } from '../store/auth/useAuth'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/route-paths'

export function MyGroupsPage() {
  const { isAuthenticated } = useAuth()
  const [page, setPage] = useState(0)
  const size = 10
  const myGroupsQuery = useMyGroupsQuery(page, size, isAuthenticated)

  return (
    <div className="grid gap-6">
      <section className="page-section">
        <PageHeader
          eyebrow="My Groups"
          title="내 모임"
          description="참여 중인 모임과 운영 중인 모임을 role 배지와 함께 확인합니다."
        />
      </section>

      {myGroupsQuery.isLoading ? <LoadingState /> : null}
      {myGroupsQuery.isError ? (
        <EmptyState title="내 모임을 불러오지 못했습니다." description={myGroupsQuery.error.message} />
      ) : null}

      {myGroupsQuery.data ? (
        <>
          {myGroupsQuery.data.content.length === 0 ? (
            <EmptyState title="참여 중인 모임이 없습니다." description="관심 있는 모임을 찾아 참여해보세요." />
          ) : (
            <section className="grid gap-4 md:grid-cols-2">
              {myGroupsQuery.data.content.map((group) => (
                <Link
                  key={group.groupId}
                  to={ROUTES.groupDetail(group.groupId)}
                  className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-bold text-slate-900">{group.name}</h2>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      {group.role}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-500">
                    현재 인원 {group.currentMembers} / 최대 인원 {group.maxMembers}
                  </p>
                </Link>
              ))}
            </section>
          )}

          <section className="page-section">
            <Pagination
              page={myGroupsQuery.data.page}
              size={myGroupsQuery.data.size}
              totalElements={myGroupsQuery.data.totalElements}
              onChange={setPage}
            />
          </section>
        </>
      ) : null}
    </div>
  )
}
