import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import './AuthLayout.css'

type AuthLayoutProps = {
  children?: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__backdrop" aria-hidden="true" />
      <main className="auth-layout__main">
        <section className="auth-layout__intro">
          <p className="auth-layout__eyebrow">ModuPlan</p>
          <h1>함께할 모임과 일정을 한 화면에서 관리하세요.</h1>
          <p className="auth-layout__description">
            로그인과 회원가입 화면에서 공통으로 사용하는 레이아웃입니다.
            인증 폼만 교체하면서 같은 화면 틀을 재사용할 수 있습니다.
          </p>
        </section>

        <section className="auth-layout__panel">
          {children ?? <Outlet />}
        </section>
      </main>
    </div>
  )
}

export default AuthLayout
