// A horizontally scrolling row of chips. `size="sm"` is used for the second row of filter values.
export default function FilterChips({ options, value, onChange, size = 'md', label, bleed = true }) {
  const base = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-4 text-sm'
  return (
    <div role="group" aria-label={label} className={`${bleed ? '-mx-5 px-5' : 'px-3'} flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={`${base} shrink-0 whitespace-nowrap rounded-full border font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              active
                ? 'border-primary-800 bg-primary-800 text-white'
                : 'border-primary-100 bg-primary-50 text-primary-800 hover:border-primary-200'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
