const variants = {
  primary: 'bg-primary-800 text-white hover:bg-primary-900 active:bg-primary-900',
  outline: 'border border-primary-200 bg-white text-primary-800 hover:bg-primary-50 active:bg-primary-100',
  soft: 'bg-primary-50 text-primary-800 hover:bg-primary-100',
}

const sizes = {
  xs: 'h-9 px-2.5 text-xs rounded-xl',
  sm: 'h-9 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-base rounded-2xl',
}

export default function Button({ children, variant = 'primary', size = 'lg', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition duration-150 enabled:active:scale-[0.97] disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
