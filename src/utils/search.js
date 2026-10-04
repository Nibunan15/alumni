// Shared search matching. Never changes the data it is given.

// Trim, lower-case and collapse repeated spaces: "  PRIYA  " → "priya".
export const normalizeQuery = (query) => query.trim().toLowerCase().replace(/\s+/g, ' ')

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Every word of the query must appear in the fields.
// Short words (1–2 letters, like "AI") must start a word, so "AI" matches
// "AI & DS" but not "Chennai". Longer words can match anywhere ("analyst", "nnai").
export function matchesQuery(fields, query) {
  const q = normalizeQuery(query)
  if (!q) return true
  const haystack = fields.filter((f) => f !== undefined && f !== null).join(' ').toLowerCase()
  return q.split(' ').every((word) => {
    if (word.length >= 3 && haystack.includes(word)) return true
    return new RegExp(`(^|[^a-z0-9])${escapeRegExp(word)}`).test(haystack)
  })
}

export const alumniSearchFields = (a) => [a.name, a.company, a.role, a.department, a.location, String(a.year), `class of ${a.year}`]

export const eventSearchFields = (e) => [e.title, e.location, e.organizer, e.speaker.name, e.category]
