import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'

export default function Toast() {
  const { toast, hideToast } = useToast()
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-30 flex justify-center px-5">
      {toast && (
        <div key={toast.key} className="pointer-events-auto flex max-w-md items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          <CheckCircle2 size={18} className="shrink-0 text-primary-200" />
          <span>{toast.message}</span>
          {toast.action && (
            <Link to={toast.action.to} state={toast.action.state} onClick={hideToast} className="ml-1 shrink-0 font-bold text-primary-200 underline-offset-2 hover:underline">
              {toast.action.label}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
