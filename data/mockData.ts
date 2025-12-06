
import { Resource, Article, Teacher, Student, Notification } from '../types';

export const mockResources: Resource[] = [
    { id: 1, fileName: 'Algebra_Chapter_5.pdf', subject: 'Mathematics', uploader: 'Mr. Ben Carter', date: '2023-10-19', type: 'pdf' },
    { id: 2, fileName: 'Photosynthesis_Lab_Report.docx', subject: 'Science', uploader: 'Dr. Evelyn Reed', date: '2023-10-18', type: 'doc' },
    { id: 3, fileName: 'The_Great_Gatsby_Analysis.pdf', subject: 'English', uploader: 'Ms. Clara Oswald', date: '2023-10-17', type: 'pdf' },
    { id: 4, fileName: 'WWII_Timeline.xlsx', subject: 'History', uploader: 'Ms. Aisha Khan', date: '2023-10-16', type: 'xls' },
    { id: 5, fileName: 'Intro_to_Physics_Slides.pptx', subject: 'Science', uploader: 'Dr. Evelyn Reed', date: '2023-10-15', type: 'ppt' },
];

export const mockArticles: Article[] = [
  { 
    id: 1, 
    title: 'Breakthrough in Quantum Physics Lab', 
    author: 'Dr. Evelyn Reed', 
    date: 'Oct 26, 2023', 
    excerpt: 'Our Grade 12 students have successfully demonstrated quantum entanglement...', 
    image: 'https://picsum.photos/seed/physics/400/300', 
    grade: '12', 
    subject: 'Science',
    content: `In a landmark achievement for Ituna secondary School's science department, our Grade 12 AP Physics students have successfully demonstrated quantum entanglement in a controlled lab environment. This complex phenomenon, once described by Einstein as "spooky action at a distance," involves particles being linked in such a way that their fates are intertwined, regardless of the distance separating them.
Under the guidance of Dr. Evelyn Reed, the students constructed a sophisticated apparatus to generate and observe entangled photon pairs. The experiment, which ran for three weeks, culminated in a successful test that confirmed the principles of quantum mechanics with a high degree of accuracy. This accomplishment not only deepens our students' understanding of modern physics but also places Ituna secondary at the forefront of secondary school science education.`
  },
  { 
    id: 2, 
    title: 'Annual Debate Championship Winners', 
    author: 'Mr. Samuel Chen', 
    date: 'Oct 24, 2023', 
    excerpt: 'The debate club clinched the top prize at the national championship this weekend...', 
    image: 'https://picsum.photos/seed/debate/400/300', 
    grade: 'all', 
    subject: 'Extracurricular',
    content: `The Ituna secondary School Debate Club has once again proven its mettle by clinching the top prize at the National High School Debate Championship held this past weekend. Facing stiff competition from over 50 schools, our team, consisting of senior students Jane Doe and John Smith, showcased exceptional rhetorical skills, critical thinking, and teamwork.
Their final debate on the topic of renewable energy policies was lauded by the judges as "a masterclass in persuasive argumentation." Mr. Samuel Chen, the club's advisor, expressed immense pride in the team's hard work and dedication throughout the year. The championship trophy will be displayed in the school's main hall.`
  },
  {
    id: 3,
    title: 'New School Library Wing Opens',
    author: 'Principal Thompson',
    date: 'Oct 20, 2023',
    excerpt: 'We are thrilled to announce the opening of the new library wing, featuring...',
    image: 'https://picsum.photos/seed/library/400/300',
    grade: 'all',
    subject: 'School News',
    content: 'We are thrilled to announce the grand opening of the new library wing. This state-of-the-art facility features collaborative study rooms, a digital media lab, and an expanded collection of books and online resources. The project, funded by our generous alumni and community partners, is designed to provide our students with a modern and inspiring learning environment. A dedication ceremony will be held on November 5th, and all students, parents, and community members are invited to attend.'
  },
  {
    id: 4,
    title: 'Understanding Shakespeare: A Deep Dive',
    author: 'Ms. Clara Oswald',
    date: 'Oct 18, 2023',
    excerpt: 'Grade 10 English classes embark on a semester-long project to bring Shakespeare to life...',
    image: '',
    grade: '10',
    subject: 'English',
    content: 'This semester, Grade 10 English students are embarking on an immersive project to explore the works of William Shakespeare. Moving beyond traditional analysis, students will be engaging in performance-based learning, creating modern adaptations of classic scenes, and exploring the historical context of the plays. Ms. Clara Oswald, head of the English department, believes this hands-on approach will foster a deeper appreciation for the Bard\'s timeless stories and complex characters.'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    title: 'Head of Science Department',
    subjects: ['AP Physics', 'Chemistry', 'Quantum Mechanics'],
    qualifications: ['Ph.D. in Physics, MIT', 'M.S. in Education'],
    bio: 'Dr. Reed has over 15 years of experience in both research and education. She is passionate about making complex scientific concepts accessible and exciting for students, encouraging them to explore the world through inquiry and experimentation.',
    email: 'e.reed@ituna.edu',
    phone: '+1 (555) 123-4567',
    image: 'https://picsum.photos/seed/teacher1/500/500',
  },
  {
    id: 2,
    name: 'Ms. Clara Oswald',
    title: 'English & Literature Teacher',
    subjects: ['English Literature', 'Creative Writing', 'Shakespearean Studies'],
    qualifications: ['M.A. in English Literature, Oxford University', 'Certified Teacher'],
    bio: 'An avid reader and writer, Ms. Oswald brings classic literature to life. Her classroom is a vibrant space for discussion, critical analysis, and fostering a lifelong love of stories.',
    email: 'c.oswald@ituna.edu',
    phone: '+1 (555) 234-5678',
    image: 'https://picsum.photos/seed/teacher2/500/500',
  },
  {
    id: 3,
    name: 'Mr. Ben Carter',
    title: 'Mathematics Teacher',
    subjects: ['Algebra', 'Calculus', 'Statistics'],
    qualifications: ['B.S. in Mathematics, Stanford University', '10+ years teaching experience'],
    bio: 'Mr. Carter believes that mathematics is a language that can be learned by everyone. He uses real-world examples and technology to make math engaging and relevant for his students.',
    email: 'b.carter@ituna.edu',
    phone: '+1 (555) 345-6789',
    image: 'https://picsum.photos/seed/teacher3/500/500',
  },
  {
    id: 4,
    name: 'Ms. Aisha Khan',
    title: 'History & Social Studies Teacher',
    subjects: ['World History', 'US History', 'Government & Civics'],
    qualifications: ['M.A. in History, University of Chicago'],
    bio: 'Ms. Khan encourages students to think like historians, analyzing primary sources and understanding diverse perspectives. Her lessons often involve debates and project-based learning to connect the past with the present.',
    email: 'a.khan@ituna.edu',
    phone: '+1 (555) 456-7890',
    image: 'https://picsum.photos/seed/teacher4/500/500',
  },
];

export const mockStudents: Student[] = [
  {
    id: 1,
    name: 'Mary Phiri',
    grade: 9,
    image: 'https://picsum.photos/seed/student1/500/500',
    bio: 'An aspiring scientist with a passion for biology and chemistry. Member of the school debate club and the science olympiad team.',
    email: 'mary.phiri@ituna.edu',
    phone: '+1 (555) 555-0101',
    overallGrade: 78,
    attendance: 92,
    recentActivity: 'Uploaded "History of Ituna" essay.',
    academicHistory: [
      {
        term: 'Fall 2023',
        records: [
          { subject: 'Mathematics', teacher: 'Mr. Ben Carter', grade: 75 },
          { subject: 'English', teacher: 'Ms. Clara Oswald', grade: 80 },
          { subject: 'Science', teacher: 'Dr. Evelyn Reed', grade: 85 },
          { subject: 'History', teacher: 'Ms. Aisha Khan', grade: 72 },
        ],
      },
      {
        term: 'Spring 2023',
        records: [
          { subject: 'Mathematics', teacher: 'Mr. Ben Carter', grade: 73 },
          { subject: 'English', teacher: 'Ms. Clara Oswald', grade: 78 },
          { subject: 'Science', teacher: 'Dr. Evelyn Reed', grade: 82 },
          { subject: 'History', teacher: 'Ms. Aisha Khan', grade: 68 },
        ],
      }
    ],
    attendanceHistory: [
        { date: '2023-10-26', status: 'Present' },
        { date: '2023-10-25', status: 'Present' },
        { date: '2023-10-24', status: 'Absent', notes: 'Doctor\'s appointment.' },
        { date: '2023-10-23', status: 'Late', notes: 'Arrived at 8:15 AM.' },
    ],
    progressReports: [
        { term: 'Fall 2023 Mid-Term', date: '2023-10-15', teacherComment: 'Mary is improving steadily in Mathematics, needs more focus in English essays.', downloadUrl: '#' },
        { term: 'Spring 2023 Final', date: '2023-06-01', teacherComment: 'A good semester for Mary, showing great potential in science.', downloadUrl: '#' },
    ],
    upcomingAssignments: [
      { assignmentId: 1, subject: 'English', title: 'The Great Gatsby - Chapter 3 Questions', dueDate: '2023-11-05' },
      { assignmentId: 2, subject: 'Mathematics', title: 'Algebra Worksheet 5.2', dueDate: '2023-11-08' },
      { assignmentId: 5, subject: 'History', title: 'WWII Essay Outline', dueDate: '2023-11-12' },
    ]
  },
  {
    id: 2,
    name: 'John Smith',
    grade: 11,
    image: 'https://picsum.photos/seed/student2/500/500',
    bio: 'Dedicated student with a focus on mathematics and computer science. Captain of the chess club and an active participant in coding competitions.',
    email: 'john.smith@ituna.edu',
    phone: '+1 (555) 555-0102',
    overallGrade: 91,
    attendance: 98,
    recentActivity: 'Completed "Calculus II" quiz.',
     academicHistory: [
      {
        term: 'Fall 2023',
        records: [
          { subject: 'Calculus', teacher: 'Mr. Ben Carter', grade: 92 },
          { subject: 'AP English', teacher: 'Ms. Clara Oswald', grade: 88 },
          { subject: 'Chemistry', teacher: 'Dr. Evelyn Reed', grade: 95 },
        ],
      }
    ],
    attendanceHistory: [
       { date: '2023-10-26', status: 'Present' },
       { date: '2023-10-25', status: 'Present' },
    ],
    progressReports: [
        { term: 'Fall 2023 Mid-Term', date: '2023-10-15', teacherComment: 'John is a top performer in all subjects. A pleasure to have in class.', downloadUrl: '#' },
    ],
    upcomingAssignments: [
      { assignmentId: 3, subject: 'Chemistry', title: 'Lab Report: Titration Experiment', dueDate: '2023-11-06' },
      { assignmentId: 4, subject: 'Calculus', title: 'Problem Set 7', dueDate: '2023-11-09' },
    ]
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    message: 'New resource "Algebra_Chapter_5.pdf" has been uploaded by Mr. Ben Carter.',
    timestamp: '2 hours ago',
    read: false,
    link: '#resources-section',
  },
  {
    id: 2,
    message: 'Principal Thompson published a new article: "New School Library Wing Opens".',
    timestamp: '1 day ago',
    read: false,
    link: '/#news/3',
  },
  {
    id: 3,
    message: 'Your assignment "The Great Gatsby Analysis" has been graded.',
    timestamp: '3 days ago',
    read: true,
  },
    {
    id: 4,
    message: 'Welcome to the new Ituna secondary School Portal!',
    timestamp: '1 week ago',
    read: true,
  },
];
