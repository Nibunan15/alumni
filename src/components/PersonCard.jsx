import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Avatar from './Avatar.jsx'
import { clickableCard, stretchedLink } from './clickable.js'

// Card used for alumni across the app. The whole card opens the profile;
// buttons in the footer (Connect, Message, Accept...) work on their own.
// `lines` = [{ icon, text, strong }] shown under the name.
export default function PersonCard({ alumni, lines, children }) {
  return (
    <article className={`rounded-2xl border border-slate-100 bg-white shadow-sm ${clickableCard}`}>
      <div className="flex items-start gap-3 p-4 pb-3">
        <Avatar src={alumni.photo} name={alumni.name} />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">
            <Link to={`/alumni/${alumni.id}`} className={stretchedLink}>
              {alumni.name}
            </Link>
          </h3>
          {lines.map(({ icon: Icon, text, strong }) => (
            <p
              key={text}
              className={`mt-1 flex items-start gap-1 text-xs leading-snug ${strong ? 'font-medium text-slate-700' : 'text-slate-500'}`}
            >
              <Icon size={13} className={`mt-px shrink-0 ${strong ? 'text-primary-600' : ''}`} />
              <span>{text}</span>
            </p>
          ))}
        </div>
        <ChevronRight size={18} className="mt-1 shrink-0 text-slate-300" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 [&_a]:relative [&_a]:z-10 [&_button]:relative [&_button]:z-10">
        {children}
      </div>
    </article>
  )
}
