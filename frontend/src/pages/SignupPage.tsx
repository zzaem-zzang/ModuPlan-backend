import Button from '../components/Button'
import Input from '../components/Input'
import './AuthPage.css'

function SignupPage() {
  return (
    <div className="auth-page">
      <h2 className="auth-page__title">회원가입</h2>
      <p className="auth-page__text">
        기본 정보만 입력해서 ModuPlan 계정을 만들 수 있습니다.
      </p>

      <div className="auth-page__group">
        <Input
          id="signup-email"
          label="이메일"
          type="email"
          placeholder="test@test.com"
        />
      </div>

      <div className="auth-page__group">
        <Input
          id="signup-nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <div className="auth-page__group">
        <Input
          id="signup-password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <Button fullWidth>회원가입</Button>

      <p className="auth-page__hint">
        가입 후 로그인 페이지에서 인증을 진행합니다.
      </p>
    </div>
  )
}

export default SignupPage
