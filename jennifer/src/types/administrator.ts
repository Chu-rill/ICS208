export interface SystemSettings {
  id: string;
  name: string;
  value: string | number | boolean;
  description: string;
  category: 'general' | 'security' | 'notifications' | 'reports' | 'appearance';
  type: 'string' | 'number' | 'boolean' | 'select' | 'date';
  options?: string[];
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  address: string;
  city: string;
  state: string;
  website?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  activeStudents: number;
  historicalStudents: number;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number;
  durationUnit: 'days' | 'weeks' | 'months';
  departments: string[];
  requirementsCriteria: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  audiences: ('all' | 'students' | 'supervisors' | 'coordinators' | 'administrators')[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  expiresAt?: string;
  attachment?: { name: string; url: string };
}