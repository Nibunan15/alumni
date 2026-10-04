import { Check, UserCheck, UserPlus } from 'lucide-react'
import Button from './Button.jsx'
import { useConnections } from '../context/ConnectionsContext.jsx'

// One button that reflects the connection status with this alumni.
// `compact` shrinks the button once it shows a longer state (used on Home's narrow cards).
export default function ConnectButton({ alumniId, size = 'sm', className = '', compact = false }) {
  const { getStatus, sendRequest, acceptRequest } = useConnections()
  const status = getStatus(alumniId)

  const states = {
    connected: { label: 'Connected', icon: UserCheck, variant: 'soft', disabled: true },
    requested: { label: 'Request Sent', icon: Check, variant: 'soft', disabled: true },
    incoming: { label: compact ? 'Accept' : 'Accept Request', icon: UserCheck, variant: 'primary', onClick: () => acceptRequest(alumniId) },
  }
  const { label, icon: Icon, variant, disabled, onClick } =
    states[status] ?? { label: 'Connect', icon: UserPlus, variant: 'primary', onClick: () => sendRequest(alumniId) }

  return (
    <Button size={compact && status && status !== 'declined' ? 'xs' : size} variant={variant} disabled={disabled} onClick={onClick} className={`whitespace-nowrap disabled:cursor-default ${className}`}>
      <Icon size={16} />
      {label}
    </Button>
  )
}
