import { Link } from 'react-router-dom'
import { MessageCircle, Users } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Avatar from '../components/Avatar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import IconButton from '../components/IconButton.jsx'
import { clickableCard } from '../components/clickable.js'
import { useMessages } from '../context/MessagesContext.jsx'
import { findAlumni } from '../data/mockData.js'
import { formatChatTime } from '../data/messages.js'
import { useUiState } from '../context/UiStateContext.jsx'
import { matchesQuery, normalizeQuery } from '../utils/search.js'

function ConversationRow({ conversation }) {
  const alumni = findAlumni(conversation.alumniId)
  const last = conversation.messages.at(-1)
  const unread = conversation.unread > 0

  return (
    <li>
      <Link
        to={`/messages/${alumni.id}`}
        className={`flex items-center gap-3 rounded-2xl border p-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${clickableCard} ${
          unread ? 'border-primary-100 bg-primary-50/60' : 'border-slate-100 bg-white'
        }`}
      >
        <span className="relative shrink-0">
          <Avatar src={alumni.photo} name={alumni.name} />
          {conversation.online && (
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" aria-label="Online" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="truncate font-bold text-slate-900">{alumni.name}</span>
            <span className={`shrink-0 text-xs ${unread ? 'font-bold text-primary-700' : 'text-slate-400'}`}>{formatChatTime(last.ts)}</span>
          </span>
          <span className="mt-1 flex items-center justify-between gap-2">
            <span className={`truncate text-sm ${unread ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
              {last.from === 'me' && <span className="text-slate-400">You: </span>}
              {last.text}
            </span>
            {unread && (
              <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary-800 px-1.5 text-[11px] font-bold text-white">
                {conversation.unread}
              </span>
            )}
          </span>
        </span>
      </Link>
    </li>
  )
}

export default function Messages() {
  const { conversations } = useMessages()
  const [query, setQuery] = useUiState('messages.query', '')

  const q = normalizeQuery(query)
  const results = conversations.filter((c) => {
    const alumni = findAlumni(c.alumniId)
    return matchesQuery([alumni.name, alumni.company, c.messages.at(-1).text], query)
  })

  return (
    <div className="space-y-5">
      <PageHeader
        title="Messages"
        subtitle="Stay connected with your alumni network"
        action={<IconButton icon={Users} label="My Connections" to="/connections" />}
      />
      <SearchBar id="messages-search" placeholder="Search conversations..." value={query} onChange={setQuery} />

      {results.length > 0 ? (
        <ul className="space-y-2.5">
          {results.map((c) => (
            <ConversationRow key={c.alumniId} conversation={c} />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={MessageCircle}
          title="No conversations found"
          message={q ? 'Try a different name or message.' : 'Start a conversation from any alumni profile.'}
        />
      )}
    </div>
  )
}
