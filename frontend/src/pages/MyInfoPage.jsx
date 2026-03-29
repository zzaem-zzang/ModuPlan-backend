import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { EmptyState } from '../components/ui/EmptyState'
import { InputField } from '../components/ui/InputField'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { useMyInfoQuery } from '../hooks/useUsers'
import { withdraw } from '../services/users'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import { formatDateTime } from '../utils/date'
import { getErrorMessage } from '../utils/error'
import { useState } from 'react'

export function MyInfoPage() {
  const navigate = useNavigate()
  const { isAuthenticated, logoutAction, clearSession } = useAuth()
  const myInfoQuery = useMyInfoQuery(isAuthenticated)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm()

  const withdrawMutation = useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      clearSession()
      navigate(ROUTES.home)
    },
    onError: (error) => setError('root', { message: getErrorMessage(error) }),
  })

  return (
    <div className="grid gap-6">
      <section className="page-section">
        <PageHeader
          eyebrow="My Info"
          title="내 정보"
          description="내 프로필과 계정 관련 작업을 한 곳에서 관리합니다."
        />
      </section>

      {myInfoQuery.isLoading ? <LoadingState /> : null}
      {myInfoQuery.isError ? (
        <EmptyState title="내 정보를 불러오지 못했습니다." description={myInfoQuery.error.message} />
      ) : null}

      {myInfoQuery.data ? (
        <>
          <section className="page-section grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">이메일</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{myInfoQuery.data.email}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">닉네임</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{myInfoQuery.data.nickname}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">가입일</p>
              <p className="mt-2 text-lg font-bold text-slate-900">{formatDateTime(myInfoQuery.data.createdAt)}</p>
            </div>
          </section>

          <section className="page-section grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
            <form className="grid gap-4" onSubmit={handleSubmit(() => setIsConfirmOpen(true))}>
              <PageHeader
                eyebrow="Danger Zone"
                title="회원 탈퇴"
                description="비밀번호를 다시 입력해야 탈퇴 요청을 보낼 수 있습니다."
              />
              <InputField
                id="withdraw-password"
                label="비밀번호 확인"
                type="password"
                error={errors.password?.message}
                {...register('password', { required: '비밀번호를 입력하세요.' })}
              />
              {errors.root?.message ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
              <Button type="submit" variant="danger" className="w-full md:w-fit">
                회원 탈퇴
              </Button>
            </form>

            <Button variant="secondary" onClick={logoutAction}>
              로그아웃
            </Button>
          </section>
        </>
      ) : null}

      <ConfirmDialog
        open={isConfirmOpen}
        title="정말 탈퇴하시겠습니까?"
        description="회원 탈퇴 후 저장된 인증 정보는 삭제되며, 되돌릴 수 없습니다."
        confirmText={withdrawMutation.isPending ? '탈퇴 처리 중...' : '탈퇴하기'}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          withdrawMutation.mutate({ password: getValues('password') })
          setIsConfirmOpen(false)
        }}
      />
    </div>
  )
}
