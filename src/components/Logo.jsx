import { GraduationCap } from 'lucide-react'

export default function Logo({ size = 'md' }) {
  const box = size === 'lg' ? 'h-16 w-16 rounded-2xl' : 'h-10 w-10 rounded-xl'
  const icon = size === 'lg' ? 32 : 20
  return (
    <div className={`${box} flex items-center justify-center bg-primary-800 text-white shadow-lg shadow-primary-800/20`}>
      <GraduationCap size={icon} strokeWidth={2} />
    </div>
  )
}
