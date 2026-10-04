import { useMemo } from 'react'
import { CalendarDays, SearchX, Users } from 'lucide-react'
import BackHeader from '../components/BackHeader.jsx'
import SearchBar from '../components/SearchBar.jsx'
import AlumniCard from '../components/AlumniCard.jsx'
import EventCard from '../components/EventCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useUiState } from '../context/UiStateContext.jsx'
import useGoBack from '../hooks/useGoBack.js'
import { alumniDirectory } from '../data/mockData.js'
import { events } from '../data/events.js'
import { alumniSearchFields, eventSearchFields, matchesQuery, normalizeQuery } from '../utils/search.js'

function ResultSection({ icon: Icon, title, count, children }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900">
        <Icon size={18} className="text-primary-600" />
        {title}
        <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-800">{count}</span>
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

// Results for the Home search: alumni and events in separate sections. Updates as you type.
export default function SearchResults() {
  const goBack = useGoBack('/home')
  const [query, setQuery] = useUiState('home.query', '')
  const active = normalizeQuery(query) !== ''

  const alumni = useMemo(() => (active ? alumniDirectory.filter((a) => matchesQuery(alumniSearchFields(a), query)) : []), [query, active])
  const eventResults = useMemo(
    () => (active ? events.filter((e) => matchesQuery(eventSearchFields(e), query)).sort((a, b) => a.date.localeCompare(b.date)) : []),
    [query, active]
  )
  const total = alumni.length + eventResults.length

  return (
    <div className="space-y-5">
      <BackHeader title="Search Results" onBack={goBack} />
      <SearchBar id="global-search" placeholder="Search alumni, companies, events..." value={query} onChange={setQuery} />

      {!active ? (
        <EmptyState icon={SearchX} title="Search Alumni Connect" message="Find alumni by name, company, role, department, location or batch, and events by name, place, organizer or speaker." />
      ) : (
        <>
          <p className="text-sm font-medium text-slate-500" aria-live="polite">
            Search results for <span className="font-bold text-slate-900">"{query.trim()}"</span>
            <span className="text-slate-400"> · {total} found</span>
          </p>

          {total === 0 ? (
            <EmptyState icon={SearchX} title="No results found" message="Try searching with a different name, company or event." />
          ) : (
            <>
              {alumni.length > 0 && (
                <ResultSection icon={Users} title="Alumni" count={alumni.length}>
                  {alumni.map((a) => (
                    <AlumniCard key={a.id} alumni={a} />
                  ))}
                </ResultSection>
              )}
              {eventResults.length > 0 && (
                <ResultSection icon={CalendarDays} title="Events" count={eventResults.length}>
                  {eventResults.map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </ResultSection>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
