import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Alumni from './pages/Alumni.jsx'
import AlumniProfile from './pages/AlumniProfile.jsx'
import Connections from './pages/Connections.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import Messages from './pages/Messages.jsx'
import Conversation from './pages/Conversation.jsx'
import Notifications from './pages/Notifications.jsx'
import MyProfile from './pages/MyProfile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import SavedEvents from './pages/SavedEvents.jsx'
import Settings from './pages/Settings.jsx'
import SearchResults from './pages/SearchResults.jsx'
import AppLayout from './components/AppLayout.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Screens that share the bottom navigation. Nested paths keep their tab highlighted. */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/connections" element={<Connections />} />

        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/:id" element={<AlumniProfile />} />

        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<Conversation />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/saved-events" element={<SavedEvents />} />
        <Route path="/profile/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
