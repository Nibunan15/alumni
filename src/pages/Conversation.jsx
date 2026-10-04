import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCheck, MessageCircle, Paperclip, Send, UserRound, UserX } from 'lucide-react'
import Avatar from '../components/Avatar.jsx'
import BackHeader from '../components/BackHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import IconButton from '../components/IconButton.jsx'
import { useMessages } from '../context/MessagesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import useGoBack from '../hooks/useGoBack.js'
import { findAlumni } from '../data/mockData.js'
import { formatClock } from '../data/messages.js'

const dayLabel = (ts) => {
  const d = new Date(ts)
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (ts >= start) return 'Today'
  if (ts >= start - 86400000) return 'Yesterday'
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })
}

export default function Conversation() {
  const { id } = useParams()
  const goBack = useGoBack('/messages')
  const { getConversation, sendMessage, markConversationRead } = useMessages()
  const { showToast } = useToast()
  const [draft, setDraft] = useState('')
  const scroller = useRef(null)
  const alumni = findAlumni(id)
  const conversation = alumni ? getConversation(alumni.id) : null
  const messages = conversation?.messages ?? []

  // Opening the chat clears its unread badge.
  useEffect(() => {
    if (alumni && conversation?.unread) markConversationRead(alumni.id)
  }, [alumni, conversation?.unread, markConversationRead])

  // Keep the latest message in view.
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [messages.length])

  if (!alumni) {
    return (
      <div className="space-y-6">
        <BackHeader title="Messages" onBack={goBack} />
        <EmptyState icon={UserX} title="Conversation not found" message="This alumni doesn't exist." />
      </div>
    )
  }

  const handleSend = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    sendMessage(alumni.id, text)
    setDraft('')
  }

  const firstName = alumni.name.split(' ')[0]

  return (
    <div className="-mb-4 flex h-[calc(100dvh-7.5rem)] flex-col">
      {/* Chat header */}
      <header className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <IconButton icon={ArrowLeft} label="Back" onClick={goBack} />
        <Link to={`/alumni/${alumni.id}`} className="flex min-w-0 flex-1 items-center gap-3 rounded-xl hover:opacity-80">
          <span className="relative shrink-0">
            <Avatar src={alumni.photo} name={alumni.name} className="h-11 w-11" rounded="rounded-xl" textSize="text-sm" />
            {conversation?.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-bold text-slate-900">{alumni.name}</span>
            <span className="block truncate text-xs text-slate-500">
              {conversation?.online ? (
                <span className="font-semibold text-emerald-600">Online</span>
              ) : (
                `Last seen ${conversation?.lastSeen ?? 'recently'}`
              )}
            </span>
          </span>
        </Link>
        <IconButton icon={UserRound} label={`View ${firstName}'s profile`} to={`/alumni/${alumni.id}`} />
      </header>

      {/* Messages */}
      <div ref={scroller} className="flex-1 overflow-y-auto py-4" aria-live="polite">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-800">
              <MessageCircle size={26} />
            </span>
            <p className="mt-4 font-bold text-slate-900">Start a conversation with {firstName}</p>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
              Introduce yourself and mention your batch, {alumni.role.toLowerCase()} questions or advice you're looking for.
            </p>
          </div>
        ) : (
          <ol className="space-y-2">
            {messages.map((m, i) => {
              const mine = m.from === 'me'
              const newDay = i === 0 || dayLabel(m.ts) !== dayLabel(messages[i - 1].ts)
              return (
                <Fragment key={m.id}>
                  {newDay && (
                    <li className="flex justify-center py-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">{dayLabel(m.ts)}</span>
                    </li>
                  )}
                  <li className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        mine ? 'rounded-br-md bg-primary-800 text-white' : 'rounded-bl-md bg-primary-50 text-slate-800'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{m.text}</p>
                      <p className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${mine ? 'text-primary-100' : 'text-slate-400'}`}>
                        {formatClock(m.ts)}
                        {mine && <CheckCheck size={12} />}
                      </p>
                    </div>
                  </li>
                </Fragment>
              )
            })}
          </ol>
        )}
      </div>

      {/* Composer */}
      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-100 pt-3">
        <button
          type="button"
          aria-label="Attach a file"
          onClick={() => showToast('File sharing will be available soon')}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-800"
        >
          <Paperclip size={20} />
        </button>
        <input
          id="chat-message"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Message ${firstName}...`}
          aria-label={`Message ${firstName}`}
          autoComplete="off"
          className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-[15px] placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!draft.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white transition duration-150 hover:bg-primary-900 enabled:active:scale-95 disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
