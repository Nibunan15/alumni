import { Check, CircleCheck } from 'lucide-react'
import Button from './Button.jsx'
import { useEvents } from '../context/EventsContext.jsx'
import { isPast } from '../data/events.js'

// Register → Registered ✓ (disabled). Past events show Attended / Event ended.
export default function RegisterButton({ event, size = 'sm', label = 'Register', className = '' }) {
  const { isRegistered, register } = useEvents()
  const registered = isRegistered(event.id)

  if (isPast(event)) {
    return (
      <Button size={size} variant="soft" disabled className={`whitespace-nowrap ${className}`}>
        {registered ? <CircleCheck size={16} /> : null}
        {registered ? 'Attended' : 'Event ended'}
      </Button>
    )
  }
  return (
    <Button
      size={size}
      variant={registered ? 'soft' : 'primary'}
      disabled={registered}
      onClick={() => register(event.id)}
      className={`whitespace-nowrap ${className}`}
    >
      {registered && <Check size={16} />}
      {registered ? 'Registered' : label}
    </Button>
  )
}
