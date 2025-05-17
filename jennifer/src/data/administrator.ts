import { 
  SystemSettings, 
  Organization, 
  Program, 
  Announcement 
} from '../types/administrator';
import { format, sub, add } from 'date-fns';

// Generate system settings
export const generateSystemSettings = (): SystemSettings[] => {
  return [
    // General settings
    {
      id: 'setting-1',
      name: 'System Name',
      value: 'SIWES Management System',
      description: 'Official name of the system displayed in headers and reports',
      category: 'general',
      type: 'string'
    },
    {
      id: 'setting-2',
      name: 'Academic Year',
      value: '2023/2024',
      description: 'Current academic year for SIWES placements',
      category: 'general',
      type: 'string'
    },
    {
      id: 'setting-3',
      name: 'Default Placement Duration',
      value: 6,
      description: 'Default placement duration in months',
      category: 'general',
      type: 'number'
    },
    
    // Security settings
    {
      id: 'setting-4',
      name: 'Session Timeout',
      value: 30,
      description: 'User session timeout in minutes',
      category: 'security',
      type: 'number'
    },
    {
      id: 'setting-5',
      name: 'Require Strong Passwords',
      value: true,
      description: 'Enforce strong password policy for all users',
      category: 'security',
      type: 'boolean'
    },
    {
      id: 'setting-6',
      name: 'Two-Factor Authentication',
      value: false,
      description: 'Enable two-factor authentication for admin accounts',
      category: 'security',
      type: 'boolean'
    },
    
    // Notification settings
    {
      id: 'setting-7',
      name: 'Email Notifications',
      value: true,
      description: 'Send email notifications for important events',
      category: 'notifications',
      type: 'boolean'
    },
    {
      id: 'setting-8',
      name: 'SMS Notifications',
      value: false,
      description: 'Send SMS notifications for critical alerts',
      category: 'notifications',
      type: 'boolean'
    },
    {
      id: 'setting-9',
      name: 'Reminder Frequency',
      value: 'weekly',
      description: 'Frequency of reminder notifications',
      category: 'notifications',
      type: 'select',
      options: ['daily', 'weekly', 'monthly']
    },
    
    // Report settings
    {
      id: 'setting-10',
      name: 'Default Report Format',
      value: 'pdf',
      description: 'Default format for generated reports',
      category: 'reports',
      type: 'select',
      options: ['pdf', 'excel', 'csv']
    },
    {
      id: 'setting-11',
      name: 'Include Institution Logo',
      value: true,
      description: 'Include institution logo in reports',
      category: 'reports',
      type: 'boolean'
    },
    {
      id: 'setting-12',
      name: 'Automatic Report Generation',
      value: 'monthly',
      description: 'Schedule for automatic report generation',
      category: 'reports',
      type: 'select',
      options: ['weekly', 'monthly', 'quarterly']
    },
    
    // Appearance settings
    {
      id: 'setting-13',
      name: 'Primary Color',
      value: '#3b68f0',
      description: 'Primary color for system interface',
      category: 'appearance',
      type: 'string'
    },
    {
      id: 'setting-14',
      name: 'Secondary Color',
      value: '#2aa18e',
      description: 'Secondary color for system interface',
      category: 'appearance',
      type: 'string'
    },
    {
      id: 'setting-15',
      name: 'Dark Mode',
      value: false,
      description: 'Enable dark mode for system interface',
      category: 'appearance',
      type: 'boolean'
    }
  ];
};

// Generate organizations/companies
export const generateOrganizations = (): Organization[] => {
  return [
    {
      id: 'org-1',
      name: 'TechNigeria Ltd',
      logo: 'https://ui-avatars.com/api/?name=Tech+Nigeria&background=0D8ABC&color=fff',
      industry: 'Information Technology',
      address: '12 Tech Avenue, Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos',
      website: 'www.technigeria.com',
      contactPerson: 'Oluwaseun Adeleke',
      contactEmail: 'oluwaseun@technigeria.com',
      contactPhone: '+234 807 890 1234',
      activeStudents: 12,
      historicalStudents: 45,
      status: 'active',
      joinedDate: '2019-05-10'
    },
    {
      id: 'org-2',
      name: 'Nigerian Engineering Solutions',
      logo: 'https://ui-avatars.com/api/?name=Nigerian+Engineering&background=5A2C81&color=fff',
      industry: 'Engineering Services',
      address: '25 Industrial Way, Ikeja',
      city: 'Lagos',
      state: 'Lagos',
      website: 'www.nigerianengineering.com',
      contactPerson: 'Amina Mohammed',
      contactEmail: 'amina@nigerianengineering.com',
      contactPhone: '+234 808 901 2345',
      activeStudents: 9,
      historicalStudents: 37,
      status: 'active',
      joinedDate: '2020-03-15'
    },
    {
      id: 'org-3',
      name: 'Global Oil Nigeria',
      logo: 'https://ui-avatars.com/api/?name=Global+Oil&background=D93025&color=fff',
      industry: 'Oil & Gas',
      address: '5 Petroleum Drive, Port Harcourt',
      city: 'Port Harcourt',
      state: 'Rivers',
      website: 'www.globaloilng.com',
      contactPerson: 'Ibrahim Musa',
      contactEmail: 'ibrahim@globaloilng.com',
      contactPhone: '+234 809 012 3456',
      activeStudents: 14,
      historicalStudents: 51,
      status: 'active',
      joinedDate: '2018-09-20'
    },
    {
      id: 'org-4',
      name: 'Datamax Systems',
      logo: 'https://ui-avatars.com/api/?name=Datamax+Systems&background=1A73E8&color=fff',
      industry: 'Information Technology',
      address: '18 Innovation Street, Wuse Zone 2',
      city: 'Abuja',
      state: 'FCT',
      website: 'www.datamaxsystems.com',
      contactPerson: 'Chidi Okonkwo',
      contactEmail: 'chidi@datamaxsystems.com',
      contactPhone: '+234 810 123 4567',
      activeStudents: 7,
      historicalStudents: 28,
      status: 'active',
      joinedDate: '2021-01-12'
    },
    {
      id: 'org-5',
      name: 'ConstructNigeria Ltd',
      logo: 'https://ui-avatars.com/api/?name=Construct+Nigeria&background=F29900&color=fff',
      industry: 'Construction',
      address: '34 Builder's Lane, Yaba',
      city: 'Lagos',
      state: 'Lagos',
      website: 'www.constructnigeria.com',
      contactPerson: 'Funke Adebayo',
      contactEmail: 'funke@constructnigeria.com',
      contactPhone: '+234 811 234 5678',
      activeStudents: 5,
      historicalStudents: 19,
      status: 'active',
      joinedDate: '2020-08-05'
    },
    {
      id: 'org-6',
      name: 'HealthPlus Nigeria',
      logo: 'https://ui-avatars.com/api/?name=Health+Plus&background=34A853&color=fff',
      industry: 'Healthcare',
      address: '7 Medical Drive, Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      website: 'www.healthplusnigeria.com',
      contactPerson: 'Dr. Yewande Oluseyi',
      contactEmail: 'yewande@healthplusnigeria.com',
      contactPhone: '+234 812 345 6789',
      activeStudents: 8,
      historicalStudents: 32,
      status: 'active',
      joinedDate: '2019-11-18'
    },
    {
      id: 'org-7',
      name: 'AgroTech Innovations',
      logo: 'https://ui-avatars.com/api/?name=Agro+Tech&background=0F9D58&color=fff',
      industry: 'Agriculture',
      address: '22 Farm Road, Kaduna South',
      city: 'Kaduna',
      state: 'Kaduna',
      website: 'www.agrotechinnovations.com',
      contactPerson: 'Mohammed Bello',
      contactEmail: 'mohammed@agrotechinnovations.com',
      contactPhone: '+234 813 456 7890',
      activeStudents: 6,
      historicalStudents: 24,
      status: 'active',
      joinedDate: '2020-05-23'
    },
    {
      id: 'org-8',
      name: 'Digital Finance Solutions',
      logo: 'https://ui-avatars.com/api/?name=Digital+Finance&background=5F6368&color=fff',
      industry: 'Finance',
      address: '15 Banking Avenue, Marina',
      city: 'Lagos',
      state: 'Lagos',
      website: 'www.digitalfinanceng.com',
      contactPerson: 'Tunde Bakare',
      contactEmail: 'tunde@digitalfinanceng.com',
      contactPhone: '+234 814 567 8901',
      activeStudents: 10,
      historicalStudents: 41,
      status: 'active',
      joinedDate: '2019-07-11'
    }
  ];
};

// Generate SIWES programs
export const generatePrograms = (): Program[] => {
  return [
    {
      id: 'prog-1',
      name: 'Standard IT/CS Industrial Training',
      description: 'Industrial training program for Computer Science and IT students focusing on software development, systems analysis, and IT infrastructure management.',
      duration: 6,
      durationUnit: 'months',
      departments: ['Computer Science', 'Information Technology', 'Software Engineering'],
      requirementsCriteria: [
        'Minimum 200 level standing',
        'Completion of basic programming courses',
        'Minimum CGPA of 2.5'
      ],
      status: 'active',
      createdAt: '2021-05-10T09:00:00Z',
      updatedAt: '2023-01-15T14:30:00Z'
    },
    {
      id: 'prog-2',
      name: 'Engineering Industrial Experience',
      description: 'Comprehensive industrial training for engineering students across various disciplines, focusing on practical engineering applications and project management.',
      duration: 6,
      durationUnit: 'months',
      departments: ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering'],
      requirementsCriteria: [
        'Minimum 300 level standing',
        'Completion of core engineering courses',
        'Passed all practical laboratory courses',
        'Minimum CGPA of 2.0'
      ],
      status: 'active',
      createdAt: '2021-06-12T10:15:00Z',
      updatedAt: '2023-02-20T11:45:00Z'
    },
    {
      id: 'prog-3',
      name: 'Business Administration Attachment',
      description: 'Industrial attachment program for business administration and management students, focusing on practical business operations, management, and administration.',
      duration: 3,
      durationUnit: 'months',
      departments: ['Business Administration', 'Management', 'Accounting', 'Economics'],
      requirementsCriteria: [
        'Minimum 300 level standing',
        'Completion of basic management courses',
        'Minimum CGPA of 2.3'
      ],
      status: 'active',
      createdAt: '2022-01-05T08:30:00Z',
      updatedAt: '2023-03-10T09:20:00Z'
    },
    {
      id: 'prog-4',
      name: 'Healthcare Practical Experience',
      description: 'Clinical and practical experience program for healthcare students, focusing on patient care, clinical procedures, and healthcare management.',
      duration: 4,
      durationUnit: 'months',
      departments: ['Medicine', 'Nursing', 'Medical Laboratory Science', 'Pharmacy'],
      requirementsCriteria: [
        'Minimum 400 level standing',
        'Completion of basic clinical courses',
        'Passed all practical courses',
        'Health and vaccination certification'
      ],
      status: 'active',
      createdAt: '2022-03-18T11:45:00Z',
      updatedAt: '2023-04-05T13:10:00Z'
    },
    {
      id: 'prog-5',
      name: 'Agricultural Science Field Experience',
      description: 'Field experience program for agricultural science students, focusing on modern farming techniques, agricultural research, and agribusiness management.',
      duration: 5,
      durationUnit: 'months',
      departments: ['Agricultural Science', 'Agronomy', 'Agricultural Economics', 'Animal Science'],
      requirementsCriteria: [
        'Minimum 300 level standing',
        'Completion of core agricultural courses',
        'Minimum CGPA of 2.0'
      ],
      status: 'active',
      createdAt: '2022-05-22T10:00:00Z',
      updatedAt: '2023-02-28T15:45:00Z'
    }
  ];
};

// Generate announcements
export const generateAnnouncements = (): Announcement[] => {
  const currentDate = new Date();
  
  return [
    {
      id: 'ann-1',
      title: 'New SIWES Guidelines for 2023/2024',
      content: 'We are pleased to announce the release of updated SIWES guidelines for the 2023/2024 academic year. All students, supervisors, and coordinators are advised to familiarize themselves with these new guidelines, which include changes to reporting requirements, assessment criteria, and supervision protocols. The updated document can be accessed through the Resources section of the portal.',
      author: 'Aisha Bello',
      authorId: '10',
      audiences: ['all'],
      priority: 'high',
      createdAt: format(sub(currentDate, { days: 5 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      expiresAt: format(add(currentDate, { months: 1 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      attachment: {
        name: 'SIWES_Guidelines_2023_2024.pdf',
        url: '#'
      }
    },
    {
      id: 'ann-2',
      title: 'Supervisor Training Workshop',
      content: 'A mandatory training workshop for all SIWES supervisors will be held on May 15th, 2023, from 10:00 AM to 2:00 PM. The workshop will cover the new digital logbook system, assessment protocols, and effective supervision techniques. Both academic and industry supervisors are required to attend. The workshop will be held at the University Conference Center and will also be available via Zoom for remote participation.',
      author: 'Prof. Chukwudi Okonkwo',
      authorId: '9',
      audiences: ['supervisors', 'coordinators', 'administrators'],
      priority: 'urgent',
      createdAt: format(sub(currentDate, { days: 3 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      expiresAt: format(add(currentDate, { days: 12 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
    },
    {
      id: 'ann-3',
      title: 'Logbook Submission Deadline',
      content: 'This is a reminder that all SIWES logbook entries for the month of April must be submitted by May 5th, 2023. Students are required to ensure all entries are complete, including activities, skills developed, and reflections. Entries submitted after the deadline may not be considered for assessment. If you encounter any technical issues with the submission process, please contact the IT support team immediately.',
      author: 'Dr. Samuel Adeyemi',
      authorId: '5',
      audiences: ['students', 'supervisors'],
      priority: 'medium',
      createdAt: format(sub(currentDate, { days: 2 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      expiresAt: format(add(currentDate, { days: 7 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
    },
    {
      id: 'ann-4',
      title: 'New Industry Partners',
      content: 'We are pleased to welcome three new industry partners to our SIWES program: DataTech Solutions, Nigeria Renewable Energy, and Global Finance Consulting. These companies will be offering placements in various fields including software development, renewable energy engineering, and financial analysis. Students interested in these placements should update their profiles and express interest through the placement portal by April 30th, 2023.',
      author: 'Aisha Bello',
      authorId: '10',
      audiences: ['all'],
      priority: 'low',
      createdAt: format(sub(currentDate, { days: 1 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      expiresAt: format(add(currentDate, { days: 14 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
    },
    {
      id: 'ann-5',
      title: 'System Maintenance Notice',
      content: 'The SIWES Management System will undergo scheduled maintenance on April 25th, 2023, from 10:00 PM to 2:00 AM. During this time, the system will be inaccessible. Please ensure any urgent submissions or reviews are completed before the maintenance window. We apologize for any inconvenience this may cause and appreciate your understanding as we work to improve system performance and security.',
      author: 'Aisha Bello',
      authorId: '10',
      audiences: ['all'],
      priority: 'medium',
      createdAt: format(sub(currentDate, { hours: 12 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\''),
      expiresAt: format(add(currentDate, { days: 3 }), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
    }
  ];
};