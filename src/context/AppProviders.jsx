import { ToastProvider } from './ToastContext.jsx'
import { UiStateProvider } from './UiStateContext.jsx'
import { UserProvider } from './UserContext.jsx'
import { NotificationsProvider } from './NotificationsContext.jsx'
import { ConnectionsProvider } from './ConnectionsContext.jsx'
import { EventsProvider } from './EventsContext.jsx'
import { MessagesProvider } from './MessagesContext.jsx'

// All in-memory app state (no backend). Order matters: later providers use earlier ones.
export default function AppProviders({ children }) {
  return (
    <ToastProvider>
      <UiStateProvider>
        <UserProvider>
          <NotificationsProvider>
            <ConnectionsProvider>
              <EventsProvider>
                <MessagesProvider>{children}</MessagesProvider>
              </EventsProvider>
            </ConnectionsProvider>
          </NotificationsProvider>
        </UserProvider>
      </UiStateProvider>
    </ToastProvider>
  )
}
