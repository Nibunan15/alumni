import { createContext, useCallback, useContext, useState } from 'react'
import { initialConnectionStatus } from '../data/mockData.js'
import { useToast } from './ToastContext.jsx'

// Connection status per alumni id, kept in memory (no backend):
//   'connected' | 'requested' (sent by you) | 'incoming' (waiting for you) | 'declined' | undefined
const ConnectionsContext = createContext(null)

export function ConnectionsProvider({ children }) {
  const { showToast } = useToast()
  const [status, setStatus] = useState(initialConnectionStatus)
  // Newest first, so accepted requests appear at the top of My Connections.
  const [connectedOrder, setConnectedOrder] = useState(() =>
    Object.keys(initialConnectionStatus).filter((id) => initialConnectionStatus[id] === 'connected').map(Number)
  )

  const setFor = (id, value) => setStatus((prev) => ({ ...prev, [id]: value }))

  const sendRequest = useCallback(
    (id) => {
      setFor(id, 'requested')
      showToast('Connection request sent successfully', { label: 'My Connections', to: '/connections', state: { tab: 'suggestions' } })
    },
    [showToast]
  )

  const acceptRequest = useCallback(
    (id) => {
      setFor(id, 'connected')
      setConnectedOrder((prev) => [id, ...prev.filter((x) => x !== id)])
      showToast('Connection accepted')
    },
    [showToast]
  )

  const declineRequest = useCallback(
    (id) => {
      setFor(id, 'declined')
      showToast('Request declined')
    },
    [showToast]
  )

  const getStatus = useCallback((id) => status[id], [status])
  const connectionCount = Object.values(status).filter((s) => s === 'connected').length

  return (
    <ConnectionsContext.Provider
      value={{ status, getStatus, connectedOrder, connectionCount, sendRequest, acceptRequest, declineRequest }}
    >
      {children}
    </ConnectionsContext.Provider>
  )
}

export const useConnections = () => useContext(ConnectionsContext)
