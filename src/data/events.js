// Fixed "today" for the demo so Upcoming / Past always sort the same way.
export const TODAY = '2026-10-04'

export const events = [
  {
    id: 1, title: 'Alumni Meet 2026', date: '2026-10-15', time: '10:00 AM', location: 'College Auditorium', category: 'Reunion', icon: 'Users', tone: 'deep', attendees: 248,
    description: 'Our biggest reunion of the year. Meet batchmates, faculty and alumni from every department.',
    about: 'The annual Alumni Meet brings graduates from every batch back to campus for a day of reconnecting. The day opens with a welcome from the Principal, followed by batch-wise meetups, a felicitation of distinguished alumni and an evening cultural programme.',
    organizer: 'Alumni Relations Office', speaker: { name: 'Dr. R. Meenakshi', role: 'Principal, Kaveri College of Engineering' },
    learn: ['What has changed on campus since you graduated', 'How to mentor current students through the alumni programme', 'Upcoming chapter meetups in your city'],
  },
  {
    id: 2, title: 'Career Guidance Session', date: '2026-10-22', time: '2:00 PM', location: 'Seminar Hall', category: 'Career', icon: 'Compass', tone: 'mid', attendees: 112,
    description: 'Alumni from top companies share how they chose their path and prepared for placements.',
    about: 'A panel of alumni working in software, analytics, core engineering and product roles answer student questions about choosing a career path, preparing for interviews and building a strong resume.',
    organizer: 'Training & Placement Cell', speaker: { name: 'Divya Lakshmi', role: 'Product Manager, Freshworks (Class of 2018)' },
    learn: ['How to choose between product, service and core companies', 'Resume and interview tips from recruiters', 'Skills worth learning in your final year'],
  },
  {
    id: 3, title: 'Tech Alumni Networking', date: '2026-11-05', time: '11:00 AM', location: 'Innovation Centre', category: 'Networking', icon: 'Network', tone: 'light', attendees: 86,
    description: 'An informal meetup for alumni working in technology to swap ideas and find collaborators.',
    about: 'Short lightning talks followed by open networking tables grouped by domain: web, data, embedded and design. Bring your questions, side projects and visiting cards.',
    organizer: 'Alumni Tech Chapter', speaker: { name: 'Karthik S', role: 'Full Stack Developer, Infosys (Class of 2023)' },
    learn: ['What alumni are building at their companies', 'How to find mentors and collaborators', 'Open roles and referral opportunities'],
  },
  {
    id: 4, title: 'Entrepreneurship Talk', date: '2026-11-12', time: '3:00 PM', location: 'Main Auditorium', category: 'Talk', icon: 'Rocket', tone: 'deep', attendees: 154,
    description: 'Alumni founders talk about starting up, raising funds and lessons from early mistakes.',
    about: 'Two alumni founders share the story of their startups, from the first idea in the college hostel to raising seed funding. The talk ends with a Q&A and a chance to pitch your idea in 60 seconds.',
    organizer: 'Entrepreneurship Development Cell', speaker: { name: 'Nisha Raghavan', role: 'Founder, FarmLink (Class of 2015)' },
    learn: ['How to validate a startup idea cheaply', 'Funding options for first-time founders', 'Mistakes to avoid in your first year'],
  },
  {
    id: 5, title: 'AI & Future Technologies', date: '2026-11-20', time: '10:30 AM', location: 'Computer Science Block', category: 'Workshop', icon: 'BrainCircuit', tone: 'mid', attendees: 173,
    description: 'A hands-on look at how AI is changing software, data and engineering careers.',
    about: 'Alumni working in machine learning walk through real projects, explain the tools they use every day and run a short hands-on session on building a simple ML model.',
    organizer: 'Department of AI & Data Science', speaker: { name: 'Ananya Iyer', role: 'Machine Learning Engineer, Amazon (Class of 2022)' },
    learn: ['Where AI is used in real products today', 'The tools and skills ML teams look for', 'How to start your first ML project'],
  },
  {
    id: 6, title: 'Alumni Sports Meet', date: '2026-12-05', time: '9:00 AM', location: 'College Ground', category: 'Sports', icon: 'Trophy', tone: 'light', attendees: 96,
    description: 'Cricket, football and relay races between alumni and student teams. Families welcome.',
    about: 'A friendly sports day with cricket, football, throwball and relay races. Alumni teams play against current students, followed by lunch and a prize distribution.',
    organizer: 'Physical Education Department', speaker: { name: 'Vignesh Babu', role: 'Project Manager, L&T Construction (Class of 2017)' },
    learn: ['Team up with your old batchmates', 'Meet current student athletes', 'Prize distribution and alumni awards'],
  },
  {
    id: 7, title: 'Placement Prep Bootcamp', date: '2026-09-12', time: '9:30 AM', location: 'Computer Science Block', category: 'Workshop', icon: 'BookOpen', tone: 'mid', attendees: 140,
    description: 'A full-day bootcamp on aptitude, coding rounds and mock interviews with alumni.',
    about: 'Alumni volunteers ran aptitude practice, a coding round and one-to-one mock interviews for final-year students.',
    organizer: 'Training & Placement Cell', speaker: { name: 'Arjun Kumar', role: 'Software Engineer, TCS (Class of 2022)' },
    learn: ['Aptitude shortcuts', 'Coding round strategy', 'Mock interview feedback'],
  },
  {
    id: 8, title: 'Webinar: Breaking into Product Design', date: '2026-08-21', time: '6:00 PM', location: 'Online', category: 'Webinar', icon: 'Video', tone: 'light', attendees: 210,
    description: 'Alumni designers shared how they built portfolios and moved into product design roles.',
    about: 'An evening webinar on building a design portfolio, preparing for design challenges and growing as a product designer.',
    organizer: 'Alumni Design Circle', speaker: { name: 'Rahul Raj', role: 'Product Designer, Zoho (Class of 2020)' },
    learn: ['Portfolio structure', 'Design challenge tips', 'Career growth in design'],
  },
  {
    id: 9, title: 'Annual Alumni Day 2025', date: '2025-12-20', time: '10:00 AM', location: 'College Auditorium', category: 'Reunion', icon: 'PartyPopper', tone: 'deep', attendees: 320,
    description: 'Last year’s alumni day with batch reunions, awards and a cultural evening.',
    about: 'Alumni from 25 batches returned to campus for reunions, the distinguished alumni awards and a cultural evening.',
    organizer: 'Alumni Relations Office', speaker: { name: 'Dr. R. Meenakshi', role: 'Principal, Kaveri College of Engineering' },
    learn: ['Batch reunions', 'Distinguished alumni awards', 'Cultural evening'],
  },
]

export const initialRegistered = [2, 7, 9] // Career Guidance (upcoming) + two past events attended
export const initialSaved = [4, 5]

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function dateParts(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return {
    day: String(d),
    month: months[m - 1].slice(0, 3),
    long: `${d} ${months[m - 1]} ${y}`,
    weekday: weekdays[date.getDay()],
  }
}

export const isPast = (event) => event.date < TODAY
export const findEvent = (id) => events.find((e) => String(e.id) === String(id))
export const upcomingEvents = () => events.filter((e) => !isPast(e)).sort((a, b) => a.date.localeCompare(b.date))
