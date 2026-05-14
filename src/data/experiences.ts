import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    title: 'Software Engineer Intern',
    company: 'PT Lautan Luas Tbk',
    duration: 'January 2026 – Now',
    location: 'Jakarta, Indonesia',
    responsibilities: [
      'Developed web applications for both front-end and back-end using Node.js, with React for the front-end and NestJS for the back-end with MongoDB as database',
      'Designed and developed robust back-end APIs using PHP Laravel, including handling PostgreSQL database integration and implementing RESTful services',
      'Maintained and fixed bugs in corporate and distribution applications at PT Lautan Luas Tbk',
      'Created and configured Jenkinsfiles, Dockerfiles, Docker Compose setups, and Kubernetes deployment files for application deployment on AWS servers',
      'Collaborated effectively within a team using GitLab for version control, including managing branches, handling merge requests, and maintaining code quality',
    ],
    technologies: ['Node.js', 'React', 'NestJS', 'MongoDB', 'PHP', 'Laravel', 'PostgreSQL', 'Docker', 'Jenkins', 'Kubernetes', 'AWS', 'GitLab'],
  },
  {
    title: 'Teacher Intern',
    company: 'SMKN 40 Jakarta',
    duration: 'July – December 2025',
    location: 'Jakarta, Indonesia',
    responsibilities: [
      'Instructed Grade 11 students in the Software Engineering program of Database and Web Programming',
      'Developed assessment materials, including assignments, quizzes, mid-term exams, and final exams for the Database specialization course',
      'Graded and evaluated the academic performance of students in the Software Engineering program for the Database specialization course',
    ],
    technologies: ['Database', 'Web Programming'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Ombudsman Republik Indonesia',
    duration: 'March – May 2025',
    location: 'Jakarta, Indonesia',
    responsibilities: [
      'Analyzed and evaluated the business processes of the SIMPeL4 and Helpdesk web applications for Ombudsman Republic Indonesia',
      'Designed and developed the front-end for the user dashboard and revised the admin dashboard user interface for web applications Helpdesk Ombudsman Republik Indonesia',
      'Designed and developed the back-end infrastructure, including the database, user authentication, and API endpoints for web applications Helpdesk Ombudsman Republik Indonesia',
    ],
    technologies: ['React.js', 'Express.js', 'PostgreSQL', 'JavaScript'],
  },
]
