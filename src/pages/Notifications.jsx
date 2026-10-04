import { useNavigate } from 'react-router-dom'
import { BellOff, BellRing, CalendarCheck, MessageCircle, UserCheck, UserPlus } from 'lucide-react'
import BackHeader from '../components/BackHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { clickableCard } from '../components/clickable.js'
import { useNotifications } from '../context/NotificationsContext.jsx'
import useGoBack from '../hooks/useGoBack.js'

const icons = {
  accepted: UserCheck,
  request: UserPlus,
  message: MessageCircle,
  registration: CalendarCheck,
  reminder: BellRing,
}

export default function Notifications() {
  const navigate = useNavigate()
  const goBack = useGoBack('/home')
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()

  const open = (n) => {
    markRead(n.id)
    navigate(n.to, n.state ? { state: n.state } : undefined)
  }

  return (
    <div className="space-y-5">
      <BackHeader
        title="Notifications"
        subtitle={unreadCount ? `${unreadCount} unread` : 'You’re all caught up'}
        onBack={goBack}
        action={
          unreadCount > 0 && (
            <button onClick={markAllRead} className="shrink-0 rounded-lg px-1 text-sm font-semibold text-primary-600 hover:text-primary-800 hover:underline underline-offset-2">
              Mark all read
            </button>
          )
        }
      />

      {notifications.length === 0 ? (
        <EmptyState icon={BellOff} title="No notifications" message="Updates about connections, messages and events will appear here." />
      ) : (
        <ul className="space-y-2.5">
          {notifications.map((n) => {
            const Icon = icons[n.type] ?? BellRing
            return (
              <li key={n.id}>
                <button
                  onClick={() => open(n)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${clickableCard} ${
                    n.unread ? 'border-primary-100 bg-primary-50/70' : 'border-slate-100 bg-white'
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${n.unread ? 'bg-primary-800 text-white' : 'bg-primary-50 text-primary-800'}`}>
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={`text-sm ${n.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>{n.title}</span>
                      <span className="shrink-0 text-xs text-slate-400">{n.time}</span>
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-slate-600">{n.text}</span>
                  </span>
                  {n.unread && <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" aria-label="Unread" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
