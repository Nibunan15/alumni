import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Building2, Camera, CalendarDays, GraduationCap, MapPin, User } from 'lucide-react'
import Avatar from '../components/Avatar.jsx'
import BackHeader from '../components/BackHeader.jsx'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import useGoBack from '../hooks/useGoBack.js'

export default function EditProfile() {
  const navigate = useNavigate()
  const goBack = useGoBack('/profile')
  const { user, fullName, updateUser } = useUser()
  const { showToast } = useToast()
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    company: user.company,
    location: user.location,
    department: user.department,
    year: String(user.year),
    about: user.about,
    skills: user.skills.join(', '),
  })
  const [error, setError] = useState('')

  const field = (key) => ({ value: form[key], onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })) })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.firstName.trim()) {
      setError('Enter your first name.')
      return
    }
    const role = form.role.trim()
    const company = form.company.trim()
    updateUser({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      role,
      company,
      location: form.location.trim(),
      department: form.department.trim(),
      year: Number(form.year) || user.year,
      about: form.about.trim(),
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      // Keep the current job in Experience in step with the headline.
      experience: user.experience.map((job, i) => (i === 0 ? { ...job, title: role, company } : job)),
    })
    showToast('Profile updated')
    navigate('/profile')
  }

  return (
    <div className="space-y-6">
      <BackHeader title="Edit Profile" onBack={goBack} />

      <div className="flex flex-col items-center">
        <Avatar src={user.photo} name={fullName} className="h-24 w-24" rounded="rounded-3xl" textSize="text-2xl" />
        <button
          type="button"
          onClick={() => showToast('Photo upload will be available soon')}
          className="mt-3 inline-flex items-center gap-1.5 rounded-xl px-2 py-1 text-sm font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-800"
        >
          <Camera size={16} />
          Change photo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField id="firstName" label="First name" icon={User} autoComplete="given-name" {...field('firstName')} />
          <InputField id="lastName" label="Last name" icon={User} autoComplete="family-name" {...field('lastName')} />
        </div>
        {error && <p className="-mt-2 text-sm font-medium text-red-600">{error}</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField id="role" label="Job title" icon={Briefcase} {...field('role')} />
          <InputField id="company" label="Company" icon={Building2} {...field('company')} />
        </div>
        <InputField id="location" label="Location" icon={MapPin} {...field('location')} />
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <InputField id="department" label="Department" icon={GraduationCap} {...field('department')} />
          <div className="w-28">
            <InputField id="year" label="Class of" icon={CalendarDays} inputMode="numeric" {...field('year')} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="about" className="block text-sm font-medium text-slate-700">
            About
          </label>
          <textarea
            id="about"
            rows={4}
            {...field('about')}
            className="w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-relaxed text-slate-800 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="skills" className="block text-sm font-medium text-slate-700">
            Skills
          </label>
          <input
            id="skills"
            {...field('skills')}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] text-slate-800 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
          />
          <p className="text-xs text-slate-500">Separate skills with commas.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={goBack}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  )
}
