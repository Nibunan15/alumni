import { Link, useNavigate, useParams } from 'react-router-dom'
import { Briefcase, CalendarDays, GraduationCap, Mail, MapPin, MessageCircle, UserX } from 'lucide-react'
import Avatar from '../components/Avatar.jsx'
import BackHeader from '../components/BackHeader.jsx'
import Button from '../components/Button.jsx'
import ConnectButton from '../components/ConnectButton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useConnections } from '../context/ConnectionsContext.jsx'
import { IconTile, InfoChip, ProfileSection, SkillTags, TimelineList } from '../components/ProfileBits.jsx'
import useGoBack from '../hooks/useGoBack.js'
import { findAlumni } from '../data/mockData.js'

export default function AlumniProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const goBack = useGoBack('/alumni')
  const { showToast } = useToast()
  const { getStatus } = useConnections()
  const alumni = findAlumni(id)

  if (!alumni) {
    return (
      <div className="space-y-6">
        <BackHeader title="Alumni Profile" onBack={goBack} />
        <EmptyState icon={UserX} title="Alumni not found" message="This profile doesn't exist." />
      </div>
    )
  }

  const { education } = alumni
  const contacts = [
    { label: 'LinkedIn', value: alumni.linkedin, tile: <span className="text-sm font-extrabold">in</span> },
    { label: 'Email', value: alumni.email, icon: Mail },
  ]

  return (
    <div className="space-y-6">
      <BackHeader title="Alumni Profile" onBack={goBack} />

      {/* Top: photo, name, badge, role and key facts */}
      <section className="flex flex-col items-center text-center">
        <Avatar src={alumni.photo} name={alumni.name} className="h-28 w-28" rounded="rounded-3xl" textSize="text-3xl" />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{alumni.name}</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-800">
            <GraduationCap size={13} />
            Alumni
          </span>
        </div>
        <p className="mt-1.5 text-sm font-semibold text-slate-700">
          {alumni.role} <span className="font-normal text-slate-500">at</span> {alumni.company}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <InfoChip icon={CalendarDays}>Class of {alumni.year}</InfoChip>
          <InfoChip icon={GraduationCap}>{alumni.department}</InfoChip>
          <InfoChip icon={MapPin}>{alumni.location}</InfoChip>
        </div>
      </section>

      <div className="flex gap-3">
        <ConnectButton alumniId={alumni.id} size="lg" className="min-w-0 flex-1 px-3" />
        <Button variant="outline" className="min-w-0 flex-1 px-3" onClick={() => navigate(`/messages/${alumni.id}`)}>
          <MessageCircle size={18} />
          Message
        </Button>
      </div>

      {['connected', 'requested', 'incoming'].includes(getStatus(alumni.id)) && (
        <p className="-mt-3 text-center text-sm">
          <Link
            to="/connections"
            state={{ tab: getStatus(alumni.id) === 'incoming' ? 'requests' : 'connections' }}
            className="font-semibold text-primary-600 underline-offset-2 hover:text-primary-800 hover:underline"
          >
            {getStatus(alumni.id) === 'incoming' ? 'View request in My Connections' : 'Go to My Connections'}
          </Link>
        </p>
      )}

      <ProfileSection title="About">
        <p className="text-sm leading-relaxed text-slate-600">{alumni.about}</p>
      </ProfileSection>

      <ProfileSection title="Education">
        <div className="flex items-start gap-3">
          <IconTile icon={GraduationCap} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">{education.degree}</p>
            <p className="mt-0.5 text-xs text-slate-500">Department of {education.department}</p>
            <p className="mt-0.5 text-xs text-slate-500">{education.college}</p>
            <p className="mt-1.5 text-xs font-semibold text-primary-700">{education.period}</p>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title="Experience">
        <TimelineList icon={Briefcase} items={alumni.experience} />
      </ProfileSection>

      <ProfileSection title="Skills">
        <SkillTags skills={alumni.skills} />
      </ProfileSection>

      <ProfileSection title="Contact">
        <ul className="divide-y divide-slate-100">
          {contacts.map(({ label, value, icon, tile }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => showToast(`${label} links are not active in this demo`)}
                className="flex w-full items-center gap-3 py-3 text-left first:pt-0 rounded-xl transition-colors hover:text-primary-800"
              >
                <IconTile icon={icon}>{tile}</IconTile>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">{label}</span>
                  <span className="block break-all text-sm font-semibold text-slate-900">{value}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </ProfileSection>
    </div>
  )
}
