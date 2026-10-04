import { NavLink } from 'react-router-dom'
import { CalendarDays, Home, MessageCircle, User, Users } from 'lucide-react'

const items = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/alumni', label: 'Alumni', icon: Users },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-100 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-primary-800' : 'text-slate-400 hover:text-slate-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`flex h-8 w-12 items-center justify-center rounded-full ${isActive ? 'bg-primary-50' : ''}`}>
                    <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
