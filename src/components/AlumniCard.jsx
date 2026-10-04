import { Link } from 'react-router-dom'
import { Briefcase, GraduationCap } from 'lucide-react'
import Avatar from './Avatar.jsx'
import ConnectButton from './ConnectButton.jsx'
import { aboveLink, clickableCard, stretchedLink } from './clickable.js'

// Compact alumni card used on Home. Card → profile, Connect → request.
export default function AlumniCard({ alumni }) {
  return (
    <article className={`flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm ${clickableCard}`}>
      <Avatar src={alumni.photo} name={alumni.name} />
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-slate-900">
          <Link to={`/alumni/${alumni.id}`} className={stretchedLink}>
            {alumni.name}
          </Link>
        </h3>
        <p className="mt-1 flex items-start gap-1 text-xs leading-snug text-slate-500">
          <GraduationCap size={13} className="mt-px shrink-0" />
          <span>
            {alumni.department} · {alumni.year}
          </span>
        </p>
        <p className="mt-1 flex items-start gap-1 text-xs font-medium leading-snug text-slate-700">
          <Briefcase size={13} className="mt-px shrink-0 text-primary-600" />
          <span>
            {alumni.role}, {alumni.company}
          </span>
        </p>
      </div>
      <ConnectButton alumniId={alumni.id} compact className={`shrink-0 ${aboveLink}`} />
    </article>
  )
}
