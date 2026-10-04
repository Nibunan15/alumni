export default function InputField({ label, icon: Icon, id, trailing, ...props }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          id={id}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-[15px] text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100"
          {...props}
        />
        {trailing && <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</div>}
      </div>
    </div>
  )
}
