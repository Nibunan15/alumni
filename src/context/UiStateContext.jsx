import { createContext, useCallback, useContext, useState } from 'react'

// Remembers small bits of screen state (search text, chosen filter, open tab) in memory,
// so they're still there after you open a profile and come back.
// Kept in React state rather than the page address, because the address can be reset
// by the page that hosts the app, which was wiping the search box on every keystroke.
const UiStateContext = createContext(null)

export function UiStateProvider({ children }) {
  const [values, setValues] = useState({})
  const set = useCallback((key, value) => setValues((v) => ({ ...v, [key]: value })), [])
  return <UiStateContext.Provider value={{ values, set }}>{children}</UiStateContext.Provider>
}

export function useUiState(key, initial) {
  const { values, set } = useContext(UiStateContext)
  const value = key in values ? values[key] : initial
  const setValue = useCallback((next) => set(key, next), [key, set])
  return [value, setValue]
}
