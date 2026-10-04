import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, Search, Users } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import QuickActionCard from '../components/QuickActionCard.jsx'
import AlumniCard from '../components/AlumniCard.jsx'
import EventCard from '../components/EventCard.jsx'
import IconButton from '../components/IconButton.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useNotifications } from '../context/NotificationsContext.jsx'
import { findAlumni } from '../data/mockData.js'
import { upcomingEvents } from '../data/events.js'
import { useUiState } from '../context/UiStateContext.jsx'
import { normalizeQuery } from '../utils/search.js'

const quickActions = [
  { icon: Search, title: 'Find Alumni', description: 'Search by batch, dept or company', to: '/alumni' },
  { icon: Users, title: 'My Connections', description: 'People in your network', to: '/connections' },
  { icon: CalendarDays, title: 'Upcoming Events', description: 'Meets, talks & sessions', to: '/events' },
]

const recentAlumniIds = [1, 2, 3]

export default function Home() {
  const { user } = useUser()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const [, setSearchQuery] = useUiState('home.query', '')
  const [draft, setDraft] = useState('')

  // Enter or the search icon opens Search Results for what was typed.
  const runSearch = (text) => {
    if (!normalizeQuery(text)) return
    setSearchQuery(text.trim())
    navigate('/search')
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Hello, {user.firstName} 👋</h1>
          <p className="mt-1 text-sm text-slate-500">Stay connected with your college community</p>
        </div>
        <IconButton
          icon={Bell}
          label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
          to="/notifications"
          dot={unreadCount > 0}
        />
      </header>

      <SearchBar
        id="home-search"
        placeholder="Search alumni, companies, events..."
        value={draft}
        onChange={setDraft}
        onSubmit={runSearch}
        filterLink="/alumni"
      />

      {/* Quick Actions */}
      <section>
        <SectionHeader title="Quick Actions" actionLabel={null} />
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </section>

      {/* Recent Alumni */}
      <section>
        <SectionHeader title="Recent Alumni" to="/alumni" />
        <div className="space-y-3">
          {recentAlumniIds.map((id) => (
            <AlumniCard key={id} alumni={findAlumni(id)} />
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <SectionHeader title="Upcoming Events" actionLabel="View Events" to="/events" />
        <div className="space-y-3">
          {upcomingEvents()
            .slice(0, 2)
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>
      </section>
    </div>
  )
}
