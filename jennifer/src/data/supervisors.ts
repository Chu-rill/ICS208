import { format, sub } from 'date-fns';
import { 
  SupervisorStudent, 
  Assessment, 
  VisitRecord 
} from '../types/supervisor';

// Generate students assigned to a supervisor
export const generateSupervisorStudents = (supervisorId: string, count: number = 6): SupervisorStudent[] => {
  const students: SupervisorStudent[] = [];
  
  for (let i = 0; i < count; i++) {
    // Alternating between active and completed for demo
    const status = i < 4 ? 'active' : 'completed';
    const progress = status === 'active' ? 30 + (i * 15) : 100;
    const pendingReviews = status === 'active' ? Math.floor(Math.random() * 3) : 0;
    
    // Generate lastActivity date, more recent for active students
    const daysAgo = status === 'active' ? i : 10 + i;
    const lastActivity = format(sub(new Date(), { days: daysAgo }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'');
    
    // Academic or industry supervisor specific fields
    const isAcademic = supervisorId === '5' || supervisorId === '6';
    
    const student: SupervisorStudent = {
      id: `student-${supervisorId}-${i}`,
      studentId: (i + 1).toString(),
      firstName: i === 0 ? 'Adebayo' : i === 1 ? 'Chioma' : i === 2 ? 'Emeka' : `Student${i}`,
      lastName: i === 0 ? 'Johnson' : i === 1 ? 'Okafor' : i === 2 ? 'Nwosu' : `LastName${i}`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`,
      institution: i % 3 === 0 ? 'University of Lagos' : i % 3 === 1 ? 'University of Nigeria' : 'Ahmadu Bello University',
      department: i % 4 === 0 ? 'Computer Science' : i % 4 === 1 ? 'Electrical Engineering' : i % 4 === 2 ? 'Mechanical Engineering' : 'Chemical Engineering',
      email: `student${i + 1}@example.com`,
      phoneNumber: `+234 80${i} 234 567${i}`,
      companyName: i % 3 === 0 ? 'TechNigeria Ltd' : i % 3 === 1 ? 'Nigerian Engineering Solutions' : 'Global Oil Nigeria',
      position: i % 4 === 0 ? 'Software Developer Intern' : i % 4 === 1 ? 'Electrical Engineer Intern' : i % 4 === 2 ? 'Mechanical Engineer Intern' : 'Chemical Engineer Intern',
      startDate: '2023-01-15',
      endDate: '2023-07-15',
      lastActivity,
      progress,
      pendingReviews,
      status
    };
    
    students.push(student);
  }
  
  return students;
};

// Generate assessments for a student
export const generateAssessments = (supervisorId: string, studentId: string): Assessment[] => {
  const assessments: Assessment[] = [];
  
  // Generate weekly assessments
  for (let i = 0; i < 10; i++) {
    const weekDate = format(sub(new Date(), { weeks: i }), 'yyyy-MM-dd');
    
    // Only create assessments up to current progress
    if (i > 6) continue;
    
    const status = i === 0 ? 'draft' : 'finalized';
    
    const assessment: Assessment = {
      id: `assessment-${supervisorId}-${studentId}-week-${i}`,
      studentId,
      supervisorId,
      type: 'weekly',
      date: weekDate,
      categories: [
        {
          name: 'Technical Skills',
          description: 'Ability to apply technical knowledge effectively',
          rating: 3 + Math.floor(Math.random() * 2),
          maxRating: 5,
          feedback: 'Shows good understanding of technical concepts'
        },
        {
          name: 'Communication',
          description: 'Clarity of communication and reporting',
          rating: 3 + Math.floor(Math.random() * 2),
          maxRating: 5,
          feedback: 'Communicates clearly in reports and discussions'
        },
        {
          name: 'Initiative',
          description: 'Taking initiative and problem-solving approach',
          rating: 3 + Math.floor(Math.random() * 2),
          maxRating: 5,
          feedback: 'Shows good initiative in tackling new challenges'
        },
        {
          name: 'Teamwork',
          description: 'Ability to work effectively in a team',
          rating: 3 + Math.floor(Math.random() * 2),
          maxRating: 5,
          feedback: 'Works well with team members'
        }
      ],
      overallRating: 3.5 + (Math.random() * 1.5),
      comment: getRandomAssessmentComment(status),
      status,
      createdAt: format(sub(new Date(), { weeks: i, days: 1 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      updatedAt: format(sub(new Date(), { weeks: i }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
    };
    
    assessments.push(assessment);
  }
  
  // Add a monthly assessment
  const monthlyAssessment: Assessment = {
    id: `assessment-${supervisorId}-${studentId}-month-1`,
    studentId,
    supervisorId,
    type: 'monthly',
    date: format(sub(new Date(), { months: 1 }), 'yyyy-MM-dd'),
    categories: [
      {
        name: 'Overall Performance',
        description: 'General performance and competence',
        rating: 4,
        maxRating: 5,
        feedback: 'Demonstrates consistent performance across tasks'
      },
      {
        name: 'Technical Growth',
        description: 'Improvement in technical abilities',
        rating: 4,
        maxRating: 5,
        feedback: 'Has shown good improvement in technical skills'
      },
      {
        name: 'Professional Development',
        description: 'Growth in professional conduct and attitude',
        rating: 5,
        maxRating: 5,
        feedback: 'Exemplary professional attitude and conduct'
      },
      {
        name: 'Project Contributions',
        description: 'Value added to assigned projects',
        rating: 4,
        maxRating: 5,
        feedback: 'Makes valuable contributions to projects'
      },
      {
        name: 'Learning Adaptability',
        description: 'Ability to learn and adapt to new situations',
        rating: 4,
        maxRating: 5,
        feedback: 'Shows good ability to learn new technologies and adapt'
      }
    ],
    overallRating: 4.2,
    comment: 'This student has shown remarkable progress over the past month. Their technical skills have improved significantly, and they have become more confident in taking on new challenges. They are now able to work more independently while maintaining good communication with the team. I recommend focusing on advanced technical skills in the coming month.',
    status: 'finalized',
    createdAt: format(sub(new Date(), { months: 1, days: 3 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
    updatedAt: format(sub(new Date(), { months: 1 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
  };
  
  assessments.push(monthlyAssessment);
  
  return assessments;
};

// Generate visit records for a supervisor and student
export const generateVisitRecords = (supervisorId: string, studentId: string): VisitRecord[] => {
  const visits: VisitRecord[] = [];
  
  // Past visits (completed)
  for (let i = 0; i < 2; i++) {
    const scheduledDate = format(sub(new Date(), { months: i + 1 }), 'yyyy-MM-dd');
    const actualDate = format(sub(new Date(), { months: i + 1 }), 'yyyy-MM-dd');
    
    const visit: VisitRecord = {
      id: `visit-${supervisorId}-${studentId}-${i}`,
      studentId,
      supervisorId,
      scheduledDate,
      actualDate,
      status: 'completed',
      purpose: i === 0 ? 'Introductory visit and workplace assessment' : 'Progress evaluation and feedback session',
      notes: getRandomVisitNotes(),
      followUpActions: [
        'Review student logbook entries for the past month',
        'Discuss progress with industry supervisor',
        'Schedule next assessment meeting'
      ],
      attachments: [
        {
          id: `visit-attachment-${i}`,
          name: `Visit_Report_${scheduledDate}.pdf`,
          url: '#'
        }
      ]
    };
    
    visits.push(visit);
  }
  
  // Upcoming scheduled visit
  const upcomingVisit: VisitRecord = {
    id: `visit-${supervisorId}-${studentId}-upcoming`,
    studentId,
    supervisorId,
    scheduledDate: format(sub(new Date(), { days: -14 }), 'yyyy-MM-dd'),
    status: 'scheduled',
    purpose: 'Mid-term assessment and project review',
    notes: 'Will review current project contributions and provide feedback on areas for improvement.',
    followUpActions: [
      'Prepare assessment report',
      'Update student development plan',
      'Coordinate with industry supervisor'
    ]
  };
  
  visits.push(upcomingVisit);
  
  // Cancelled visit
  const cancelledVisit: VisitRecord = {
    id: `visit-${supervisorId}-${studentId}-cancelled`,
    studentId,
    supervisorId,
    scheduledDate: format(sub(new Date(), { weeks: 3 }), 'yyyy-MM-dd'),
    status: 'cancelled',
    purpose: 'Weekly check-in and progress review',
    notes: 'Cancelled due to unexpected supervisor meeting. Rescheduled for next week.'
  };
  
  visits.push(cancelledVisit);
  
  return visits;
};

// Helper functions for generating random data
function getRandomAssessmentComment(status: string): string {
  if (status === 'draft') {
    return 'Initial assessment draft. Need to discuss with student before finalizing.';
  } else {
    const comments = [
      'The student has shown good progress this week. Demonstrated initiative in solving problems and collaborated well with team members.',
      'Student is meeting expectations. Technical skills are improving, but communication needs more attention. Will focus on this area next week.',
      'Excellent work this week. Particularly impressed with the quality of documentation and attention to detail in project tasks.',
      'Satisfactory performance overall. Student completes assigned tasks but needs to improve time management and prioritization skills.',
      'Good technical progress. Student is quickly adapting to the work environment and learning new skills effectively.'
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  }
}

function getRandomVisitNotes(): string {
  const notes = [
    'The student has a suitable workspace and necessary equipment. The company environment is conducive to learning. Supervisor feedback is positive regarding student's attitude and initial contributions.',
    'Met with both student and industry supervisor. Reviewed current project assignments and workplace integration. Student is adapting well to the professional environment.',
    'Conducted facility tour and workplace assessment. Confirmed appropriate safety measures and supervision arrangements. Discussed learning objectives with both student and industry supervisor.',
    'Observed student during regular work activities. Noted good team integration and communication skills. Industry supervisor reports satisfaction with progress so far.'
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}