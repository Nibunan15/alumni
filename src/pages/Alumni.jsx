import { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import FilterChips from '../components/FilterChips.jsx'
import AlumniListCard from '../components/AlumniListCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Button from '../components/Button.jsx'
import { alumniDirectory } from '../data/mockData.js'
import { useUiState } from '../context/UiStateContext.jsx'
import { alumniSearchFields, matchesQuery, normalizeQuery } from '../utils/search.js'

// Each filter category maps to one field on the alumni record.
const FILTERS = {
  Batch: 'year',
  Department: 'department',
  Location: 'location',
  Profession: 'profession',
}
const CATEGORIES = ['All', ...Object.keys(FILTERS)]

const uniqueValues = (field) =>
  [...new Set(alumniDirectory.map((a) => a[field]))].sort((a, b) => (field === 'year' ? b - a : String(a).localeCompare(String(b))))

export default function Alumni() {
  // Search text and filters are React state (remembered while you visit a profile and come back).
  const [query, setQuery] = useUiState('alumni.query', '')
  const [category, setCategory] = useUiState('alumni.filter', 'All')
  const [filterValue, setFilterValue] = useUiState('alumni.filterValue', '')

  const field = FILTERS[category]
  const valueOptions = field ? uniqueValues(field).map(String) : []

  // Filter a copy of the original list: search and the chosen filter must both match.
  const results = useMemo(
    () =>
      alumniDirectory.filter((a) => {
        const matchesSearch = matchesQuery(alumniSearchFields(a), query)
        const matchesFilter = !field || !filterValue || String(a[field]) === filterValue
        return matchesSearch && matchesFilter
      }),
    [query, field, filterValue]
  )

  const searchText = normalizeQuery(query) ? query.trim() : ''

  const clearAll = () => {
    setQuery('')
    setCategory('All')
    setFilterValue('')
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Find Alumni</h1>
        <p className="mt-1 text-sm text-slate-500">Connect with alumni from your college</p>
      </header>

      <SearchBar
        id="alumni-search"
        placeholder="Search by name, company, role, department or location..."
        value={query}
        onChange={setQuery}
      />

      <div className="space-y-3">
        <FilterChips
          label="Filter alumni"
          options={CATEGORIES}
          value={category}
          onChange={(c) => {
            setCategory(c)
            setFilterValue('')
          }}
        />
        {field && (
          <div className="rounded-2xl bg-primary-50/60 py-3">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Choose {category === 'Batch' ? 'a batch' : `a ${category.toLowerCase()}`}
            </p>
            <FilterChips
              size="sm"
              bleed={false}
              label={`${category} options`}
              options={valueOptions}
              value={filterValue}
              onChange={(v) => setFilterValue(v === filterValue ? '' : v)}
            />
          </div>
        )}
      </div>

      <p className="text-sm font-medium text-slate-500" aria-live="polite">
        {searchText ? (
          <>
            Search results for <span className="font-bold text-slate-900">"{searchText}"</span>
            <span className="text-slate-400"> · {results.length} found</span>
          </>
        ) : (
          <>
            {results.length} {results.length === 1 ? 'alumnus' : 'alumni'} found
          </>
        )}
      </p>

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((alumni) => (
            <AlumniListCard key={alumni.id} alumni={alumni} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No alumni found"
          message="Try searching with a different name, company or role."
          action={
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear search &amp; filters
            </Button>
          }
        />
      )}
    </div>
  )
}
