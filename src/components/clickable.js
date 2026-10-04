// Shared hover/press feedback for any card that opens another screen.
// Pair it with a "stretched" link (see `stretchedLink`) so the whole card is clickable
// while buttons inside the card (Connect, Register...) keep working on their own.
export const clickableCard =
  'relative cursor-pointer transition duration-200 ease-out hover:scale-[1.015] hover:border-primary-200 hover:shadow-md active:scale-[0.995] motion-reduce:transform-none'

export const stretchedLink =
  "focus:outline-none after:absolute after:inset-0 after:z-0 after:rounded-2xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-primary-500"

// Put this on buttons inside a clickable card so they sit above the stretched link.
export const aboveLink = 'relative z-10'
