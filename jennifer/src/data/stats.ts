export interface DepartmentStats {
  department: string;
  totalStudents: number;
  placedStudents: number;
  completedStudents: number;
  averageScore: number;
}

export interface MonthlyPlacement {
  month: string;
  placements: number;
}

export interface SupervisorActivity {
  supervisorId: string;
  supervisorName: string;
  department: string;
  reviewedEntries: number;
  visitations: number;
  assessmentsCompleted: number;
  averageResponseTime: number; // in hours
}

export interface IndustryParticipation {
  industry: string;
  organizations: number;
  placements: number;
  activeStudents: number;
}

export interface ProgramStatistics {
  academicYear: string;
  totalStudents: number;
  totalSupervisors: number;
  totalOrganizations: number;
  placementRate: number;
  completionRate: number;
  averageAssessmentScore: number;
}

// Mock department statistics
export const departmentStats: DepartmentStats[] = [
  {
    department: 'Computer Science',
    totalStudents: 45,
    placedStudents: 40,
    completedStudents: 12,
    averageScore: 78.5,
  },
  {
    department: 'Mechanical Engineering',
    totalStudents: 38,
    placedStudents: 36,
    completedStudents: 10,
    averageScore: 82.3,
  },
  {
    department: 'Electrical Engineering',
    totalStudents: 30,
    placedStudents: 28,
    completedStudents: 8,
    averageScore: 75.9,
  },
  {
    department: 'Civil Engineering',
    totalStudents: 28,
    placedStudents: 25,
    completedStudents: 7,
    averageScore: 80.1,
  },
  {
    department: 'Biochemistry',
    totalStudents: 22,
    placedStudents: 18,
    completedStudents: 5,
    averageScore: 76.8,
  },
];

// Mock monthly placement statistics
export const monthlyPlacements: MonthlyPlacement[] = [
  { month: 'Jan', placements: 12 },
  { month: 'Feb', placements: 15 },
  { month: 'Mar', placements: 20 },
  { month: 'Apr', placements: 25 },
  { month: 'May', placements: 32 },
  { month: 'Jun', placements: 45 },
  { month: 'Jul', placements: 38 },
  { month: 'Aug', placements: 30 },
  { month: 'Sep', placements: 28 },
  { month: 'Oct', placements: 22 },
  { month: 'Nov', placements: 18 },
  { month: 'Dec', placements: 10 },
];

// Mock supervisor activity
export const supervisorActivities: SupervisorActivity[] = [
  {
    supervisorId: 'as1',
    supervisorName: 'Dr. Nneka Okoli',
    department: 'Computer Science',
    reviewedEntries: 85,
    visitations: 12,
    assessmentsCompleted: 15,
    averageResponseTime: 8.2,
  },
  {
    supervisorId: 'as2',
    supervisorName: 'Prof. Olumide Adebayo',
    department: 'Mechanical Engineering',
    reviewedEntries: 72,
    visitations: 10,
    assessmentsCompleted: 12,
    averageResponseTime: 10.5,
  },
  {
    supervisorId: 'is1',
    supervisorName: 'Engr. Abdul Yusuf',
    department: 'Industry',
    reviewedEntries: 45,
    visitations: 0,
    assessmentsCompleted: 8,
    averageResponseTime: 12.3,
  },
  {
    supervisorId: 'is2',
    supervisorName: 'Engr. Blessing Okafor',
    department: 'Industry',
    reviewedEntries: 38,
    visitations: 0,
    assessmentsCompleted: 6,
    averageResponseTime: 9.6,
  },
];

// Mock industry participation
export const industryParticipation: IndustryParticipation[] = [
  {
    industry: 'Information Technology',
    organizations: 12,
    placements: 45,
    activeStudents: 40,
  },
  {
    industry: 'Engineering',
    organizations: 8,
    placements: 35,
    activeStudents: 32,
  },
  {
    industry: 'Banking & Finance',
    organizations: 6,
    placements: 20,
    activeStudents: 18,
  },
  {
    industry: 'Oil & Gas',
    organizations: 5,
    placements: 15,
    activeStudents: 14,
  },
  {
    industry: 'Healthcare',
    organizations: 4,
    placements: 12,
    activeStudents: 10,
  },
  {
    industry: 'Manufacturing',
    organizations: 7,
    placements: 18,
    activeStudents: 15,
  },
];

// Mock program statistics (past 5 years)
export const programStatistics: ProgramStatistics[] = [
  {
    academicYear: '2022/2023',
    totalStudents: 170,
    totalSupervisors: 22,
    totalOrganizations: 42,
    placementRate: 0.88,
    completionRate: 0.83,
    averageAssessmentScore: 78.6,
  },
  {
    academicYear: '2021/2022',
    totalStudents: 155,
    totalSupervisors: 20,
    totalOrganizations: 38,
    placementRate: 0.85,
    completionRate: 0.80,
    averageAssessmentScore: 76.9,
  },
  {
    academicYear: '2020/2021',
    totalStudents: 142,
    totalSupervisors: 18,
    totalOrganizations: 34,
    placementRate: 0.82,
    completionRate: 0.78,
    averageAssessmentScore: 75.2,
  },
  {
    academicYear: '2019/2020',
    totalStudents: 130,
    totalSupervisors: 15,
    totalOrganizations: 30,
    placementRate: 0.80,
    completionRate: 0.75,
    averageAssessmentScore: 74.5,
  },
  {
    academicYear: '2018/2019',
    totalStudents: 120,
    totalSupervisors: 12,
    totalOrganizations: 25,
    placementRate: 0.76,
    completionRate: 0.72,
    averageAssessmentScore: 73.8,
  },
];