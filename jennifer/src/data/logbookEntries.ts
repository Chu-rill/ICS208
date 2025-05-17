export interface LogbookEntry {
  id: string;
  studentId: string;
  date: string;
  title: string;
  description: string;
  skills: string[];
  hours: number;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  comments?: Comment[];
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: 'academic-supervisor' | 'industry-supervisor' | 'coordinator';
  text: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'link';
  url: string;
  uploadedAt: string;
}

// Mock logbook entries
export const logbookEntries: LogbookEntry[] = [
  {
    id: 'entry1',
    studentId: 's1',
    date: '2023-07-03',
    title: 'Orientation and Introduction',
    description: 'Today was my first day at TechNigeria Ltd. I was introduced to the team and the company infrastructure. I was given a tour of the facility and briefed on the project I will be working on during my SIWES period.',
    skills: ['Communication', 'Orientation'],
    hours: 8,
    status: 'approved',
    comments: [
      {
        id: 'c1',
        userId: 'is1',
        userName: 'Engr. Abdul Yusuf',
        userRole: 'industry-supervisor',
        text: 'Good documentation of your first day. Make sure to follow up on the resources I recommended.',
        createdAt: '2023-07-04T09:30:00Z',
      },
      {
        id: 'c2',
        userId: 'as1',
        userName: 'Dr. Nneka Okoli',
        userRole: 'academic-supervisor',
        text: 'Well documented. Looking forward to your progress.',
        createdAt: '2023-07-05T14:20:00Z',
      }
    ],
    createdAt: '2023-07-03T17:00:00Z',
    updatedAt: '2023-07-03T17:00:00Z',
  },
  {
    id: 'entry2',
    studentId: 's1',
    date: '2023-07-04',
    title: 'Setup Development Environment',
    description: 'I set up my development environment with all the necessary tools and frameworks for web development. This includes Visual Studio Code, Git, Node.js, and React. I also got access to the company\'s code repository and was assigned my first task: fixing a bug in the user registration form.',
    skills: ['Development Tools', 'Git', 'Setup'],
    hours: 8,
    status: 'approved',
    attachments: [
      {
        id: 'a1',
        name: 'Environment Setup Checklist.pdf',
        type: 'document',
        url: '#',
        uploadedAt: '2023-07-04T16:45:00Z',
      }
    ],
    createdAt: '2023-07-04T17:30:00Z',
    updatedAt: '2023-07-04T17:30:00Z',
  },
  {
    id: 'entry3',
    studentId: 's1',
    date: '2023-07-05',
    title: 'Bug Fixing in User Registration Module',
    description: 'I worked on fixing the bug in the user registration form. The issue was with form validation and error handling. I learned about proper form validation techniques and how to handle edge cases. After fixing the bug, I created a pull request and it was reviewed by my supervisor.',
    skills: ['Debugging', 'Web Development', 'Form Validation'],
    hours: 8,
    status: 'approved',
    comments: [
      {
        id: 'c3',
        userId: 'is1',
        userName: 'Engr. Abdul Yusuf',
        userRole: 'industry-supervisor',
        text: 'Great job identifying and fixing the bug. Your solution was elegant and followed our coding standards.',
        createdAt: '2023-07-06T10:15:00Z',
      }
    ],
    attachments: [
      {
        id: 'a2',
        name: 'Bug Fix Screenshot.png',
        type: 'image',
        url: '#',
        uploadedAt: '2023-07-05T16:30:00Z',
      }
    ],
    createdAt: '2023-07-05T17:00:00Z',
    updatedAt: '2023-07-05T17:00:00Z',
  },
  {
    id: 'entry4',
    studentId: 's1',
    date: '2023-07-06',
    title: 'Database Design and SQL Queries',
    description: 'Today I worked with the database team to understand the database schema and learned how to write efficient SQL queries. I also learned about database normalization and how to optimize queries for better performance.',
    skills: ['SQL', 'Database Design', 'Query Optimization'],
    hours: 8,
    status: 'reviewed',
    comments: [
      {
        id: 'c4',
        userId: 'as1',
        userName: 'Dr. Nneka Okoli',
        userRole: 'academic-supervisor',
        text: 'This is excellent practical experience with databases. Make sure to document the query optimization techniques you learned for your final report.',
        createdAt: '2023-07-08T11:20:00Z',
      }
    ],
    createdAt: '2023-07-06T16:45:00Z',
    updatedAt: '2023-07-06T16:45:00Z',
  },
  {
    id: 'entry5',
    studentId: 's1',
    date: '2023-07-07',
    title: 'API Development and Integration',
    description: 'I worked on developing REST APIs for the user management module. I learned about RESTful design principles, API authentication, and how to document APIs using Swagger. I also integrated the API with the frontend application.',
    skills: ['API Development', 'REST', 'Swagger', 'Integration'],
    hours: 8,
    status: 'submitted',
    attachments: [
      {
        id: 'a3',
        name: 'API Documentation.pdf',
        type: 'document',
        url: '#',
        uploadedAt: '2023-07-07T16:30:00Z',
      }
    ],
    createdAt: '2023-07-07T17:00:00Z',
    updatedAt: '2023-07-07T17:00:00Z',
  },
  {
    id: 'entry6',
    studentId: 's2',
    date: '2023-07-03',
    title: 'Introduction to CAD Software',
    description: 'First day at Lagos Engineering Works. I was introduced to the CAD software used in the company and given a basic training on how to create and modify 3D models.',
    skills: ['CAD', '3D Modeling'],
    hours: 8,
    status: 'approved',
    comments: [
      {
        id: 'c5',
        userId: 'is2',
        userName: 'Engr. Blessing Okafor',
        userRole: 'industry-supervisor',
        text: 'Good start. Keep practicing the CAD tools we introduced today.',
        createdAt: '2023-07-04T08:45:00Z',
      }
    ],
    createdAt: '2023-07-03T16:30:00Z',
    updatedAt: '2023-07-03T16:30:00Z',
  },
  {
    id: 'entry7',
    studentId: 's2',
    date: '2023-07-04',
    title: 'Material Properties and Selection',
    description: 'Learned about different materials used in engineering applications and how to select appropriate materials based on their physical and mechanical properties.',
    skills: ['Material Science', 'Engineering Design'],
    hours: 8,
    status: 'approved',
    attachments: [
      {
        id: 'a4',
        name: 'Material Properties Chart.pdf',
        type: 'document',
        url: '#',
        uploadedAt: '2023-07-04T16:00:00Z',
      }
    ],
    createdAt: '2023-07-04T16:45:00Z',
    updatedAt: '2023-07-04T16:45:00Z',
  },
  {
    id: 'entry8',
    studentId: 's4',
    date: '2023-07-10',
    title: 'Database Management Introduction',
    description: 'Learned about database management systems at DataTech Solutions. I was introduced to SQL Server and practiced creating tables, relationships, and basic queries.',
    skills: ['Database Management', 'SQL'],
    hours: 8,
    status: 'submitted',
    createdAt: '2023-07-10T17:00:00Z',
    updatedAt: '2023-07-10T17:00:00Z',
  }
];