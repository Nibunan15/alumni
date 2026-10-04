import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// One short message at a time, shown above the bottom navigation.
// showToast('Saved') or showToast('Request sent', { label: 'View', to: '/connections' })
const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const showToast = useCallback((message, action) => {
    clearTimeout(timer.current)
    setToast({ message, action, key: Date.now() })
    timer.current = setTimeout(() => setToast(null), action ? 4000 : 2500)
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  useEffect(() => () => clearTimeout(timer.current), [])

  return <ToastContext.Provider value={{ toast, showToast, hideToast }}>{children}</ToastContext.Provider>
}

export const useToast = () => useContext(ToastContext)
