export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary-800 shadow-sm">
        <Icon size={26} />
      </span>
      <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
      {message && <p className="mt-1 text-sm text-slate-500">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
