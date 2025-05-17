export interface LogbookEntry {
  id: string;
  studentId: string;
  date: string;
  title: string;
  description: string;
  skills: string[];
  hours: number;
  attachments?: Attachment[];
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export interface Placement {
  id: string;
  studentId: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  companyAddress: string;
  department: string;
  position: string;
  supervisorId: string;
  supervisorName: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'terminated';
}

export interface StudentProgress {
  totalDays: number;
  completedDays: number;
  pendingApprovals: number;
  totalEntries: number;
  skills: { [key: string]: number };
  weeklyHours: { week: string; hours: number }[];
  assessmentScores: { category: string; score: number }[];
}