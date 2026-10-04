import { Link } from 'react-router-dom'
import { CalendarDays, ChevronRight, Clock, MapPin } from 'lucide-react'
import { dateParts } from '../data/events.js'
import { clickableCard, stretchedLink } from './clickable.js'

// Compact event card used on Home. The whole card opens Event Details.
export default function EventCard({ event }) {
  const d = dateParts(event.date)
  return (
    <article className={`flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm ${clickableCard}`}>
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary-800 text-white">
        <span className="text-lg font-extrabold leading-none">{d.day}</span>
        <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-100">{d.month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold text-slate-900">
          <Link to={`/events/${event.id}`} className={stretchedLink}>
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 flex flex-wrap gap-x-2.5 gap-y-0.5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <CalendarDays size={13} className="shrink-0" />
            {d.long}
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock size={13} className="shrink-0" />
            {event.time}
          </span>
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={13} className="shrink-0" />
          {event.location}
        </p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-slate-300" />
    </article>
  )
}
