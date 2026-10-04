// Segmented tabs on a light-blue track. `tabs` = [{ id, label, badge }]
// Labels may wrap to two lines on narrow phones instead of being cut off.
export default function Tabs({ tabs, value, onChange, label }) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 rounded-2xl bg-primary-50 p-1">
      {tabs.map((tab) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`relative flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-xl px-2 py-1.5 text-center text-[13px] font-semibold leading-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              active ? 'bg-white text-primary-800 shadow-sm' : 'text-slate-500 hover:text-primary-800'
            }`}
          >
            {tab.label}
            {tab.badge > 0 && (
              <span
                aria-label={`${tab.badge} pending`}
                className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary-800 px-1 text-[10px] font-bold text-white"
              >
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
