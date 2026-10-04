import { createContext, useCallback, useContext, useState } from 'react'
import { initialNotifications } from '../data/notifications.js'

const NotificationsContext = createContext(null)

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markRead = useCallback((id) => setNotifications((list) => list.map((n) => (n.id === id ? { ...n, unread: false } : n))), [])
  const markAllRead = useCallback(() => setNotifications((list) => list.map((n) => ({ ...n, unread: false }))), [])
  const addNotification = useCallback(
    (n) => setNotifications((list) => [{ id: `n${Date.now()}`, time: 'Just now', unread: true, ...n }, ...list]),
    []
  )
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markRead, markAllRead, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationsContext)
