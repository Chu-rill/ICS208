export type UserRole = 'student' | 'academic-supervisor' | 'industry-supervisor' | 'coordinator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // Only used for demo authentication
  avatar?: string;
  department?: string;
  institution?: string;
  company?: string;
  position?: string;
  matricNumber?: string;
  phone?: string;
  dateRegistered: string;
  lastLogin?: string;
}

export interface Student extends User {
  role: 'student';
  matricNumber: string;
  level: string;
  department: string;
  program: string;
  supervisor?: string;
  industrySupervisor?: string;
  placementStatus: 'seeking' | 'placed' | 'completed';
  company?: string;
  startDate?: string;
  endDate?: string;
  totalDaysLogged: number;
  assessmentScore?: number;
}

export interface Supervisor extends User {
  role: 'academic-supervisor' | 'industry-supervisor';
  department?: string;
  company?: string;
  position: string;
  assignedStudents: string[];
  lastVisitDate?: string;
  totalVisits: number;
}

export interface Coordinator extends User {
  role: 'coordinator';
  department: string;
  totalStudents: number;
  totalSupervisors: number;
  totalOrganizations: number;
}

export interface Admin extends User {
  role: 'admin';
  accessLevel: 'full' | 'limited';
  lastAction?: string;
}