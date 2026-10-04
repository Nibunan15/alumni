import { ArrowLeft } from 'lucide-react'
import IconButton from './IconButton.jsx'

export default function BackHeader({ title, subtitle, onBack, action }) {
  return (
    <header className="flex items-center gap-3">
      <IconButton icon={ArrowLeft} label="Back" onClick={onBack} />
      <div className="min-w-0 flex-1">
        <h1 className={`${subtitle ? 'text-xl font-extrabold tracking-tight' : 'text-lg font-bold'} text-slate-900`}>{title}</h1>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}
