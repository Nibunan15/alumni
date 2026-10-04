# Alumni Connect

Connect with your college community. A mobile-first alumni networking app built with React, Vite, Tailwind CSS and Lucide icons (UI/UX assignment). Mock data only, no backend: everything you do is kept in React state until the page is reloaded.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). Use your browser's mobile view for the intended layout. Any email and password will log you in.

## Screens

| Screen | Route | Reached from |
|---|---|---|
| Login | `/login` | App start, Settings → Log Out |
| Home | `/home` | Login, bottom nav |
| Notifications | `/notifications` | Home bell |
| Search Results | `/search` | Home search (Enter or the search icon) |
| Find Alumni | `/alumni` | Bottom nav, Home → Find Alumni, Home → See all |
| Alumni Profile | `/alumni/:id` | Any alumni card (Home, Alumni, Connections), chat header |
| My Connections | `/connections` | Home → My Connections, My Profile, Messages header, Connect toast, alumni profile |
| Events | `/events` | Bottom nav, Home → Upcoming Events, Home → View Events |
| Event Details | `/events/:id` | Any event card (Home, Events, Saved Events), notifications |
| Messages | `/messages` | Bottom nav |
| Chat | `/messages/:id` | Conversation row, alumni profile → Message, Connections → Message, notifications |
| My Profile | `/profile` | Bottom nav |
| Edit Profile | `/profile/edit` | My Profile, Settings |
| Saved Events | `/profile/saved-events` | My Profile, "Event saved" toast |
| Settings | `/profile/settings` | My Profile |

## What works

- **Clickable cards everywhere.** Alumni, event, conversation and notification cards open their detail screen when tapped anywhere on the card; buttons inside (Connect, Register, Message, Accept) do their own action. Cards lift slightly with a shadow on hover.
- **Connections.** Connect → "Request Sent" (disabled) with a toast linking to My Connections. Accept / Decline requests. Connection status is shared by Home, Alumni, profiles and Connections.
- **Events.** Search, All / Upcoming / Registered / Past tabs, 6 upcoming and 3 past events. Register → "Registered", attendee count goes up, and a notification is added. Event Details has organizer, speaker, what you'll learn, Add to Calendar (demo) and a bookmark to save the event.
- **Messages.** 6 conversations with unread counts and online status. Search conversations. The chat sends messages instantly (button or Enter); the newest conversation moves to the top. Messaging someone new from their profile starts a new conversation.
- **Notifications.** Unread items are highlighted with a red dot; tapping one marks it read and opens the related screen. "Mark all read" clears the dot on the Home bell.
- **My Profile.** Profile card, shortcut cards, About, Education, Experience, Skills, Achievements. Edit Profile saves name, job, location, about and skills (Home's greeting updates too). Settings has working toggles and Log Out.

Demo-only actions show a short message instead: Add to Calendar, attachments, change photo, email/password changes, help, and the LinkedIn/Email links on profiles.

## Search

- **Find Alumni** filters while you type, matching name, company, job title, department, location and graduation year. It ignores letter case and extra spaces, and works together with the Batch / Department / Location / Profession filters. The X button (or Escape) clears the search.
- **Home search** opens Search Results on Enter or a click on the search icon. Results are split into Alumni (name, company, role, department, location, batch) and Events (name, location, organizer, speaker), and keep updating as you edit the text there.
- Events and Messages searches use the same matching (`src/utils/search.js`). Every word you type must match; one- and two-letter words like "AI" must start a word, so "AI" finds "AI & DS" but not "Chennai".
- Search text, filters and open tabs are kept in React state (`src/context/UiStateContext.jsx`), not in the page address, so they survive opening a profile and going back.

## Project structure

```
src/
  App.jsx                  all routes
  main.jsx                 entry, HashRouter, AppProviders
  index.css                Tailwind + theme colours (deep blue primary)
  data/
    mockData.js            alumni directory, starting connections, suggestions
    events.js              events, starting registrations/saves, date helpers
    messages.js            seed conversations, time formatting
    notifications.js       seed notifications
    user.js                the signed-in user (Mokana)
  context/                 in-memory app state
    AppProviders.jsx       wraps all providers below
    UiStateContext.jsx     remembered search text, filters and tabs
    ToastContext.jsx       short confirmation messages (with optional link)
    UserContext.jsx        my profile + settings
    ConnectionsContext.jsx connection status per alumni
    EventsContext.jsx      registered + saved events
    MessagesContext.jsx    conversations, send, unread
    NotificationsContext.jsx
  hooks/useGoBack.js       Back button helper
  utils/search.js          shared search matching
  components/
    clickable.js           shared hover/press styles + whole-card link pattern
    AppLayout, BottomNav, Toast, PageHeader, BackHeader, IconButton
    Button, ConnectButton, RegisterButton, Toggle, InputField, SearchBar
    FilterChips, Tabs, EmptyState, SectionHeader, QuickActionCard
    Avatar, AlumniCard, AlumniListCard, PersonCard
    EventCard, EventListCard, EventBanner, ProfileBits
  pages/
    Login, Home, Notifications, Alumni, AlumniProfile, Connections,
    Events, EventDetails, Messages, Conversation,
    MyProfile, EditProfile, SavedEvents, Settings, SearchResults
```

## Notes

- Profile photos load from randomuser.me; if they can't load, initials are shown instead.
- Events treat 4 October 2026 as "today" (`TODAY` in `src/data/events.js`) so Upcoming and Past always sort the same way. Chat times are relative to when you open the app.
