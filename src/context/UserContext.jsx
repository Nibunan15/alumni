import { createContext, useContext, useState } from 'react'
import { initialUser } from '../data/user.js'

// The signed-in user's profile and app settings.
const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser)
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailUpdates: false,
    eventReminders: true,
    messageAlerts: true,
    showInDirectory: true,
    openMessages: true,
  })

  const updateUser = (changes) => setUser((u) => ({ ...u, ...changes }))
  const toggleSetting = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }))
  const fullName = `${user.firstName} ${user.lastName}`.trim()

  return <UserContext.Provider value={{ user, fullName, updateUser, settings, toggleSetting }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
