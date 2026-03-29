import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { InputField } from '../components/ui/InputField'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'
import { TextareaField } from '../components/ui/TextareaField'
import { useGroupDetailQuery, useMyGroupsQuery } from '../hooks/useGroups'
import { useSchedulesQuery } from '../hooks/useSchedules'
import { queryClient } from '../services/api/query-client'
import { createSchedule } from '../services/schedules'
import { useAuth } from '../store/auth/useAuth'
import { toApiDateTime, formatDateTime } from '../utils/date'
import { getErrorMessage } from '../utils/error'

export function GroupSchedulesPage() {
  const { groupId } = useParams()
  const numericGroupId = Number(groupId)
  const { isAuthenticated } = useAuth()
  const detailQuery = useGroupDetailQuery(numericGroupId)
  const schedulesQuery = useSchedulesQuery(numericGroupId, isAuthenticated)
  const myGroupsQuery = useMyGroupsQuery(0, 100, isAuthenticated)
  const role = myGroupsQuery.data?.content.find((item) => item.groupId === numericGroupId)?.role
  const isLeader = role === 'LEADER'

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm()

  const createMutation = useMutation({
    mutationFn: (payload) => createSchedule(numericGroupId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['schedules', numericGroupId] })
      reset()
    },
    onError: (error) => setError('root', { message: getErrorMessage(error) }),
  })

  return (
    <div className="grid gap-6">
      <section className="page-section">
        <PageHeader
          eyebrow="Schedules"
          title={`${detailQuery.data?.name ?? '모임'} 일정`}
          description="일정 목록 조회와 모임장 전용 일정 생성 기능을 제공합니다."
        />
      </section>

      {schedulesQuery.isLoading ? <LoadingState /> : null}
      {schedulesQuery.isError ? (
        <EmptyState title="일정을 불러오지 못했습니다." description={schedulesQuery.error.message} />
      ) : schedulesQuery.data ? (
        <section className="grid gap-4 md:grid-cols-2">
          {schedulesQuery.data.schedules.length === 0 ? (
            <EmptyState title="등록된 일정이 없습니다." description="모임장이 첫 번째 일정을 등록해보세요." />
          ) : (
            schedulesQuery.data.schedules.map((schedule) => (
              <article key={schedule.scheduleId} className="rounded-3xl border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-bold text-slate-900">{schedule.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">{schedule.description || '설명 없음'}</p>
                <p className="mt-4 text-sm font-medium text-slate-600">{formatDateTime(schedule.scheduledAt)}</p>
                <p className="mt-1 text-sm text-slate-500">{schedule.location || '장소 미정'}</p>
              </article>
            ))
          )}
        </section>
      ) : null}

      {isLeader ? (
        <section className="page-section">
          <PageHeader
            eyebrow="Create Schedule"
            title="새 일정 등록"
            description="일정 생성 API는 모임장만 사용할 수 있습니다."
          />

          <form
            className="grid gap-4"
            onSubmit={handleSubmit((values) =>
              createMutation.mutate({
                ...values,
                scheduledAt: toApiDateTime(values.scheduledAt),
              }),
            )}
          >
            <InputField
              id="title"
              label="일정 제목"
              error={errors.title?.message}
              {...register('title', { required: '일정 제목을 입력하세요.' })}
            />
            <TextareaField id="description" label="설명" {...register('description')} />
            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                id="scheduledAt"
                label="일시"
                type="datetime-local"
                error={errors.scheduledAt?.message}
                {...register('scheduledAt', { required: '일시를 입력하세요.' })}
              />
              <InputField id="location" label="장소" {...register('location')} />
            </div>
            {errors.root?.message ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
            <Button type="submit" className="w-full md:w-fit" disabled={createMutation.isPending}>
              {createMutation.isPending ? '등록 중...' : '일정 생성'}
            </Button>
          </form>
        </section>
      ) : null}
    </div>
  )
}
