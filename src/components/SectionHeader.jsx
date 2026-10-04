import { Link } from 'react-router-dom'

export default function SectionHeader({ title, actionLabel = 'See all', to }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {actionLabel && to && (
        <Link to={to} className="rounded-lg px-1 text-sm font-semibold text-primary-600 hover:text-primary-800 hover:underline underline-offset-2">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
