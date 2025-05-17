export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  targetRoles: string[];
  isImportant: boolean;
  publishDate: string;
  expiryDate?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export const announcements: Announcement[] = [
  {
    id: 'ann1',
    title: 'SIWES Program Registration Deadline Extended',
    content: `
Dear Students,

The registration deadline for the current SIWES program cycle has been extended to October 15th, 2023. 
This extension is to accommodate students who are still in the process of securing placement positions.

All students are reminded to complete their registrations through the SIWES portal before the new deadline.
Students who have already secured placements should ensure that their company details are properly updated in the system.

For any questions or assistance, please contact the SIWES Coordination Office.

Thank you.
    `,
    author: 'Dr. Tunde Bakare',
    authorRole: 'SIWES Coordinator',
    targetRoles: ['student', 'academic-supervisor', 'industry-supervisor'],
    isImportant: true,
    publishDate: '2023-09-20T09:00:00Z',
    expiryDate: '2023-10-15T23:59:59Z',
    attachments: [
      {
        name: 'Registration_Guidelines.pdf',
        url: '#',
        type: 'application/pdf'
      }
    ]
  },
  {
    id: 'ann2',
    title: 'Updated Logbook Submission Guidelines',
    content: `
Notice to All SIWES Students:

We have updated the guidelines for logbook submissions. Effective immediately, all logbook entries must:

1. Be submitted within 48 hours of the recorded activity
2. Include specific details of tasks performed and skills acquired
3. Attach relevant evidence where applicable (photos, documents, etc.)
4. Receive supervisor validation within one week

These changes are being implemented to improve the quality of industrial training documentation and ensure timely feedback from supervisors.

Please refer to the attached document for more detailed information on the new submission format.
    `,
    author: 'System Administrator',
    authorRole: 'Admin',
    targetRoles: ['student', 'academic-supervisor', 'industry-supervisor', 'coordinator'],
    isImportant: true,
    publishDate: '2023-09-15T14:30:00Z',
    attachments: [
      {
        name: 'New_Logbook_Guidelines.pdf',
        url: '#',
        type: 'application/pdf'
      }
    ]
  },
  {
    id: 'ann3',
    title: 'Academic Supervisor Training Workshop',
    content: `
Dear Academic Supervisors,

We are pleased to announce a training workshop on "Effective SIWES Supervision and Student Assessment" scheduled for September 30th, 2023.

The workshop will cover:
- Updated supervisor responsibilities
- Using the digital platform for student monitoring
- Assessment criteria and standardization
- Best practices for industrial visits

Participation is mandatory for all academic supervisors involved in the current SIWES program cycle.

Please register your attendance through the SIWES portal by September 25th.
    `,
    author: 'Dr. Tunde Bakare',
    authorRole: 'SIWES Coordinator',
    targetRoles: ['academic-supervisor', 'coordinator', 'admin'],
    isImportant: false,
    publishDate: '2023-09-10T11:45:00Z',
    attachments: [
      {
        name: 'Workshop_Agenda.pdf',
        url: '#',
        type: 'application/pdf'
      }
    ]
  },
  {
    id: 'ann4',
    title: 'New Organizations Joining SIWES Program',
    content: `
Announcement:

We are delighted to welcome the following organizations to our SIWES program:

1. NigeriaTech Solutions Limited - Information Technology
2. Atlas Engineering Services - Mechanical & Electrical Engineering
3. BioGenics Laboratories - Biochemistry & Microbiology
4. LagosMetro Urban Planning - Architecture & Urban Planning

Students interested in placements with these organizations can now select them during the application process. Each organization has provided details of available positions and required qualifications on their profile pages.

We encourage students to explore these new opportunities and submit their applications early, as positions are limited.
    `,
    author: 'Dr. Tunde Bakare',
    authorRole: 'SIWES Coordinator',
    targetRoles: ['student', 'academic-supervisor', 'coordinator'],
    isImportant: false,
    publishDate: '2023-09-05T15:00:00Z'
  },
  {
    id: 'ann5',
    title: 'System Maintenance Notice',
    content: `
Important Notice:

The SIWES Management System will be undergoing scheduled maintenance on Sunday, September 24th, 2023, from 00:00 to 06:00 (WAT).

During this period, the system will be inaccessible. The maintenance is essential for implementing security updates and performance improvements.

We apologize for any inconvenience this may cause and appreciate your understanding.

Normal system operations will resume at 06:00 WAT on September 24th.
    `,
    author: 'System Administrator',
    authorRole: 'Admin',
    targetRoles: ['student', 'academic-supervisor', 'industry-supervisor', 'coordinator', 'admin'],
    isImportant: true,
    publishDate: '2023-09-01T13:15:00Z',
    expiryDate: '2023-09-24T06:00:00Z'
  }
];