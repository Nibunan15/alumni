import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import PersonCard from './PersonCard.jsx'
import ConnectButton from './ConnectButton.jsx'

export default function AlumniListCard({ alumni }) {
  return (
    <PersonCard
      alumni={alumni}
      lines={[
        { icon: GraduationCap, text: `${alumni.department} · ${alumni.year}` },
        { icon: Briefcase, text: `${alumni.role}, ${alumni.company}`, strong: true },
      ]}
    >
      <span className="flex items-center gap-1 text-xs text-slate-500">
        <MapPin size={13} className="shrink-0" />
        {alumni.location}
      </span>
      <ConnectButton alumniId={alumni.id} />
    </PersonCard>
  )
}
