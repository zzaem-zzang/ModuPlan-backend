import './AuthPage.css'

function LoginPage() {
  return (
    <div className="auth-page">
      <h2 className="auth-page__title">로그인</h2>
      <p className="auth-page__text">
        가입한 이메일과 비밀번호를 입력해 모임 관리 화면으로 이동합니다.
      </p>

      <div className="auth-page__group">
        <label className="auth-page__label" htmlFor="login-email">
          이메일
        </label>
        <input
          id="login-email"
          className="auth-page__input"
          type="email"
          placeholder="test@test.com"
        />
      </div>

      <div className="auth-page__group">
        <label className="auth-page__label" htmlFor="login-password">
          비밀번호
        </label>
        <input
          id="login-password"
          className="auth-page__input"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <button className="auth-page__button" type="button">
        로그인
      </button>

      <p className="auth-page__hint">계정이 없다면 회원가입 페이지로 이동하세요.</p>
    </div>
  )
}

export default LoginPage
