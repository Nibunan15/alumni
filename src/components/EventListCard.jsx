import { Link } from 'react-router-dom'
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import EventBanner from './EventBanner.jsx'
import RegisterButton from './RegisterButton.jsx'
import { aboveLink, clickableCard, stretchedLink } from './clickable.js'
import { useEvents } from '../context/EventsContext.jsx'
import { dateParts, isPast } from '../data/events.js'

// Full event card for the Events and Saved Events pages. Card → Event Details.
export default function EventListCard({ event }) {
  const { attendeeCount } = useEvents()
  const d = dateParts(event.date)
  const past = isPast(event)

  return (
    <article className={`flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm ${clickableCard}`}>
      <EventBanner event={event} dimmed={past} />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold text-slate-900">
          <Link to={`/events/${event.id}`} className={stretchedLink}>
            {event.title}
          </Link>
        </h3>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} className="shrink-0 text-primary-600" />
            {d.long}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="shrink-0 text-primary-600" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="shrink-0 text-primary-600" />
            {event.location}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{event.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <Users size={14} className="shrink-0 text-primary-600" />
            {attendeeCount(event)} {past ? 'attended' : 'attending'}
          </span>
          <RegisterButton event={event} className={aboveLink} />
        </div>
      </div>
    </article>
  )
}
