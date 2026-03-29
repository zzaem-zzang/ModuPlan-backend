import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="app-shell flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="hidden rounded-[2rem] bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-100">ModuPlan</p>
            <h1 className="mt-6 text-5xl font-black tracking-tight">모임 운영을 더 단순하게.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
              백엔드 API 스펙에 맞춘 실제 React 프론트입니다. 인증, 모임 탐색, 참여 신청,
              일정 관리, 마이페이지까지 하나의 흐름으로 이어집니다.
            </p>
          </div>
        </section>
        <section className="panel p-6 md:p-8">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
