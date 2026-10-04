import { useEffect } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'
import Toast from './Toast.jsx'

// Shared shell for every screen after login: a centred mobile column + fixed bottom nav.
export default function AppLayout() {
  const { pathname } = useLocation()
  const navType = useNavigationType()

  // Start new screens at the top; leave Back navigation alone.
  useEffect(() => {
    if (navType !== 'POP') window.scrollTo(0, 0)
  }, [pathname, navType])

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-md px-5 pb-28 pt-6">
        <Outlet />
      </main>
      <Toast />
      <BottomNav />
    </div>
  )
}
