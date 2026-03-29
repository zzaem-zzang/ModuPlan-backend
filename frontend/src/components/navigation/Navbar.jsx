import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { ROUTES } from '../../routes/route-paths'
import { useAuth } from '../../store/auth/useAuth'

const navItems = [
  { label: '홈', to: ROUTES.home },
  { label: '모임 찾기', to: ROUTES.groups },
  { label: '내 모임', to: ROUTES.myGroups },
  { label: '모임 만들기', to: ROUTES.createGroup },
  { label: '내 정보', to: ROUTES.myInfo },
]

export function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, logoutAction, session } = useAuth()

  const handleLogout = async () => {
    await logoutAction()
    navigate(ROUTES.home)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <NavLink to={ROUTES.home} className="text-xl font-black tracking-tight text-slate-900">
          ModuPlan
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated && session ? (
            <>
              <span className="hidden text-sm font-semibold text-slate-500 sm:inline">
                {session.nickname}님
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <NavLink
              to={ROUTES.login}
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
            >
              로그인
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
