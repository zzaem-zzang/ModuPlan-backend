import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { PageHeader } from '../components/ui/PageHeader'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import { getErrorMessage } from '../utils/error'

export function SignupPage() {
  const navigate = useNavigate()
  const { signupAction } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const signupMutation = useMutation({
    mutationFn: signupAction,
    onSuccess: () => navigate(ROUTES.login),
    onError: (error) => setError('root', { message: getErrorMessage(error) }),
  })

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Signup"
        title="회원가입"
        description="이메일, 비밀번호, 닉네임을 입력하면 즉시 로그인 가능한 계정을 생성합니다."
      />

      <form className="grid gap-4" onSubmit={handleSubmit((values) => signupMutation.mutate(values))}>
        <InputField
          id="signup-email"
          label="이메일"
          type="email"
          error={errors.email?.message}
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '올바른 이메일 형식을 입력하세요.',
            },
          })}
        />
        <InputField
          id="signup-password"
          label="비밀번호"
          type="password"
          error={errors.password?.message}
          {...register('password', {
            required: '비밀번호를 입력하세요.',
            minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
          })}
        />
        <InputField
          id="signup-nickname"
          label="닉네임"
          error={errors.nickname?.message}
          {...register('nickname', { required: '닉네임을 입력하세요.' })}
        />
        {errors.root?.message ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
        <Button type="submit" className="w-full" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? '가입 중...' : '회원가입'}
        </Button>
      </form>

      <p className="text-sm text-slate-500">
        이미 계정이 있다면{' '}
        <Link to={ROUTES.login} className="font-semibold text-brand-700">
          로그인
        </Link>
        으로 이동하세요.
      </p>
    </div>
  )
}
