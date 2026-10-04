export const COLLEGE = 'Kaveri College of Engineering, Chennai'

const degreeFor = {
  'Computer Science': 'B.Tech Computer Science',
  'AI & DS': 'B.Tech Artificial Intelligence & Data Science',
  'Information Technology': 'B.Tech Information Technology',
  ECE: 'B.E. Electronics & Communication Engineering',
  CSE: 'B.E. Computer Science & Engineering',
  Mechanical: 'B.E. Mechanical Engineering',
  EEE: 'B.E. Electrical & Electronics Engineering',
  Civil: 'B.E. Civil Engineering',
  Biomedical: 'B.E. Biomedical Engineering',
}

// Base records: everything the Alumni list and profile need.
const people = [
  {
    id: 1, name: 'Arjun Kumar', year: 2022, department: 'Computer Science', role: 'Software Engineer', company: 'TCS', location: 'Chennai', profession: 'Engineering', photo: 'https://randomuser.me/api/portraits/men/32.jpg', mutual: 3,
    about: 'Software engineer with 3+ years of experience in web development and a strong interest in building scalable digital products.',
    experience: [
      { title: 'Software Engineer', company: 'TCS', period: '2022 – Present' },
      { title: 'Web Development Intern', company: 'Kissflow', period: 'Jan 2022 – Jun 2022' },
    ],
    skills: ['React', 'JavaScript', 'Python', 'UI/UX', 'Git'],
  },
  {
    id: 2, name: 'Priya Sharma', year: 2021, department: 'AI & DS', role: 'Data Analyst', company: 'Deloitte', location: 'Bangalore', profession: 'Data & Analytics', photo: 'https://randomuser.me/api/portraits/women/44.jpg', mutual: 5,
    about: 'Data analyst who turns messy business data into clear dashboards. Enjoys mentoring juniors on SQL and storytelling with data.',
    experience: [
      { title: 'Data Analyst', company: 'Deloitte', period: '2021 – Present' },
      { title: 'Analytics Intern', company: 'Mu Sigma', period: '2020 – 2021' },
    ],
    skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Statistics'],
  },
  {
    id: 3, name: 'Rahul Raj', year: 2020, department: 'Information Technology', role: 'Product Designer', company: 'Zoho', location: 'Chennai', profession: 'Design', photo: 'https://randomuser.me/api/portraits/men/75.jpg', mutual: 2,
    about: 'Product designer focused on simple, accessible SaaS experiences. Happy to review portfolios for students moving into design.',
    experience: [
      { title: 'Product Designer', company: 'Zoho', period: '2022 – Present' },
      { title: 'UI Designer', company: 'Zoho', period: '2020 – 2022' },
    ],
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Design Systems'],
  },
  {
    id: 4, name: 'Sneha Devi', year: 2019, department: 'ECE', role: 'Electronics Engineer', company: 'Bosch', location: 'Coimbatore', profession: 'Engineering', photo: 'https://randomuser.me/api/portraits/women/65.jpg', mutual: 4,
    about: 'Electronics engineer working on automotive sensor modules. Interested in IoT, PCB design and helping students prepare for core-company interviews.',
    experience: [
      { title: 'Electronics Engineer', company: 'Bosch', period: '2021 – Present' },
      { title: 'Graduate Engineer Trainee', company: 'L&T Technology Services', period: '2019 – 2021' },
    ],
    skills: ['Embedded C', 'PCB Design', 'MATLAB', 'IoT', 'Altium'],
  },
  {
    id: 5, name: 'Karthik S', year: 2023, department: 'CSE', role: 'Full Stack Developer', company: 'Infosys', location: 'Chennai', profession: 'Engineering', photo: 'https://randomuser.me/api/portraits/men/46.jpg', mutual: 6,
    about: 'Full stack developer building internal tools with React and Node.js. Recently started contributing to open-source projects.',
    experience: [{ title: 'Full Stack Developer', company: 'Infosys', period: '2023 – Present' }],
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Git'],
  },
  {
    id: 6, name: 'Divya Lakshmi', year: 2018, department: 'Mechanical', role: 'Product Manager', company: 'Freshworks', location: 'Chennai', profession: 'Management', photo: 'https://randomuser.me/api/portraits/women/68.jpg', mutual: 7,
    about: 'Moved from mechanical engineering into product management. Leads a team building customer support tools used by thousands of businesses.',
    experience: [
      { title: 'Product Manager', company: 'Freshworks', period: '2021 – Present' },
      { title: 'Associate Product Manager', company: 'Freshworks', period: '2019 – 2021' },
    ],
    skills: ['Product Strategy', 'Roadmapping', 'Jira', 'Analytics', 'Communication'],
  },
  {
    id: 7, name: 'Mohammed Irfan', year: 2021, department: 'EEE', role: 'Embedded Systems Engineer', company: 'Texas Instruments', location: 'Bangalore', profession: 'Engineering', photo: 'https://randomuser.me/api/portraits/men/52.jpg', mutual: 3,
    about: 'Embedded systems engineer working on low-power microcontroller firmware. Enjoys robotics and organising hackathons.',
    experience: [{ title: 'Embedded Systems Engineer', company: 'Texas Instruments', period: '2021 – Present' }],
    skills: ['C', 'RTOS', 'ARM Cortex', 'Python', 'Oscilloscopes'],
  },
  {
    id: 8, name: 'Ananya Iyer', year: 2022, department: 'AI & DS', role: 'Machine Learning Engineer', company: 'Amazon', location: 'Hyderabad', profession: 'Data & Analytics', photo: 'https://randomuser.me/api/portraits/women/26.jpg', mutual: 4,
    about: 'Machine learning engineer working on recommendation models. Passionate about applied NLP and helping students get started with ML.',
    experience: [
      { title: 'Machine Learning Engineer', company: 'Amazon', period: '2023 – Present' },
      { title: 'Data Scientist', company: 'Tiger Analytics', period: '2022 – 2023' },
    ],
    skills: ['Python', 'PyTorch', 'NLP', 'AWS', 'SQL'],
  },
  {
    id: 9, name: 'Vignesh Babu', year: 2017, department: 'Civil', role: 'Project Manager', company: 'L&T Construction', location: 'Mumbai', profession: 'Management', photo: 'https://randomuser.me/api/portraits/men/86.jpg', mutual: 2,
    about: 'Project manager delivering large metro rail projects. Believes site experience is the best teacher for civil engineers.',
    experience: [
      { title: 'Project Manager', company: 'L&T Construction', period: '2021 – Present' },
      { title: 'Site Engineer', company: 'L&T Construction', period: '2017 – 2021' },
    ],
    skills: ['Project Planning', 'AutoCAD', 'Primavera', 'Site Management', 'Estimation'],
  },
  {
    id: 10, name: 'Meera Nair', year: 2020, department: 'Information Technology', role: 'UX Designer', company: 'Swiggy', location: 'Bangalore', profession: 'Design', photo: 'https://randomuser.me/api/portraits/women/12.jpg', mutual: 5,
    about: 'UX designer working on the food ordering experience. Loves usability testing and turning research into simple flows.',
    experience: [
      { title: 'UX Designer', company: 'Swiggy', period: '2022 – Present' },
      { title: 'UX Design Intern', company: 'Zoho', period: '2020 – 2021' },
    ],
    skills: ['Figma', 'Usability Testing', 'Wireframing', 'UI/UX', 'HTML/CSS'],
  },
  {
    id: 11, name: 'Harini Venkat', year: 2023, department: 'Biomedical', role: 'Clinical Data Associate', company: 'IQVIA', location: 'Chennai', profession: 'Data & Analytics', photo: 'https://randomuser.me/api/portraits/women/33.jpg', mutual: 2,
    about: 'Clinical data associate supporting drug trials. Interested in healthcare analytics and medical devices.',
    experience: [{ title: 'Clinical Data Associate', company: 'IQVIA', period: '2023 – Present' }],
    skills: ['Clinical Research', 'SAS', 'Excel', 'Medical Devices', 'Data Review'],
  },
  {
    id: 12, name: 'Sanjay Krishnan', year: 2019, department: 'Mechanical', role: 'Design Engineer', company: 'Ashok Leyland', location: 'Chennai', profession: 'Engineering', photo: 'https://randomuser.me/api/portraits/men/41.jpg', mutual: 4,
    about: 'Design engineer working on commercial vehicle chassis. Enjoys CAD, motorsport and guiding final-year project teams.',
    experience: [
      { title: 'Design Engineer', company: 'Ashok Leyland', period: '2020 – Present' },
      { title: 'Graduate Trainee', company: 'TVS Motor', period: '2019 – 2020' },
    ],
    skills: ['SolidWorks', 'CATIA', 'GD&T', 'ANSYS', 'Teamwork'],
  },
]

const slug = (name) => name.toLowerCase().replace(/[^a-z]+/g, '.').replace(/\.$/, '')

// Full alumni directory used by the Alumni section, profiles and connections.
export const alumniDirectory = people.map((p) => ({
  ...p,
  education: { degree: degreeFor[p.department], department: p.department, college: COLLEGE, period: `${p.year - 4} – ${p.year}` },
  email: `${slug(p.name)}@alumni.kce.edu.in`,
  linkedin: `linkedin.com/in/${slug(p.name).replace(/\./g, '-')}`,
}))

export const findAlumni = (id) => alumniDirectory.find((a) => String(a.id) === String(id))

// Starting connection state for the signed-in user (Mokana).
// connected = already in My Connections, incoming = waiting in Requests.
export const initialConnectionStatus = {
  4: 'connected',
  5: 'connected',
  6: 'connected',
  9: 'connected',
  10: 'connected',
  7: 'incoming',
  8: 'incoming',
  11: 'incoming',
}

// Alumni recommended in the Suggestions tab.
export const suggestedIds = [1, 2, 3, 12]
