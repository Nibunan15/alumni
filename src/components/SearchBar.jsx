import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'

// One search field for the whole app.
// - `onChange` makes it live (results update while typing).
// - `onSubmit` runs on Enter or when the search icon is clicked.
// - The X clears the text; Escape does the same.
// - `filterLink` shows the filter shortcut on the right while the field is empty (Home).
export default function SearchBar({ placeholder = 'Search alumni...', value, onChange, onSubmit, filterLink, id }) {
  const input = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  const clear = () => {
    onChange('')
    input.current?.focus()
  }

  return (
    <form role="search" onSubmit={submit} className="relative">
      <button
        type="submit"
        aria-label="Search"
        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition-colors duration-150 hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <Search size={18} />
      </button>
      <input
        ref={input}
        id={id}
        type="search"
        enterKeyHint="search"
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && value && clear()}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-[15px] placeholder:text-slate-400 shadow-sm transition-[border-color,box-shadow] duration-150 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition-colors duration-150 hover:bg-primary-50 hover:text-primary-800"
        >
          <X size={16} />
        </button>
      ) : (
        filterLink && (
          <Link
            to={filterLink}
            aria-label="Filter alumni"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-primary-50 text-primary-800 transition-colors duration-150 hover:bg-primary-100"
          >
            <SlidersHorizontal size={16} />
          </Link>
        )
      )}
    </form>
  )
}
