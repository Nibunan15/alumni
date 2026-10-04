import { BookOpen, BrainCircuit, Compass, Network, PartyPopper, Rocket, Trophy, Users, Video } from 'lucide-react'
import { dateParts } from '../data/events.js'

const icons = { BookOpen, BrainCircuit, Compass, Network, PartyPopper, Rocket, Trophy, Users, Video }

// Illustrated banner drawn in the app's blues (no external images needed).
const tones = {
  deep: { bg: 'bg-primary-800', ring: 'border-white/10', icon: 'text-white/20' },
  mid: { bg: 'bg-primary-600', ring: 'border-white/15', icon: 'text-white/25' },
  light: { bg: 'bg-primary-100', ring: 'border-primary-200', icon: 'text-primary-800/20' },
}

export default function EventBanner({ event, size = 'md', rounded = 'rounded-t-2xl', dimmed = false }) {
  const Icon = icons[event.icon] ?? Users
  const tone = tones[event.tone] ?? tones.deep
  const d = dateParts(event.date)
  const height = size === 'lg' ? 'h-44 sm:h-52' : 'h-32'

  return (
    <div className={`relative overflow-hidden ${tone.bg} ${height} ${rounded} ${dimmed ? 'grayscale-[60%]' : ''}`} aria-hidden="true">
      <span className={`absolute -right-10 -top-12 h-44 w-44 rounded-full border-[28px] ${tone.ring}`} />
      <span className={`absolute -bottom-16 left-1/3 h-36 w-36 rounded-full border-[20px] ${tone.ring}`} />
      <Icon size={size === 'lg' ? 112 : 84} strokeWidth={1.5} className={`absolute bottom-3 right-4 ${tone.icon}`} />
      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-800 shadow-sm">
        {event.category}
      </span>
      <span className="absolute bottom-3 left-3 flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-white text-primary-800 shadow-sm">
        <span className="text-base font-extrabold leading-none">{d.day}</span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide">{d.month}</span>
      </span>
    </div>
  )
}
