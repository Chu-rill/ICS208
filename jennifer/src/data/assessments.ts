export interface Assessment {
  id: string;
  studentId: string;
  assessorId: string;
  assessorRole: 'academic-supervisor' | 'industry-supervisor';
  date: string;
  type: 'midterm' | 'final';
  categories: AssessmentCategory[];
  totalScore: number;
  maximumScore: number;
  comments: string;
  recommendations?: string;
  status: 'draft' | 'submitted' | 'approved';
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentCategory {
  name: string;
  criteria: AssessmentCriteria[];
  weightage: number;
}

export interface AssessmentCriteria {
  name: string;
  score: number;
  maximumScore: number;
  comments?: string;
}

// Mock assessments
export const assessments: Assessment[] = [
  {
    id: 'a1',
    studentId: 's1',
    assessorId: 'is1',
    assessorRole: 'industry-supervisor',
    date: '2023-08-15',
    type: 'midterm',
    categories: [
      {
        name: 'Technical Skills',
        criteria: [
          {
            name: 'Knowledge of programming languages',
            score: 18,
            maximumScore: 20,
            comments: 'Shows excellent understanding of JavaScript and TypeScript',
          },
          {
            name: 'Problem-solving ability',
            score: 16,
            maximumScore: 20,
            comments: 'Good approach to problems but can improve on optimization',
          },
          {
            name: 'Tool proficiency',
            score: 15,
            maximumScore: 20,
            comments: 'Still learning some of the advanced features of our tools',
          }
        ],
        weightage: 0.4,
      },
      {
        name: 'Professional Behavior',
        criteria: [
          {
            name: 'Punctuality',
            score: 20,
            maximumScore: 20,
            comments: 'Always on time, often early',
          },
          {
            name: 'Communication skills',
            score: 18,
            maximumScore: 20,
            comments: 'Communicates clearly but sometimes hesitant to ask questions',
          },
          {
            name: 'Team collaboration',
            score: 17,
            maximumScore: 20,
            comments: 'Works well with the team, contributes in meetings',
          }
        ],
        weightage: 0.3,
      },
      {
        name: 'Learning and Adaptability',
        criteria: [
          {
            name: 'Speed of learning',
            score: 19,
            maximumScore: 20,
            comments: 'Picks up new concepts quickly',
          },
          {
            name: 'Application of theory to practice',
            score: 16,
            maximumScore: 20,
            comments: 'Good theoretical knowledge, still improving practical application',
          },
          {
            name: 'Initiative and curiosity',
            score: 18,
            maximumScore: 20,
            comments: 'Shows great initiative in learning new technologies',
          }
        ],
        weightage: 0.3,
      }
    ],
    totalScore: 78,
    maximumScore: 100,
    comments: 'Chidimma is showing good progress in her industrial training. She has quickly adapted to the work environment and is making valuable contributions to the team.',
    recommendations: 'Should focus more on advanced features of the tools we use and be more proactive in asking questions when stuck.',
    status: 'approved',
    createdAt: '2023-08-15T10:00:00Z',
    updatedAt: '2023-08-16T14:30:00Z',
  },
  {
    id: 'a2',
    studentId: 's2',
    assessorId: 'is2',
    assessorRole: 'industry-supervisor',
    date: '2023-08-20',
    type: 'midterm',
    categories: [
      {
        name: 'Technical Skills',
        criteria: [
          {
            name: 'Knowledge of CAD software',
            score: 19,
            maximumScore: 20,
            comments: 'Excellent understanding of CAD principles',
          },
          {
            name: 'Engineering design principles',
            score: 17,
            maximumScore: 20,
            comments: 'Good grasp of fundamental principles',
          },
          {
            name: 'Technical documentation',
            score: 16,
            maximumScore: 20,
            comments: 'Documentation is thorough but can be more concise',
          }
        ],
        weightage: 0.4,
      },
      {
        name: 'Professional Behavior',
        criteria: [
          {
            name: 'Punctuality',
            score: 18,
            maximumScore: 20,
            comments: 'Generally on time with occasional delays',
          },
          {
            name: 'Communication skills',
            score: 19,
            maximumScore: 20,
            comments: 'Excellent communication, clear and articulate',
          },
          {
            name: 'Team collaboration',
            score: 20,
            maximumScore: 20,
            comments: 'Outstanding team player, helps others',
          }
        ],
        weightage: 0.3,
      },
      {
        name: 'Learning and Adaptability',
        criteria: [
          {
            name: 'Speed of learning',
            score: 17,
            maximumScore: 20,
            comments: 'Good learning curve, adapts well',
          },
          {
            name: 'Application of theory to practice',
            score: 18,
            maximumScore: 20,
            comments: 'Effectively applies classroom knowledge to work tasks',
          },
          {
            name: 'Initiative and curiosity',
            score: 19,
            maximumScore: 20,
            comments: 'Shows great initiative, asks thoughtful questions',
          }
        ],
        weightage: 0.3,
      }
    ],
    totalScore: 82,
    maximumScore: 100,
    comments: 'Oluwaseun has shown exceptional performance during his training period. His technical skills in CAD design are particularly impressive, and he has integrated well with the engineering team.',
    recommendations: 'Should continue to focus on technical documentation skills to match his excellent practical abilities.',
    status: 'approved',
    createdAt: '2023-08-20T09:30:00Z',
    updatedAt: '2023-08-21T11:15:00Z',
  },
  {
    id: 'a3',
    studentId: 's4',
    assessorId: 'as1',
    assessorRole: 'academic-supervisor',
    date: '2023-08-25',
    type: 'midterm',
    categories: [
      {
        name: 'Technical Skills',
        criteria: [
          {
            name: 'Database management skills',
            score: 14,
            maximumScore: 20,
            comments: 'Basic understanding, needs more practice',
          },
          {
            name: 'Problem-solving ability',
            score: 13,
            maximumScore: 20,
            comments: 'Approaches problems methodically but slowly',
          },
          {
            name: 'Technical knowledge application',
            score: 12,
            maximumScore: 20,
            comments: 'Struggles to apply theoretical knowledge practically',
          }
        ],
        weightage: 0.4,
      },
      {
        name: 'Professional Behavior',
        criteria: [
          {
            name: 'Punctuality',
            score: 16,
            maximumScore: 20,
            comments: 'Generally punctual with a few exceptions',
          },
          {
            name: 'Communication skills',
            score: 15,
            maximumScore: 20,
            comments: 'Communication is clear but sometimes hesitant',
          },
          {
            name: 'Team collaboration',
            score: 13,
            maximumScore: 20,
            comments: 'Works with the team but could be more proactive',
          }
        ],
        weightage: 0.3,
      },
      {
        name: 'Learning and Adaptability',
        criteria: [
          {
            name: 'Speed of learning',
            score: 12,
            maximumScore: 20,
            comments: 'Learning rate is slower than expected',
          },
          {
            name: 'Application of theory to practice',
            score: 13,
            maximumScore: 20,
            comments: 'Needs more practice to bridge theory and application',
          },
          {
            name: 'Initiative and curiosity',
            score: 14,
            maximumScore: 20,
            comments: 'Shows interest but could ask more questions',
          }
        ],
        weightage: 0.3,
      }
    ],
    totalScore: 65,
    maximumScore: 100,
    comments: 'Emeka is making satisfactory progress but needs to improve in several areas. His technical skills need strengthening and he should be more proactive in the workplace.',
    recommendations: 'Should focus on practical application of database concepts and seek additional resources to improve technical skills.',
    status: 'approved',
    createdAt: '2023-08-25T14:00:00Z',
    updatedAt: '2023-08-26T10:45:00Z',
  }
];