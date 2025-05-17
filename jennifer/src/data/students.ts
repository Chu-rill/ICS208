import { LogbookEntry, Placement, StudentProgress } from '../types/student';
import { format, sub } from 'date-fns';

// Generate demo logbook entries for a student
export const generateLogbookEntries = (studentId: string, count: number = 20): LogbookEntry[] => {
  const entries: LogbookEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    const date = format(sub(new Date(), { days: i }), 'yyyy-MM-dd');
    const status = i % 5 === 0 ? 'draft' : 
                  i % 4 === 0 ? 'submitted' : 
                  i % 3 === 0 ? 'reviewed' : 
                  i % 2 === 0 ? 'rejected' : 'approved';
    
    const entry: LogbookEntry = {
      id: `entry-${studentId}-${i}`,
      studentId,
      date,
      title: `Day ${count - i}: ${getRandomActivity(i)}`,
      description: getRandomDescription(i),
      skills: getRandomSkills(),
      hours: 6 + (i % 3),
      status,
      attachments: i % 3 === 0 ? [
        {
          id: `attachment-${i}-1`,
          name: `document-${i}.pdf`,
          type: 'application/pdf',
          url: '#',
          size: 1024 * (i + 1),
          uploadedAt: date
        }
      ] : undefined,
      comments: status !== 'draft' && status !== 'submitted' ? [
        {
          id: `comment-${i}-1`,
          userId: '5', // Academic supervisor
          userName: 'Dr. Samuel Adeyemi',
          userRole: 'academic_supervisor',
          userAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
          content: getRandomComment(status),
          timestamp: format(sub(new Date(), { days: i, hours: 2 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
        }
      ] : undefined,
      createdAt: format(sub(new Date(), { days: i, hours: 4 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      updatedAt: format(sub(new Date(), { days: i, hours: 2 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
    };
    
    entries.push(entry);
  }
  
  return entries;
};

// Generate placement details for a student
export const generatePlacement = (studentId: string): Placement => {
  return {
    id: `placement-${studentId}`,
    studentId,
    companyId: 'comp-1',
    companyName: studentId === '1' ? 'TechNigeria Ltd' : 
                 studentId === '2' ? 'Nigerian Engineering Solutions' :
                 studentId === '3' ? 'Global Oil Nigeria' : 'Datamax Systems',
    companyLogo: `https://ui-avatars.com/api/?name=${studentId === '1' ? 'Tech+Nigeria' : 
                                                    studentId === '2' ? 'Nigerian+Engineering' :
                                                    studentId === '3' ? 'Global+Oil' : 'Datamax'}&background=random`,
    companyAddress: '12 Tech Avenue, Lagos, Nigeria',
    department: studentId === '1' ? 'Software Development' :
                studentId === '2' ? 'Electrical Systems' :
                studentId === '3' ? 'Mechanical Operations' : 'Chemical Processing',
    position: studentId === '1' ? 'Junior Developer' :
              studentId === '2' ? 'Electrical Engineering Intern' :
              studentId === '3' ? 'Mechanical Engineering Intern' : 'Process Engineering Intern',
    supervisorId: studentId === '1' || studentId === '2' ? '7' : '8',
    supervisorName: studentId === '1' || studentId === '2' ? 'Oluwaseun Adeleke' : 'Amina Mohammed',
    startDate: '2023-01-15',
    endDate: '2023-07-15',
    status: 'active'
  };
};

// Generate progress data for a student
export const generateStudentProgress = (studentId: string): StudentProgress => {
  return {
    totalDays: 180,
    completedDays: studentId === '1' ? 102 :
                   studentId === '2' ? 89 :
                   studentId === '3' ? 95 : 75,
    pendingApprovals: studentId === '1' ? 2 :
                      studentId === '2' ? 3 :
                      studentId === '3' ? 1 : 4,
    totalEntries: studentId === '1' ? 105 :
                  studentId === '2' ? 92 :
                  studentId === '3' ? 98 : 79,
    skills: {
      'Programming': studentId === '1' ? 42 : 12,
      'Documentation': studentId === '1' ? 30 : 25,
      'Problem Solving': studentId === '1' ? 38 : 20,
      'Teamwork': studentId === '1' ? 25 : 30,
      'Communication': studentId === '1' ? 28 : 35,
      'Technical Writing': studentId === '1' ? 15 : 10,
      'Data Analysis': studentId === '1' ? 20 : 15,
      'Design': studentId === '1' ? 18 : 8
    },
    weeklyHours: generateWeeklyHours(),
    assessmentScores: [
      { category: 'Technical Skills', score: studentId === '1' ? 4.2 : 3.8 },
      { category: 'Communication', score: studentId === '1' ? 3.8 : 4.1 },
      { category: 'Problem Solving', score: studentId === '1' ? 4.5 : 3.5 },
      { category: 'Teamwork', score: studentId === '1' ? 4.0 : 4.3 },
      { category: 'Initiative', score: studentId === '1' ? 4.3 : 3.9 },
      { category: 'Professionalism', score: studentId === '1' ? 4.7 : 4.5 }
    ]
  };
};

// Helper functions for generating random data
function getRandomActivity(index: number): string {
  const activities = [
    'Database Design and Implementation',
    'Frontend Development',
    'API Integration',
    'Testing and Debugging',
    'Team Meeting and Planning',
    'Documentation and Reporting',
    'UI/UX Design',
    'Code Review',
    'Training Session',
    'Project Presentation',
    'Client Meeting',
    'System Maintenance',
    'Security Implementation',
    'Performance Optimization',
    'Research and Analysis',
    'Deployment and Monitoring',
    'Learning New Technologies',
    'Quality Assurance',
    'Data Analysis',
    'Technical Support'
  ];
  
  return activities[index % activities.length];
}

function getRandomDescription(index: number): string {
  const descriptions = [
    'Worked on designing and implementing a database schema for the customer management system. Created tables, defined relationships, and set up constraints.',
    'Developed frontend components using React for the user dashboard. Implemented responsive design and UI interactions.',
    'Integrated the application with third-party payment APIs. Tested different payment flows and handled error cases.',
    'Spent the day testing various modules and fixing bugs reported by the QA team. Improved error handling in several components.',
    'Participated in team planning meeting to discuss upcoming sprint goals. Reviewed project timelines and resource allocation.',
    'Created documentation for API endpoints and system architecture. Prepared weekly progress report for supervisor review.',
    'Designed user interface mockups for the mobile application. Gathered feedback from team members and made revisions.',
    'Participated in code review sessions for recent pull requests. Provided feedback and suggestions for improvement.',
    'Attended training session on cloud deployment and containerization. Learned about Docker and Kubernetes basics.',
    'Presented progress on assigned module to the team and received feedback. Discussed challenges and solutions.',
    'Met with clients to gather requirements for new feature implementation. Took notes and clarified technical constraints.',
    'Performed routine system maintenance tasks including backups, updates, and performance checks.',
    'Implemented security measures including input validation, authentication improvements, and data encryption.',
    'Analyzed and optimized database queries that were causing performance issues. Improved page load times significantly.',
    'Researched new technologies that could benefit current project. Prepared summary of findings for team consideration.',
    'Assisted in deploying the latest application version to staging environment. Monitored system for any issues.',
    'Spent time learning new frontend framework features and best practices through tutorials and documentation.',
    'Conducted quality assurance tests on recent feature implementations. Documented issues and created tickets.',
    'Analyzed user data to identify patterns and behaviors. Created visualizations to present findings to the team.',
    'Provided technical support to internal users. Troubleshot issues and documented solutions for knowledge base.'
  ];
  
  return descriptions[index % descriptions.length];
}

function getRandomSkills(): string[] {
  const allSkills = [
    'Programming', 'Database Design', 'API Development', 
    'Frontend Development', 'Documentation', 'Testing', 
    'Problem Solving', 'Teamwork', 'Communication', 
    'Project Management', 'Technical Writing', 'Data Analysis', 
    'UI/UX Design', 'Security Implementation', 'DevOps'
  ];
  
  // Pick 3-5 random skills
  const count = 3 + Math.floor(Math.random() * 3);
  const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomComment(status: string): string {
  if (status === 'approved') {
    const approvalComments = [
      'Great work! Your documentation is thorough and clear.',
      'Excellent job. I appreciate the detailed explanation of your activities.',
      'This is a well-structured entry with good reflections on what you learned.',
      'Approved. Good job documenting your technical contributions.',
      'Well done! Your progress is evident in this entry.'
    ];
    return approvalComments[Math.floor(Math.random() * approvalComments.length)];
  } else if (status === 'rejected') {
    const rejectionComments = [
      'Please provide more details about the specific tasks you completed.',
      'Your entry lacks sufficient technical details. Please revise and resubmit.',
      'The hours logged seem inconsistent with the work described. Please clarify.',
      'Please include information about challenges faced and how you resolved them.',
      'Entry needs more reflection on skills developed and lessons learned.'
    ];
    return rejectionComments[Math.floor(Math.random() * rejectionComments.length)];
  } else {
    const reviewComments = [
      'I've reviewed your entry. Please add more details about the technologies used.',
      'Good start, but please elaborate on your specific contributions to the team.',
      'Consider expanding on how this work relates to your academic learning objectives.',
      'Interesting work. Could you clarify how this fits into the larger project?',
      'Thanks for your submission. Please specify which skills you developed through this task.'
    ];
    return reviewComments[Math.floor(Math.random() * reviewComments.length)];
  }
}

function generateWeeklyHours(): { week: string; hours: number }[] {
  const result = [];
  for (let i = 0; i < 12; i++) {
    const weekDate = format(sub(new Date(), { weeks: 11 - i }), 'MMM d');
    result.push({
      week: weekDate,
      hours: 30 + Math.floor(Math.random() * 15)
    });
  }
  return result;
}