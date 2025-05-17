export interface DepartmentStats {
  id: string;
  name: string;
  totalStudents: number;
  activeStudents: number;
  completedStudents: number;
  academicSupervisors: number;
  industrySupervisors: number;
  companies: number;
  avgStudentRating: number;
  avgSupervisorEngagement: number;
}

export interface SupervisorAssignment {
  id: string;
  academicSupervisorId: string;
  academicSupervisorName: string;
  industrySupervisorId: string;
  industrySupervisorName: string;
  studentId: string;
  studentName: string;
  company: string;
  department: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed';
}

export interface InstitutionKpi {
  name: string;
  value: number;
  previousValue: number;
  change: number;
  target: number;
  unit: string;
}

export interface SupervisionActivity {
  supervisorId: string;
  supervisorName: string;
  supervisorType: 'academic' | 'industry';
  department: string;
  totalStudents: number;
  lastActivity: string;
  reviewsCompleted: number;
  visitsCompleted: number;
  averageResponseTime: number;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'student' | 'supervisor' | 'department' | 'institution';
  createdAt: string;
  createdBy: string;
  fileUrl: string;
  fileSize: number;
}