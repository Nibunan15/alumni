// Building blocks shared by the alumni profile and My Profile.

export function ProfileSection({ title, action, children }) {
  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {action}
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">{children}</div>
    </section>
  )
}

export function IconTile({ icon: Icon, children }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
      {Icon ? <Icon size={18} /> : children}
    </span>
  )
}

export function InfoChip({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
      <Icon size={13} className="shrink-0 text-primary-600" />
      {children}
    </span>
  )
}

export function TimelineList({ icon, items }) {
  return (
    <ul className="divide-y divide-slate-100">
      {items.map((item) => (
        <li key={`${item.title}-${item.period ?? item.detail}`} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
          <IconTile icon={icon} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">{item.title}</p>
            {item.company && <p className="mt-0.5 text-xs text-slate-600">{item.company}</p>}
            {item.detail && <p className="mt-0.5 text-xs text-slate-600">{item.detail}</p>}
            {item.period && <p className="mt-1 text-xs font-semibold text-primary-700">{item.period}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export function SkillTags({ skills }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li key={skill} className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-800">
          {skill}
        </li>
      ))}
    </ul>
  )
}
