import { Award, Bookmark, Briefcase, CalendarDays, GraduationCap, MapPin, Pencil, Settings, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import Button from '../components/Button.jsx'
import IconButton from '../components/IconButton.jsx'
import PageHeader from '../components/PageHeader.jsx'
import QuickActionCard from '../components/QuickActionCard.jsx'
import { IconTile, InfoChip, ProfileSection, SkillTags, TimelineList } from '../components/ProfileBits.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useConnections } from '../context/ConnectionsContext.jsx'
import { useEvents } from '../context/EventsContext.jsx'
import { COLLEGE } from '../data/mockData.js'

export default function MyProfile() {
  const navigate = useNavigate()
  const { user, fullName } = useUser()
  const { connectionCount } = useConnections()
  const { saved } = useEvents()

  const actions = [
    { icon: Pencil, title: 'Edit Profile', description: 'Update your details', to: '/profile/edit' },
    { icon: Users, title: 'My Connections', description: 'Your alumni network', to: '/connections', meta: `${connectionCount} connections` },
    { icon: Bookmark, title: 'Saved Events', description: 'Events you bookmarked', to: '/profile/saved-events', meta: `${saved.size} saved` },
    { icon: Settings, title: 'Settings', description: 'Notifications & privacy', to: '/profile/settings' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" action={<IconButton icon={Settings} label="Settings" to="/profile/settings" />} />

      {/* Profile header card */}
      <section className="rounded-2xl border border-primary-100 bg-primary-50 p-5">
        <div className="flex items-center gap-4">
          <Avatar src={user.photo} name={fullName} className="h-20 w-20" rounded="rounded-3xl" textSize="text-2xl" />
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">{fullName}</h2>
            <p className="mt-0.5 text-sm font-semibold text-slate-700">
              {user.role} <span className="font-normal text-slate-500">at</span> {user.company}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <InfoChip icon={GraduationCap}>{user.department}</InfoChip>
          <InfoChip icon={CalendarDays}>Class of {user.year}</InfoChip>
          <InfoChip icon={MapPin}>{user.location}</InfoChip>
        </div>
        <div className="mt-4 flex gap-3">
          <Button size="sm" className="h-11 flex-1" onClick={() => navigate('/profile/edit')}>
            <Pencil size={16} />
            Edit Profile
          </Button>
          <Button size="sm" variant="outline" className="h-11 flex-1" onClick={() => navigate('/profile/settings')}>
            <Settings size={16} />
            Settings
          </Button>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </section>

      <ProfileSection title="About">
        <p className="text-sm leading-relaxed text-slate-600">{user.about}</p>
      </ProfileSection>

      <ProfileSection title="Education">
        <div className="flex items-start gap-3">
          <IconTile icon={GraduationCap} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">{user.education.degree}</p>
            <p className="mt-0.5 text-xs text-slate-500">{COLLEGE}</p>
            <p className="mt-1.5 text-xs font-semibold text-primary-700">{user.education.period}</p>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection title="Experience">
        <TimelineList icon={Briefcase} items={user.experience} />
      </ProfileSection>

      <ProfileSection title="Skills">
        <SkillTags skills={user.skills} />
      </ProfileSection>

      <ProfileSection title="Achievements">
        <TimelineList icon={Award} items={user.achievements} />
      </ProfileSection>
    </div>
  )
}
