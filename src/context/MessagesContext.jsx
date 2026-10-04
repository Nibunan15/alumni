import { createContext, useCallback, useContext, useState } from 'react'
import { initialConversations } from '../data/messages.js'

// Conversations keyed by alumni id. Sending adds the message straight into state.
const MessagesContext = createContext(null)

export function MessagesProvider({ children }) {
  const [conversations, setConversations] = useState(initialConversations)

  const getConversation = useCallback((alumniId) => conversations.find((c) => c.alumniId === alumniId), [conversations])

  const sendMessage = useCallback((alumniId, text) => {
    const message = { id: `m${Date.now()}`, from: 'me', text, ts: Date.now() }
    setConversations((list) => {
      const existing = list.find((c) => c.alumniId === alumniId)
      if (existing) return list.map((c) => (c.alumniId === alumniId ? { ...c, messages: [...c.messages, message] } : c))
      // First message to someone new starts a conversation.
      return [...list, { alumniId, online: false, lastSeen: 'recently', unread: 0, messages: [message] }]
    })
  }, [])

  const markConversationRead = useCallback(
    (alumniId) => setConversations((list) => list.map((c) => (c.alumniId === alumniId && c.unread ? { ...c, unread: 0 } : c))),
    []
  )

  // Most recent conversation first.
  const sorted = [...conversations].sort((a, b) => b.messages.at(-1).ts - a.messages.at(-1).ts)
  const unreadTotal = conversations.reduce((sum, c) => sum + c.unread, 0)

  return (
    <MessagesContext.Provider value={{ conversations: sorted, getConversation, sendMessage, markConversationRead, unreadTotal }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = () => useContext(MessagesContext)
