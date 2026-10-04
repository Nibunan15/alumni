import { useNavigate } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import BackHeader from '../components/BackHeader.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import EventListCard from '../components/EventListCard.jsx'
import { useEvents } from '../context/EventsContext.jsx'
import useGoBack from '../hooks/useGoBack.js'
import { events } from '../data/events.js'

export default function SavedEvents() {
  const navigate = useNavigate()
  const goBack = useGoBack('/profile')
  const { saved } = useEvents()
  const list = events.filter((e) => saved.has(e.id)).sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="space-y-5">
      <BackHeader title="Saved Events" subtitle="Events you bookmarked" onBack={goBack} />
      {list.length > 0 ? (
        <div className="grid gap-4">
          {list.map((event) => (
            <EventListCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved events"
          message="Tap the bookmark on any event to save it here."
          action={
            <Button size="sm" onClick={() => navigate('/events')}>
              Browse events
            </Button>
          }
        />
      )}
    </div>
  )
}
