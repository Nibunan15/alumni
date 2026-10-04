import { Bookmark, BookmarkCheck, Building2, CalendarDays, CalendarPlus, CircleCheck, Clock, MapPin, Mic, Users, CalendarX2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import BackHeader from '../components/BackHeader.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import EventBanner from '../components/EventBanner.jsx'
import IconButton from '../components/IconButton.jsx'
import RegisterButton from '../components/RegisterButton.jsx'
import { IconTile, ProfileSection } from '../components/ProfileBits.jsx'
import Avatar from '../components/Avatar.jsx'
import { useEvents } from '../context/EventsContext.jsx'
import useGoBack from '../hooks/useGoBack.js'
import { dateParts, findEvent, isPast } from '../data/events.js'

function InfoRow({ icon, label, value }) {
  return (
    <li className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <IconTile icon={icon} />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </li>
  )
}

export default function EventDetails() {
  const { id } = useParams()
  const goBack = useGoBack('/events')
  const { isRegistered, isSaved, toggleSave, addToCalendar, attendeeCount } = useEvents()
  const event = findEvent(id)

  if (!event) {
    return (
      <div className="space-y-6">
        <BackHeader title="Event Details" onBack={goBack} />
        <EmptyState icon={CalendarX2} title="Event not found" message="This event may have been removed." />
      </div>
    )
  }

  const d = dateParts(event.date)
  const past = isPast(event)
  const registered = isRegistered(event.id)
  const saved = isSaved(event.id)

  return (
    <div className="space-y-6">
      <BackHeader
        title="Event Details"
        onBack={goBack}
        action={
          <IconButton
            icon={saved ? BookmarkCheck : Bookmark}
            label={saved ? 'Remove from saved events' : 'Save event'}
            onClick={() => toggleSave(event.id)}
            active={saved}
          />
        }
      />

      <EventBanner event={event} size="lg" rounded="rounded-3xl" dimmed={past} />

      <section>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{event.title}</h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
          <Users size={16} className="text-primary-600" />
          <span>
            <strong className="font-bold text-slate-900">{attendeeCount(event)}</strong> alumni {past ? 'attended' : 'attending'}
          </span>
        </p>
      </section>

      {registered && !past && (
        <div className="flex items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50 p-4" role="status">
          <CircleCheck size={22} className="shrink-0 text-primary-800" />
          <p className="text-sm font-semibold text-primary-800">You're registered for this event!</p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <RegisterButton event={event} size="lg" label="Register Now" className="sm:flex-1" />
        {!past && (
          <Button variant="outline" className="sm:flex-1" onClick={() => addToCalendar(event.id)}>
            <CalendarPlus size={18} />
            Add to Calendar
          </Button>
        )}
      </div>

      <ProfileSection title="Event information">
        <ul className="divide-y divide-slate-100">
          <InfoRow icon={CalendarDays} label="Date" value={`${d.weekday}, ${d.long}`} />
          <InfoRow icon={Clock} label="Time" value={event.time} />
          <InfoRow icon={MapPin} label="Location" value={event.location} />
          <InfoRow icon={Building2} label="Organizer" value={event.organizer} />
        </ul>
      </ProfileSection>

      <ProfileSection title="Speaker">
        <div className="flex items-center gap-3">
          <Avatar name={event.speaker.name} className="h-12 w-12" />
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <Mic size={14} className="text-primary-600" />
              {event.speaker.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{event.speaker.role}</p>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title="About this event">
        <p className="text-sm leading-relaxed text-slate-600">{event.about}</p>
      </ProfileSection>

      <ProfileSection title="What you'll learn">
        <ul className="space-y-2.5">
          {event.learn.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CircleCheck size={18} className="mt-px shrink-0 text-primary-600" />
              {item}
            </li>
          ))}
        </ul>
      </ProfileSection>
    </div>
  )
}
