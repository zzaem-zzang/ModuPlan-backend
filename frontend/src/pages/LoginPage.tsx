import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { PageHeader } from '../components/ui/PageHeader'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import type { LoginRequest } from '../types/auth'
import { getErrorMessage } from '../utils/error'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginAction } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginRequest>()

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      const nextPath = (location.state as { from?: string } | null)?.from ?? ROUTES.home
      navigate(nextPath, { replace: true })
    },
    onError: (error) => {
      setError('root', { message: getErrorMessage(error) })
    },
  })

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Login"
        title="로그인"
        description="이메일과 비밀번호를 입력하면 저장된 토큰으로 인증 세션이 구성됩니다."
      />

      <form className="grid gap-4" onSubmit={handleSubmit((values) => loginMutation.mutate(values))}>
        <InputField
          id="login-email"
          label="이메일"
          type="email"
          error={errors.email?.message}
          {...register('email', { required: '이메일을 입력하세요.' })}
        />
        <InputField
          id="login-password"
          label="비밀번호"
          type="password"
          error={errors.password?.message}
          {...register('password', { required: '비밀번호를 입력하세요.' })}
        />
        {errors.root?.message ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
        <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <p className="text-sm text-slate-500">
        계정이 없다면{' '}
        <Link to={ROUTES.signup} className="font-semibold text-brand-700">
          회원가입
        </Link>
        으로 이동하세요.
      </p>
    </div>
  )
}
