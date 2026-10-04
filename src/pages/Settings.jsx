import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, CircleHelp, Info, KeyRound, LogOut, Mail, Pencil } from 'lucide-react'
import BackHeader from '../components/BackHeader.jsx'
import Toggle from '../components/Toggle.jsx'
import { IconTile } from '../components/ProfileBits.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import useGoBack from '../hooks/useGoBack.js'

function Group({ title, children }) {
  return (
    <section>
      <h2 className="mb-2.5 px-1 text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h2>
      <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white px-4 shadow-sm">{children}</ul>
    </section>
  )
}

const rowClass = 'flex w-full items-center gap-3 py-3.5 text-left'

function LinkRow({ icon, label, value, to, onClick }) {
  const content = (
    <>
      <IconTile icon={icon} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900">{label}</span>
        {value && <span className="block truncate text-xs text-slate-500">{value}</span>}
      </span>
      <ChevronRight size={18} className="shrink-0 text-slate-300" />
    </>
  )
  return (
    <li>
      {to ? (
        <Link to={to} className={`${rowClass} rounded-xl transition-colors hover:text-primary-800`}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={`${rowClass} rounded-xl transition-colors hover:text-primary-800`}>
          {content}
        </button>
      )}
    </li>
  )
}

function ToggleRow({ id, label, description, checked, onChange }) {
  return (
    <li className={rowClass}>
      <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
        <span className="block text-sm font-semibold text-slate-900">{label}</span>
        <span className="block text-xs text-slate-500">{description}</span>
      </label>
      <Toggle id={id} checked={checked} onChange={onChange} label={label} />
    </li>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const goBack = useGoBack('/profile')
  const { user, settings, toggleSetting } = useUser()
  const { showToast } = useToast()

  const toggle = (key) => ({ id: key, checked: settings[key], onChange: () => toggleSetting(key) })

  return (
    <div className="space-y-6">
      <BackHeader title="Settings" onBack={goBack} />

      <Group title="Account">
        <LinkRow icon={Pencil} label="Edit Profile" value="Name, job, skills and about" to="/profile/edit" />
        <LinkRow icon={Mail} label="Email address" value={user.email} onClick={() => showToast('Email changes will be available soon')} />
        <LinkRow icon={KeyRound} label="Change password" onClick={() => showToast('Password changes will be available soon')} />
      </Group>

      <Group title="Notifications">
        <ToggleRow label="Push notifications" description="Alerts on this device" {...toggle('pushNotifications')} />
        <ToggleRow label="Message alerts" description="When an alumni messages you" {...toggle('messageAlerts')} />
        <ToggleRow label="Event reminders" description="A day before events you registered for" {...toggle('eventReminders')} />
        <ToggleRow label="Email updates" description="Monthly alumni newsletter" {...toggle('emailUpdates')} />
      </Group>

      <Group title="Privacy">
        <ToggleRow label="Show me in Find Alumni" description="Other alumni can find your profile" {...toggle('showInDirectory')} />
        <ToggleRow label="Messages from anyone" description="Off: only your connections can message you" {...toggle('openMessages')} />
      </Group>

      <Group title="Support">
        <LinkRow icon={CircleHelp} label="Help & Support" onClick={() => showToast('Help centre will be available soon')} />
        <LinkRow icon={Info} label="About Alumni Connect" value="Version 1.0" onClick={() => showToast('Alumni Connect · Version 1.0')} />
      </Group>

      <button
        type="button"
        onClick={() => navigate('/login', { replace: true })}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-white font-semibold text-red-600 transition-colors hover:bg-red-50 active:bg-red-100"
      >
        <LogOut size={18} />
        Log Out
      </button>
    </div>
  )
}
