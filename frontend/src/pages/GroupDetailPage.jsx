import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGroupCategoryLabel } from '../constants/group-category'
import { Button } from '../components/ui/Button'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'
import { useGroupDetailQuery, useMyGroupsQuery } from '../hooks/useGroups'
import { useSchedulesQuery } from '../hooks/useSchedules'
import { applyToGroup } from '../services/applications'
import { deleteGroup } from '../services/groups'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import { formatDateTime } from '../utils/date'

export function GroupDetailPage() {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const numericGroupId = Number(groupId)
  const { isAuthenticated } = useAuth()
  const detailQuery = useGroupDetailQuery(numericGroupId)
  const myGroupsQuery = useMyGroupsQuery(0, 100, isAuthenticated)
  const schedulesQuery = useSchedulesQuery(numericGroupId, isAuthenticated)

  const role = myGroupsQuery.data?.content.find((item) => item.groupId === numericGroupId)?.role
  const isLeader = role === 'LEADER'

  const applyMutation = useMutation({
    mutationFn: () => applyToGroup(numericGroupId),
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteGroup(numericGroupId),
    onSuccess: () => navigate(ROUTES.myGroups),
  })

  if (detailQuery.isLoading) {
    return <LoadingState />
  }

  if (detailQuery.isError || !detailQuery.data) {
    return <EmptyState title="모임 정보를 찾을 수 없습니다." description={detailQuery.error?.message ?? ''} />
  }

  const detail = detailQuery.data

  return (
    <div className="grid gap-6">
      <section className="page-section grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5">
          <PageHeader
            eyebrow="Group Detail"
            title={detail.name}
            description={detail.description}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">카테고리</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{getGroupCategoryLabel(detail.category)}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">지역</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{detail.region}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">인원</p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {detail.currentMembers} / {detail.maxMembers}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">모임장</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{detail.leader.nickname}</p>
            </div>
          </div>
        </div>

        <aside className="rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="text-sm font-semibold text-brand-100">운영 정보</p>
          <div className="mt-6 grid gap-4 text-sm text-slate-300">
            <p>공개 여부: {detail.isPublic ? '공개 모임' : '비공개 모임'}</p>
            <p>생성일: {formatDateTime(detail.createdAt)}</p>
          </div>

          <div className="mt-8 grid gap-3">
            {isAuthenticated ? (
              <Button onClick={() => applyMutation.mutate()} disabled={applyMutation.isPending}>
                {applyMutation.isPending ? '신청 중...' : '참여 신청'}
              </Button>
            ) : (
              <Button onClick={() => navigate(ROUTES.login)}>로그인 후 참여 신청</Button>
            )}

            {isLeader ? (
              <>
                <Link to={ROUTES.groupSchedules(numericGroupId)}>
                  <Button variant="secondary" className="w-full">
                    일정 관리
                  </Button>
                </Link>
                <Link to={ROUTES.groupApplications(numericGroupId)}>
                  <Button variant="secondary" className="w-full">
                    참여 신청 관리
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? '삭제 중...' : '모임 삭제'}
                </Button>
              </>
            ) : null}
          </div>

          {applyMutation.isError ? (
            <p className="mt-4 text-sm text-rose-200">{applyMutation.error.message}</p>
          ) : null}
        </aside>
      </section>

      <section className="page-section">
        <PageHeader
          eyebrow="Schedules"
          title="일정 목록"
          description="일정 목록 조회 API는 인증된 사용자만 사용할 수 있습니다."
        />

        {!isAuthenticated ? (
          <EmptyState
            title="일정 목록은 로그인 후 확인할 수 있습니다."
            description="인증이 필요한 API이므로 로그인 후 다시 시도하세요."
          />
        ) : schedulesQuery.isLoading ? (
          <LoadingState />
        ) : schedulesQuery.isError ? (
          <EmptyState title="일정 목록을 불러오지 못했습니다." description={schedulesQuery.error.message} />
        ) : schedulesQuery.data?.schedules.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {schedulesQuery.data.schedules.map((schedule) => (
              <article key={schedule.scheduleId} className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-slate-900">{schedule.title}</h3>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {formatDateTime(schedule.scheduledAt)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{schedule.description || '설명 없음'}</p>
                <p className="mt-4 text-sm font-medium text-slate-500">{schedule.location || '장소 미정'}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="등록된 일정이 없습니다." description="모임장이 새 일정을 생성하면 여기에 표시됩니다." />
        )}
      </section>

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        title="모임을 삭제하시겠습니까?"
        description="모임 삭제는 되돌릴 수 없습니다. 모임장 권한으로만 수행할 수 있습니다."
        confirmText={deleteMutation.isPending ? '삭제 중...' : '삭제하기'}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={() => {
          deleteMutation.mutate()
          setIsDeleteConfirmOpen(false)
        }}
      />
    </div>
  )
}
