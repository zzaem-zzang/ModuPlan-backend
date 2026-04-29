import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { ROUTES } from '../routes/route-paths'
import { useAuth } from '../store/auth/useAuth'
import { getErrorMessage } from '../utils/error'

const TEXT = {
  title: '로그인',
  description: '이전에 둘러보던 모임과 신청 상태를 이어서 확인하세요.',
  redirectNotice: '보려던 페이지가 있어 로그인 후 바로 이어서 이동합니다.',
  formTitle: '관심 있는 모임을 계속 둘러보세요',
  formDescription: '이메일과 비밀번호만 입력하면 바로 이어집니다.',
  emailLabel: '이메일',
  emailRequired: '이메일을 입력해 주세요.',
  passwordLabel: '비밀번호',
  passwordPlaceholder: '비밀번호를 입력해 주세요.',
  passwordRequired: '비밀번호를 입력해 주세요.',
  submitIdle: '로그인',
  submitPending: '로그인 중...',
  signupPrompt: '처음이신가요?',
  signupDescription: '회원가입하면 운동, 스터디, 취미 모임을 한곳에서 찾고 참여할 수 있습니다.',
  signupLink: '회원가입하기',
}

const KAKAO_AUTH_URL = 'http://localhost:8081/oauth2/authorization/kakao'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginAction } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const redirectedFromProtectedPage = Boolean(location.state?.from)

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      const nextPath = location.state?.from ?? ROUTES.home
      navigate(nextPath, { replace: true })
    },
    onError: (error) => {
      setError('root', { message: getErrorMessage(error) })
    },
  })

  return (
    <div className="grid gap-6 p-2 sm:p-4">
      <div className="border-b pb-5" style={{ borderColor: 'var(--page-line)' }}>
        <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--page-accent-strong)' }}>
          Login
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]" style={{ color: 'var(--page-ink)' }}>
          {TEXT.title}
        </h2>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--page-muted)' }}>
          {TEXT.description}
        </p>
      </div>

      {redirectedFromProtectedPage ? (
        <div
          className="rounded-[1.5rem] border px-4 py-3 text-sm"
          style={{
            borderColor: 'rgba(207, 98, 48, 0.2)',
            backgroundColor: 'rgba(246, 221, 206, 0.45)',
            color: 'var(--page-accent-strong)',
          }}
        >
          {TEXT.redirectNotice}
        </div>
      ) : null}

      <section
        className="rounded-[2rem] border px-5 py-5 sm:px-6 sm:py-6"
        style={{
          borderColor: 'rgba(114, 71, 42, 0.14)',
          backgroundColor: 'rgba(255, 253, 248, 0.78)',
        }}
      >
        <div className="pb-5" style={{ borderBottom: '1px solid rgba(114, 71, 42, 0.1)' }}>
          <h3 className="text-xl font-semibold tracking-[-0.03em]" style={{ color: 'var(--page-ink)' }}>
            {TEXT.formTitle}
          </h3>
          <p className="mt-2 text-sm leading-6" style={{ color: 'var(--page-muted)' }}>
            {TEXT.formDescription}
          </p>
        </div>

        <form className="mt-5 grid gap-4" onSubmit={handleSubmit((values) => loginMutation.mutate(values))}>
          <InputField
            id="login-email"
            label={TEXT.emailLabel}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            className="h-12 rounded-[1.35rem] border-[rgba(114,71,42,0.16)] bg-[#fffdf8] focus:border-[var(--page-accent)]"
            {...register('email', { required: TEXT.emailRequired })}
          />
          <InputField
            id="login-password"
            label={TEXT.passwordLabel}
            type="password"
            placeholder={TEXT.passwordPlaceholder}
            autoComplete="current-password"
            error={errors.password?.message}
            className="h-12 rounded-[1.35rem] border-[rgba(114,71,42,0.16)] bg-[#fffdf8] focus:border-[var(--page-accent)]"
            {...register('password', { required: TEXT.passwordRequired })}
          />

          {errors.root?.message ? (
            <p
              className="rounded-[1.4rem] border px-4 py-3 text-sm"
              style={{
                borderColor: 'rgba(225, 29, 72, 0.2)',
                backgroundColor: 'rgba(255, 241, 242, 0.85)',
                color: '#be123c',
              }}
            >
              {errors.root.message}
            </p>
          ) : null}

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-full text-base"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? TEXT.submitPending : TEXT.submitIdle}
          </Button>
          <button
            type="button"
            aria-label="카카오 로그인"
            className="w-full rounded-full transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#191919]/20"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL
            }}
          >
            <img
              src="/kakao-login-button.svg"
              alt=""
              className="h-auto w-full rounded-full"
            />
          </button>
        </form>
      </section>

      <div
        className="rounded-[2rem] border px-5 py-5 sm:px-6"
        style={{
          borderColor: 'rgba(114, 71, 42, 0.12)',
          backgroundColor: 'rgba(255, 249, 241, 0.9)',
        }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--page-ink)' }}>
          {TEXT.signupPrompt}
        </p>
        <p className="mt-2 text-sm leading-6" style={{ color: 'var(--page-muted)' }}>
          {TEXT.signupDescription}
        </p>
        <Link
          to={ROUTES.signup}
          className="mt-4 inline-flex items-center text-sm font-semibold transition"
          style={{ color: 'var(--page-accent-strong)' }}
        >
          {TEXT.signupLink}
        </Link>
      </div>
    </div>
  )
}
