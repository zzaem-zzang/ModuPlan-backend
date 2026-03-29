import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navigation/Navbar'

export function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
