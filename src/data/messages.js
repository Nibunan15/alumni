// Seed conversations, keyed by alumni id. Times are relative to when the app opens.
const MIN = 60 * 1000
const HOUR = 60 * MIN
const DAY = 24 * HOUR

const thread = (base, lines) =>
  lines.map(([from, text, ago], i) => ({ id: `${base}-${i}`, from, text, ts: Date.now() - ago }))

export const initialConversations = [
  {
    alumniId: 2, online: true, unread: 2,
    messages: thread('p', [
      ['me', 'Hi Priya, I saw that you are working in Data Analytics.', 52 * MIN],
      ['them', "Hi! Yes, I've been working in this field for 3 years.", 48 * MIN],
      ['me', 'Could you share some advice for getting started?', 45 * MIN],
      ['them', 'Sure! Start with SQL, Excel and Python.', 40 * MIN],
      ['me', 'Thank you! Do you have any course recommendations?', 20 * MIN],
      ['them', 'Sure, I can share some resources.', 12 * MIN],
    ]),
  },
  {
    alumniId: 1, online: true, unread: 0,
    messages: thread('a', [
      ['me', 'Hi Arjun, I am Mokana from the 2022 CS batch. I would love to learn about your work at TCS.', 3 * HOUR],
      ['them', 'Thanks for reaching out!', 2 * HOUR + 40 * MIN],
    ]),
  },
  {
    alumniId: 4, online: false, lastSeen: '2h ago', unread: 1,
    messages: thread('s', [
      ['me', 'Hi Sneha, it was nice talking about embedded projects yesterday.', 20 * HOUR],
      ['them', 'Great meeting you at the alumni event!', 18 * HOUR],
    ]),
  },
  {
    alumniId: 3, online: false, lastSeen: 'yesterday', unread: 0,
    messages: thread('r', [
      ['me', 'Hi Rahul, could you review my design portfolio sometime?', DAY + 4 * HOUR],
      ['them', 'Happy to! I am travelling this week though.', DAY + 3 * HOUR],
      ['them', "Let's connect next week.", DAY + 3 * HOUR - 2 * MIN],
    ]),
  },
  {
    alumniId: 5, online: true, unread: 0,
    messages: thread('k', [
      ['me', 'Hey Karthik, is the Infosys referral drive still open?', 3 * DAY],
      ['them', "Yes, it is. I'll send you the details.", 3 * DAY - 30 * MIN],
    ]),
  },
  {
    alumniId: 6, online: false, lastSeen: '3d ago', unread: 0,
    messages: thread('d', [
      ['them', 'Congrats on the new role, Mokana!', 6 * DAY],
      ['me', 'Thank you, Divya! Your product talk really helped.', 6 * DAY - HOUR],
      ['them', 'Happy to review your resume anytime.', 6 * DAY - 2 * HOUR],
    ]),
  },
]

// "10:24 AM" today, "Yesterday", weekday this week, else "28 Sep".
export function formatChatTime(ts, now = Date.now()) {
  const d = new Date(ts)
  const today = new Date(now)
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
  if (ts >= startOfToday) return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()
  if (ts >= startOfToday - DAY) return 'Yesterday'
  if (ts >= startOfToday - 6 * DAY) return d.toLocaleDateString('en-IN', { weekday: 'short' })
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export const formatClock = (ts) =>
  new Date(ts).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()
