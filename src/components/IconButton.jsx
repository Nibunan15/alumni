import { Link } from 'react-router-dom'

// Square icon button used in page headers (notifications, settings, back...).
export default function IconButton({ icon: Icon, label, to, onClick, dot = false, active = false }) {
  const className = `relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-colors duration-150 hover:bg-primary-50 active:bg-primary-100 ${
    active ? 'border-primary-200 bg-primary-50 text-primary-800' : 'border-slate-100 bg-white text-slate-700'
  }`
  const content = (
    <>
      <Icon size={20} />
      {dot && <span className="absolute right-3 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />}
    </>
  )
  return to ? (
    <Link to={to} aria-label={label} className={className}>
      {content}
    </Link>
  ) : (
    <button type="button" aria-label={label} aria-pressed={onClick && active ? true : undefined} onClick={onClick} className={className}>
      {content}
    </button>
  )
}
