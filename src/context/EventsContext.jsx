import { createContext, useCallback, useContext, useState } from 'react'
import { findEvent, initialRegistered, initialSaved } from '../data/events.js'
import { useToast } from './ToastContext.jsx'
import { useNotifications } from './NotificationsContext.jsx'

// Which events you've registered for or saved (in memory only).
const EventsContext = createContext(null)

export function EventsProvider({ children }) {
  const { showToast } = useToast()
  const { addNotification } = useNotifications()
  const [registered, setRegistered] = useState(() => new Set(initialRegistered))
  const [saved, setSaved] = useState(() => new Set(initialSaved))

  const isRegistered = useCallback((id) => registered.has(id), [registered])
  const isSaved = useCallback((id) => saved.has(id), [saved])

  // Seed counts already include you for events you registered for at the start.
  const attendeeCount = useCallback(
    (event) => event.attendees + (registered.has(event.id) && !initialRegistered.includes(event.id) ? 1 : 0),
    [registered]
  )

  const register = useCallback(
    (id) => {
      setRegistered((prev) => new Set(prev).add(id))
      showToast("You're registered for this event!")
      const event = findEvent(id)
      addNotification({ type: 'registration', title: 'Event registration confirmed', text: `You're registered for ${event.title}.`, to: `/events/${id}` })
    },
    [showToast, addNotification]
  )

  const toggleSave = useCallback(
    (id) => {
      setSaved((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
      showToast(saved.has(id) ? 'Removed from saved events' : 'Event saved', saved.has(id) ? undefined : { label: 'View saved', to: '/profile/saved-events' })
    },
    [saved, showToast]
  )

  const addToCalendar = useCallback((id) => showToast(`${findEvent(id).title} added to your calendar`), [showToast])

  return (
    <EventsContext.Provider value={{ registered, saved, isRegistered, isSaved, attendeeCount, register, toggleSave, addToCalendar }}>
      {children}
    </EventsContext.Provider>
  )
}

export const useEvents = () => useContext(EventsContext)
