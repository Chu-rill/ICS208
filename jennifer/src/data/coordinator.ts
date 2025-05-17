import { format, sub } from 'date-fns';
import { 
  DepartmentStats, 
  SupervisorAssignment, 
  InstitutionKpi,
  SupervisionActivity,
  Report
} from '../types/coordinator';

// Generate stats for departments
export const generateDepartmentStats = (): DepartmentStats[] => {
  const departments = [
    { id: 'dept-1', name: 'Computer Science' },
    { id: 'dept-2', name: 'Electrical Engineering' },
    { id: 'dept-3', name: 'Mechanical Engineering' },
    { id: 'dept-4', name: 'Chemical Engineering' },
    { id: 'dept-5', name: 'Civil Engineering' }
  ];
  
  return departments.map((dept, index) => ({
    ...dept,
    totalStudents: 40 + (index * 5),
    activeStudents: 30 + (index * 3),
    completedStudents: 10 + index,
    academicSupervisors: 3 + Math.floor(index / 2),
    industrySupervisors: 5 + Math.floor(index / 2),
    companies: 6 + Math.floor(index / 2),
    avgStudentRating: 3.5 + (Math.random() * 1.2),
    avgSupervisorEngagement: 3.2 + (Math.random() * 1.5)
  }));
};

// Generate supervisor assignments
export const generateSupervisorAssignments = (): SupervisorAssignment[] => {
  const assignments: SupervisorAssignment[] = [];
  
  // Generate some assignments
  for (let i = 0; i < 15; i++) {
    const academicSupervisorId = i % 2 === 0 ? '5' : '6';
    const academicSupervisorName = i % 2 === 0 ? 'Dr. Samuel Adeyemi' : 'Dr. Ngozi Eze';
    
    const industrySupervisorId = i % 3 === 0 ? '7' : '8';
    const industrySupervisorName = i % 3 === 0 ? 'Oluwaseun Adeleke' : 'Amina Mohammed';
    
    const status = i < 10 ? 'active' : i < 13 ? 'pending' : 'completed';
    
    const assignment: SupervisorAssignment = {
      id: `assignment-${i}`,
      academicSupervisorId,
      academicSupervisorName,
      industrySupervisorId,
      industrySupervisorName,
      studentId: `${(i % 4) + 1}`,
      studentName: i % 4 === 0 ? 'Adebayo Johnson' : 
                  i % 4 === 1 ? 'Chioma Okafor' : 
                  i % 4 === 2 ? 'Emeka Nwosu' : 'Fatima Ibrahim',
      company: i % 3 === 0 ? 'TechNigeria Ltd' : 
               i % 3 === 1 ? 'Nigerian Engineering Solutions' : 'Global Oil Nigeria',
      department: i % 4 === 0 ? 'Computer Science' : 
                 i % 4 === 1 ? 'Electrical Engineering' : 
                 i % 4 === 2 ? 'Mechanical Engineering' : 'Chemical Engineering',
      startDate: '2023-01-15',
      endDate: '2023-07-15',
      status
    };
    
    assignments.push(assignment);
  }
  
  return assignments;
};

// Generate institution KPIs
export const generateInstitutionKpis = (): InstitutionKpi[] => {
  return [
    {
      name: 'Student Placement Rate',
      value: 92.5,
      previousValue: 89.2,
      change: 3.3,
      target: 95,
      unit: '%'
    },
    {
      name: 'Supervisor-Student Ratio',
      value: 1.8,
      previousValue: 2.1,
      change: -0.3,
      target: 1.5,
      unit: 'ratio'
    },
    {
      name: 'Average Supervision Visits',
      value: 2.7,
      previousValue: 2.3,
      change: 0.4,
      target: 3,
      unit: 'visits'
    },
    {
      name: 'Logbook Completion Rate',
      value: 87.3,
      previousValue: 82.1,
      change: 5.2,
      target: 90,
      unit: '%'
    },
    {
      name: 'Employer Satisfaction',
      value: 4.2,
      previousValue: 4.0,
      change: 0.2,
      target: 4.5,
      unit: 'out of 5'
    },
    {
      name: 'Student Satisfaction',
      value: 3.9,
      previousValue: 3.7,
      change: 0.2,
      target: 4.2,
      unit: 'out of 5'
    }
  ];
};

// Generate supervision activities
export const generateSupervisionActivities = (): SupervisionActivity[] => {
  const activities: SupervisionActivity[] = [];
  
  // Academic supervisors
  activities.push({
    supervisorId: '5',
    supervisorName: 'Dr. Samuel Adeyemi',
    supervisorType: 'academic',
    department: 'Computer Science',
    totalStudents: 8,
    lastActivity: format(sub(new Date(), { days: 2, hours: 4 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    reviewsCompleted: 37,
    visitsCompleted: 12,
    averageResponseTime: 1.2 // days
  });
  
  activities.push({
    supervisorId: '6',
    supervisorName: 'Dr. Ngozi Eze',
    supervisorType: 'academic',
    department: 'Electrical Engineering',
    totalStudents: 7,
    lastActivity: format(sub(new Date(), { days: 1, hours: 6 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    reviewsCompleted: 32,
    visitsCompleted: 10,
    averageResponseTime: 0.9 // days
  });
  
  // Industry supervisors
  activities.push({
    supervisorId: '7',
    supervisorName: 'Oluwaseun Adeleke',
    supervisorType: 'industry',
    department: 'TechNigeria Ltd',
    totalStudents: 5,
    lastActivity: format(sub(new Date(), { days: 3, hours: 2 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    reviewsCompleted: 28,
    visitsCompleted: 0, // Industry supervisors don't make visits
    averageResponseTime: 1.5 // days
  });
  
  activities.push({
    supervisorId: '8',
    supervisorName: 'Amina Mohammed',
    supervisorType: 'industry',
    department: 'Nigerian Engineering Solutions',
    totalStudents: 6,
    lastActivity: format(sub(new Date(), { days: 4, hours: 7 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    reviewsCompleted: 25,
    visitsCompleted: 0, // Industry supervisors don't make visits
    averageResponseTime: 2.1 // days
  });
  
  return activities;
};

// Generate reports
export const generateReports = (): Report[] => {
  const reports: Report[] = [];
  
  // Report types and descriptions
  const reportTypes = [
    { name: 'Student Progress Summary', type: 'student', description: 'Comprehensive overview of student progress across all placements' },
    { name: 'Supervisor Engagement Analysis', type: 'supervisor', description: 'Analysis of supervisor engagement metrics and performance' },
    { name: 'Department Performance Report', type: 'department', description: 'Departmental performance comparison and analysis' },
    { name: 'Institutional SIWES Overview', type: 'institution', description: 'Institution-wide SIWES program performance and statistics' },
    { name: 'Quarterly Student Assessment', type: 'student', description: 'Quarterly assessment of student performance and development' },
    { name: 'Supervisor Workload Distribution', type: 'supervisor', description: 'Analysis of supervisor workload and assignment distribution' },
    { name: 'Departmental Placement Analysis', type: 'department', description: 'Analysis of student placements by department and industry' },
    { name: 'Annual SIWES Program Evaluation', type: 'institution', description: 'Annual review and evaluation of SIWES program effectiveness' }
  ];
  
  // Generate reports with dates
  for (let i = 0; i < reportTypes.length; i++) {
    const daysAgo = i * 7 + Math.floor(Math.random() * 5);
    const createdAt = format(sub(new Date(), { days: daysAgo }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'');
    
    reports.push({
      id: `report-${i}`,
      name: reportTypes[i].name,
      description: reportTypes[i].description,
      type: reportTypes[i].type as 'student' | 'supervisor' | 'department' | 'institution',
      createdAt,
      createdBy: 'Prof. Chukwudi Okonkwo',
      fileUrl: '#',
      fileSize: 1024 * (i + 1) // Random file size in KB
    });
  }
  
  return reports;
};