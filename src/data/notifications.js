// `to` is where tapping the notification takes you.
export const initialNotifications = [
  { id: 'n1', type: 'accepted', title: 'Connection accepted', text: 'Divya Lakshmi accepted your connection request.', time: '10m ago', unread: true, to: '/alumni/6' },
  { id: 'n3', type: 'message', title: 'New message', text: 'Priya Sharma: Sure, I can share some resources.', time: '12m ago', unread: true, to: '/messages/2' },
  { id: 'n2', type: 'request', title: 'New connection request', text: 'Harini Venkat wants to connect with you.', time: '1h ago', unread: true, to: '/connections', state: { tab: 'requests' } },
  { id: 'n4', type: 'registration', title: 'Event registration confirmed', text: "You're registered for Career Guidance Session on 22 October.", time: 'Yesterday', unread: false, to: '/events/2' },
  { id: 'n5', type: 'reminder', title: 'Event reminder', text: 'Alumni Meet 2026 is on 15 October at 10:00 AM in the College Auditorium.', time: '2d ago', unread: false, to: '/events/1' },
  { id: 'n6', type: 'request', title: 'New connection request', text: 'Mohammed Irfan wants to connect with you.', time: '3d ago', unread: false, to: '/connections', state: { tab: 'requests' } },
]
