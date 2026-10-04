// The signed-in student/alumnus. Edit Profile updates a copy of this in React state.
export const initialUser = {
  firstName: 'Mokana',
  lastName: '',
  photo: 'https://randomuser.me/api/portraits/women/21.jpg',
  department: 'Computer Science',
  year: 2022,
  role: 'Software Engineer',
  company: 'Honeywell',
  location: 'Bangalore',
  email: 'mokana@alumni.kce.edu.in',
  about: 'Software engineer interested in web development, AI and building useful digital products.',
  education: { degree: 'B.Tech Computer Science', period: '2018 – 2022' },
  experience: [{ title: 'Software Engineer', company: 'Honeywell', period: '2022 – Present' }],
  skills: ['React', 'JavaScript', 'Python', 'UI/UX', 'SQL'],
  achievements: [
    { title: 'Hackathon Winner 2022', detail: 'First place, Smart India Hackathon (college round)' },
    { title: 'Best Project Award', detail: 'Final-year project on campus placement analytics' },
    { title: 'College Tech Club Lead', detail: 'Led workshops and coding contests, 2021 – 2022' },
  ],
}
