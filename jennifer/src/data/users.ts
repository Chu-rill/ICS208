import { User } from '../types/auth';

export const users: User[] = [
  // Students
  {
    id: '1',
    email: 'student1@example.com',
    firstName: 'Adebayo',
    lastName: 'Johnson',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    department: 'Computer Science',
    institution: 'University of Lagos',
    phoneNumber: '+234 801 234 5678',
    lastLogin: '2023-04-15T08:30:00Z'
  },
  {
    id: '2',
    email: 'student2@example.com',
    firstName: 'Chioma',
    lastName: 'Okafor',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    department: 'Electrical Engineering',
    institution: 'University of Nigeria',
    phoneNumber: '+234 802 345 6789',
    lastLogin: '2023-04-14T15:45:00Z'
  },
  {
    id: '3',
    email: 'student3@example.com',
    firstName: 'Emeka',
    lastName: 'Nwosu',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    department: 'Mechanical Engineering',
    institution: 'Ahmadu Bello University',
    phoneNumber: '+234 803 456 7890',
    lastLogin: '2023-04-13T12:15:00Z'
  },
  {
    id: '4',
    email: 'student4@example.com',
    firstName: 'Fatima',
    lastName: 'Ibrahim',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    department: 'Chemical Engineering',
    institution: 'University of Ibadan',
    phoneNumber: '+234 804 567 8901',
    lastLogin: '2023-04-16T09:20:00Z'
  },
  
  // Academic Supervisors
  {
    id: '5',
    email: 'acad_supervisor1@example.com',
    firstName: 'Dr. Samuel',
    lastName: 'Adeyemi',
    role: 'academic_supervisor',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    department: 'Computer Science',
    institution: 'University of Lagos',
    position: 'Senior Lecturer',
    phoneNumber: '+234 805 678 9012',
    lastLogin: '2023-04-15T10:30:00Z'
  },
  {
    id: '6',
    email: 'acad_supervisor2@example.com',
    firstName: 'Dr. Ngozi',
    lastName: 'Eze',
    role: 'academic_supervisor',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    department: 'Electrical Engineering',
    institution: 'University of Nigeria',
    position: 'Associate Professor',
    phoneNumber: '+234 806 789 0123',
    lastLogin: '2023-04-14T11:45:00Z'
  },
  
  // Industry Supervisors
  {
    id: '7',
    email: 'ind_supervisor1@example.com',
    firstName: 'Oluwaseun',
    lastName: 'Adeleke',
    role: 'industry_supervisor',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    company: 'TechNigeria Ltd',
    position: 'Senior Software Engineer',
    phoneNumber: '+234 807 890 1234',
    lastLogin: '2023-04-15T14:20:00Z'
  },
  {
    id: '8',
    email: 'ind_supervisor2@example.com',
    firstName: 'Amina',
    lastName: 'Mohammed',
    role: 'industry_supervisor',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    company: 'Nigerian Engineering Solutions',
    position: 'Project Manager',
    phoneNumber: '+234 808 901 2345',
    lastLogin: '2023-04-13T16:10:00Z'
  },
  
  // Coordinator
  {
    id: '9',
    email: 'coordinator@example.com',
    firstName: 'Prof. Chukwudi',
    lastName: 'Okonkwo',
    role: 'coordinator',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    department: 'SIWES Coordination Office',
    institution: 'University of Lagos',
    position: 'SIWES Coordinator',
    phoneNumber: '+234 809 012 3456',
    lastLogin: '2023-04-16T08:45:00Z'
  },
  
  // Administrator
  {
    id: '10',
    email: 'admin@example.com',
    firstName: 'Aisha',
    lastName: 'Bello',
    role: 'administrator',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    department: 'Administration',
    institution: 'Federal SIWES Management Board',
    position: 'System Administrator',
    phoneNumber: '+234 810 123 4567',
    lastLogin: '2023-04-16T07:30:00Z'
  }
];

// Demo credentials for different roles
export const demoCredentials = [
  {
    role: 'Student',
    email: 'student1@example.com',
    password: 'password123',
    name: 'Adebayo Johnson'
  },
  {
    role: 'Academic Supervisor',
    email: 'acad_supervisor1@example.com',
    password: 'password123',
    name: 'Dr. Samuel Adeyemi'
  },
  {
    role: 'Industry Supervisor',
    email: 'ind_supervisor1@example.com',
    password: 'password123',
    name: 'Oluwaseun Adeleke'
  },
  {
    role: 'Coordinator',
    email: 'coordinator@example.com',
    password: 'password123',
    name: 'Prof. Chukwudi Okonkwo'
  },
  {
    role: 'Administrator',
    email: 'admin@example.com',
    password: 'password123',
    name: 'Aisha Bello'
  }
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};