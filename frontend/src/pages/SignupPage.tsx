import './AuthPage.css'

function SignupPage() {
  return (
    <div className="auth-page">
      <h2 className="auth-page__title">회원가입</h2>
      <p className="auth-page__text">
        기본 정보만 입력해서 ModuPlan 계정을 만들 수 있습니다.
      </p>

      <div className="auth-page__group">
        <label className="auth-page__label" htmlFor="signup-email">
          이메일
        </label>
        <input
          id="signup-email"
          className="auth-page__input"
          type="email"
          placeholder="test@test.com"
        />
      </div>

      <div className="auth-page__group">
        <label className="auth-page__label" htmlFor="signup-nickname">
          닉네임
        </label>
        <input
          id="signup-nickname"
          className="auth-page__input"
          type="text"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <div className="auth-page__group">
        <label className="auth-page__label" htmlFor="signup-password">
          비밀번호
        </label>
        <input
          id="signup-password"
          className="auth-page__input"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <button className="auth-page__button" type="button">
        회원가입
      </button>

      <p className="auth-page__hint">가입 후 로그인 페이지에서 인증을 진행합니다.</p>
    </div>
  )
}

export default SignupPage
