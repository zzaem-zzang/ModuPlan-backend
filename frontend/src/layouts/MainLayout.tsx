import { Link, Outlet } from 'react-router-dom'
import './MainLayout.css'

function MainLayout() {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="main-layout__brand">
          <Link className="main-layout__logo" to="/">
            ModuPlan
          </Link>
          <p className="main-layout__tagline">
            모임과 일정을 한곳에서 정리하는 협업 서비스
          </p>
        </div>

        <nav className="main-layout__nav" aria-label="주요 메뉴">
          <Link className="main-layout__nav-link" to="/">
            홈
          </Link>
          <Link className="main-layout__nav-link" to="/login">
            로그인
          </Link>
          <Link className="main-layout__nav-link" to="/signup">
            회원가입
          </Link>
        </nav>
      </header>

      <main className="main-layout__content">
        <Outlet />
      </main>

      <footer className="main-layout__footer">
        <p>공통 레이아웃 구성 단계에서 만든 기본 화면 틀입니다.</p>
      </footer>
    </div>
  )
}

export default MainLayout
