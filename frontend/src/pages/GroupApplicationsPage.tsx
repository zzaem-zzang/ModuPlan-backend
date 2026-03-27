import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { PageHeader } from '../components/ui/PageHeader'
import { useGroupDetailQuery, useMyGroupsQuery } from '../hooks/useGroups'
import { approveApplication, rejectApplication } from '../services/applications'
import { useAuth } from '../store/auth/useAuth'
import { getErrorMessage } from '../utils/error'

type ApplicationFormValues = {
  applicationId: number
}

export function GroupApplicationsPage() {
  const { groupId } = useParams()
  const numericGroupId = Number(groupId)
  const { isAuthenticated } = useAuth()
  const detailQuery = useGroupDetailQuery(numericGroupId)
  const myGroupsQuery = useMyGroupsQuery(0, 100, isAuthenticated)
  const role = myGroupsQuery.data?.content.find((item) => item.groupId === numericGroupId)?.role
  const isLeader = role === 'LEADER'

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ApplicationFormValues>()

  const approveMutation = useMutation({
    mutationFn: (applicationId: number) => approveApplication(numericGroupId, applicationId),
    onError: (error) => setError('root', { message: getErrorMessage(error) }),
  })

  const rejectMutation = useMutation({
    mutationFn: (applicationId: number) => rejectApplication(numericGroupId, applicationId),
    onError: (error) => setError('root', { message: getErrorMessage(error) }),
  })

  return (
    <section className="page-section grid gap-6">
      <PageHeader
        eyebrow="Applications"
        title={`${detailQuery.data?.name ?? '모임'} 참여 신청 관리`}
        description="백엔드 명세에는 참여 신청 목록 조회 API가 없습니다. 따라서 프론트는 승인/거절 액션과 입력 UI만 제공하며, 임의의 조회 엔드포인트를 추가하지 않습니다."
      />

      {/* TODO: 백엔드 명세에 참여 신청 목록 조회 API가 추가되면 목록형 관리 UI로 교체한다. */}

      {!isLeader ? (
        <p className="text-sm font-medium text-rose-600">모임장만 접근할 수 있는 페이지입니다.</p>
      ) : (
        <form
          className="grid max-w-xl gap-4"
          onSubmit={handleSubmit(({ applicationId }) => approveMutation.mutate(applicationId))}
        >
          <InputField
            id="applicationId"
            label="신청 ID"
            type="number"
            error={errors.applicationId?.message}
            {...register('applicationId', {
              required: '신청 ID를 입력하세요.',
              valueAsNumber: true,
            })}
          />
          {errors.root?.message ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={approveMutation.isPending}>
              {approveMutation.isPending ? '승인 중...' : '승인'}
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmit(({ applicationId }) => rejectMutation.mutate(applicationId))}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? '거절 중...' : '거절'}
            </Button>
          </div>
        </form>
      )}
    </section>
  )
}
