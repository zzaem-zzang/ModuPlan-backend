import Button from '../components/Button'
import Input from '../components/Input'
import './AuthPage.css'

function LoginPage() {
  return (
    <div className="auth-page">
      <h2 className="auth-page__title">로그인</h2>
      <p className="auth-page__text">
        가입한 이메일과 비밀번호를 입력해 모임 관리 화면으로 이동합니다.
      </p>

      <div className="auth-page__group">
        <Input
          id="login-email"
          label="이메일"
          type="email"
          placeholder="test@test.com"
        />
      </div>

      <div className="auth-page__group">
        <Input
          id="login-password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <Button fullWidth>로그인</Button>

      <p className="auth-page__hint">
        계정이 없다면 회원가입 페이지로 이동하세요.
      </p>
    </div>
  )
}

export default LoginPage
