export interface SupervisorStudent {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  institution: string;
  department: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  lastActivity: string;
  progress: number;
  pendingReviews: number;
  status: 'active' | 'inactive' | 'completed';
}

export interface Assessment {
  id: string;
  studentId: string;
  supervisorId: string;
  type: 'weekly' | 'monthly' | 'final';
  date: string;
  categories: AssessmentCategory[];
  overallRating: number;
  comment: string;
  status: 'draft' | 'submitted' | 'finalized';
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentCategory {
  name: string;
  description: string;
  rating: number;
  maxRating: number;
  feedback?: string;
}

export interface VisitRecord {
  id: string;
  studentId: string;
  supervisorId: string;
  scheduledDate: string;
  actualDate?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  purpose: string;
  notes?: string;
  followUpActions?: string[];
  attachments?: { id: string; name: string; url: string }[];
}