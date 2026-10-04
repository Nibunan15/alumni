import { Link } from 'react-router-dom'
import { clickableCard } from './clickable.js'

// Light-blue shortcut card. The whole card is the link.
export default function QuickActionCard({ icon: Icon, title, description, to, meta }) {
  return (
    <Link
      to={to}
      className={`flex w-full flex-col items-start rounded-2xl border border-primary-100 bg-primary-50 p-4 text-left hover:bg-primary-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${clickableCard}`}
    >
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-800 shadow-sm">
        <Icon size={20} />
      </span>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{description}</p>
      {meta && <p className="mt-auto pt-2 text-xs font-bold text-primary-700">{meta}</p>}
    </Link>
  )
}
