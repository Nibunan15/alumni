import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Briefcase, GraduationCap, Inbox, MapPin, MessageCircle, UserCheck, Users } from 'lucide-react'
import BackHeader from '../components/BackHeader.jsx'
import Button from '../components/Button.jsx'
import ConnectButton from '../components/ConnectButton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import PersonCard from '../components/PersonCard.jsx'
import Tabs from '../components/Tabs.jsx'
import { useConnections } from '../context/ConnectionsContext.jsx'
import useGoBack from '../hooks/useGoBack.js'
import { useUiState } from '../context/UiStateContext.jsx'
import { alumniDirectory, findAlumni, suggestedIds } from '../data/mockData.js'

const jobLine = (a) => ({ icon: Briefcase, text: `${a.role}, ${a.company}`, strong: true })

export default function Connections() {
  const navigate = useNavigate()
  const goBack = useGoBack('/home')
  const location = useLocation()
  const [tab, setTab] = useUiState('connections.tab', 'connections')

  // Links like "View request" open a specific tab: navigate('/connections', { state: { tab: 'requests' } }).
  useEffect(() => {
    if (location.state?.tab) setTab(location.state.tab)
  }, [location.key, location.state, setTab])
  const { status, connectedOrder, acceptRequest, declineRequest } = useConnections()

  const connections = connectedOrder.filter((id) => status[id] === 'connected').map(findAlumni)
  const requests = alumniDirectory.filter((a) => status[a.id] === 'incoming')
  const suggestions = suggestedIds
    .map(findAlumni)
    .filter((a) => status[a.id] !== 'connected' && status[a.id] !== 'incoming')

  const tabs = [
    { id: 'connections', label: 'My Connections' },
    { id: 'requests', label: 'Requests', badge: requests.length },
    { id: 'suggestions', label: 'Suggestions' },
  ]

  return (
    <div className="space-y-5">
      <BackHeader title="My Connections" subtitle="Your alumni network" onBack={goBack} />

      <Tabs label="Connections" tabs={tabs} value={tab} onChange={setTab} />

      {tab === 'connections' && (
        <section className="space-y-3" aria-label="My Connections">
          <p className="text-sm font-medium text-slate-500">
            {connections.length} {connections.length === 1 ? 'connection' : 'connections'}
          </p>
          {connections.length === 0 ? (
            <EmptyState icon={Users} title="No connections yet" message="Accept a request or connect with suggested alumni." />
          ) : (
            connections.map((a) => (
              <PersonCard key={a.id} alumni={a} lines={[jobLine(a), { icon: MapPin, text: a.location }]}>
                <span className="flex items-center gap-1 text-xs font-medium text-primary-700">
                  <UserCheck size={14} />
                  Connected
                </span>
                <Button variant="outline" size="sm" onClick={() => navigate(`/messages/${a.id}`)}>
                  <MessageCircle size={16} />
                  Message
                </Button>
              </PersonCard>
            ))
          )}
        </section>
      )}

      {tab === 'requests' && (
        <section className="space-y-3" aria-label="Requests">
          <p className="text-sm font-medium text-slate-500">
            {requests.length} pending {requests.length === 1 ? 'request' : 'requests'}
          </p>
          {requests.length === 0 ? (
            <EmptyState icon={Inbox} title="No pending requests" message="New connection requests will appear here." />
          ) : (
            requests.map((a) => (
              <PersonCard key={a.id} alumni={a} lines={[jobLine(a), { icon: GraduationCap, text: `Class of ${a.year}` }]}>
                <div className="flex w-full gap-3">
                  <Button variant="outline" size="sm" className="h-11 flex-1" onClick={() => declineRequest(a.id)}>
                    Decline
                  </Button>
                  <Button size="sm" className="h-11 flex-1" onClick={() => acceptRequest(a.id)}>
                    Accept
                  </Button>
                </div>
              </PersonCard>
            ))
          )}
        </section>
      )}

      {tab === 'suggestions' && (
        <section className="space-y-3" aria-label="Suggestions">
          <p className="text-sm font-medium text-slate-500">Alumni you may know</p>
          {suggestions.length === 0 ? (
            <EmptyState icon={Users} title="No suggestions right now" message="Check back later for more alumni to connect with." />
          ) : (
            suggestions.map((a) => (
              <PersonCard key={a.id} alumni={a} lines={[jobLine(a), { icon: GraduationCap, text: `${a.department} · ${a.year}` }]}>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Users size={13} className="shrink-0" />
                  {a.mutual} mutual connections
                </span>
                <ConnectButton alumniId={a.id} />
              </PersonCard>
            ))
          )}
        </section>
      )}
    </div>
  )
}
