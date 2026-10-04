import { useState } from 'react'

export default function Avatar({ src, name, className = 'h-14 w-14', rounded = 'rounded-2xl', textSize = '' }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  if (!src || failed) {
    return (
      <div className={`${className} ${rounded} ${textSize} flex shrink-0 items-center justify-center bg-primary-100 font-bold text-primary-800`}>
        {initials}
      </div>
    )
  }
  return <img src={src} alt={name} onError={() => setFailed(true)} className={`${className} ${rounded} shrink-0 object-cover`} />
}
