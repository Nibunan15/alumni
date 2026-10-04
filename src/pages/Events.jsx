import { useMemo } from 'react'
import { CalendarX2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Tabs from '../components/Tabs.jsx'
import EventListCard from '../components/EventListCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Button from '../components/Button.jsx'
import { useEvents } from '../context/EventsContext.jsx'
import { events, isPast } from '../data/events.js'
import { useUiState } from '../context/UiStateContext.jsx'
import { matchesQuery } from '../utils/search.js'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'registered', label: 'Registered' },
  { id: 'past', label: 'Past' },
]

const emptyCopy = {
  registered: 'Events you register for will show up here.',
  past: 'Past events will show up here.',
}

export default function Events() {
  const [query, setQuery] = useUiState('events.query', '')
  const [tab, setTab] = useUiState('events.tab', 'all')
  const { isRegistered } = useEvents()

  const results = useMemo(() => {
    const byTab = {
      all: () => true,
      upcoming: (e) => !isPast(e),
      registered: (e) => isRegistered(e.id),
      past: (e) => isPast(e),
    }[tab]
    // Upcoming soonest first, then past events most recent first.
    return events
      .filter(byTab)
      .filter((e) => matchesQuery([e.title, e.location, e.category, e.description, e.organizer, e.speaker.name], query))
      .sort((a, b) => (isPast(a) === isPast(b) ? (isPast(a) ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)) : isPast(a) ? 1 : -1))
  }, [query, tab, isRegistered])

  return (
    <div className="space-y-5">
      <PageHeader title="Events" subtitle="Discover events and connect with your alumni community" />
      <SearchBar id="events-search" placeholder="Search events..." value={query} onChange={setQuery} />
      <Tabs label="Filter events" tabs={TABS} value={tab} onChange={setTab} />

      <p className="text-sm font-medium text-slate-500" aria-live="polite">
        {results.length} {results.length === 1 ? 'event' : 'events'}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((event) => (
            <EventListCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarX2}
          title="No events found"
          message={query.trim() ? 'Try a different search.' : emptyCopy[tab] ?? 'Check back soon.'}
          action={
            <Button variant="outline" size="sm" onClick={() => {
              setQuery('')
              setTab('all')
            }}>
              Show all events
            </Button>
          }
        />
      )}
    </div>
  )
}
