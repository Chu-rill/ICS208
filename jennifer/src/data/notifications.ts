import { User } from '../types/user';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export const createUserNotifications = (user: User): Notification[] => {
  const notifications: Notification[] = [];
  
  if (user.role === 'student') {
    notifications.push(
      {
        id: `notif-student-1-${user.id}`,
        userId: user.id,
        title: 'Logbook Entry Approved',
        message: 'Your logbook entry for July 5th has been approved by your supervisor.',
        type: 'success',
        isRead: false,
        link: '/student/logbook',
        createdAt: '2023-09-24T10:15:00Z',
      },
      {
        id: `notif-student-2-${user.id}`,
        userId: user.id,
        title: 'New Comment on Logbook',
        message: 'Your industry supervisor has left a comment on your latest logbook entry.',
        type: 'info',
        isRead: true,
        link: '/student/logbook',
        createdAt: '2023-09-23T15:30:00Z',
      },
      {
        id: `notif-student-3-${user.id}`,
        userId: user.id,
        title: 'Upcoming Assessment',
        message: 'Your final assessment is scheduled for next week. Please ensure all logbook entries are up to date.',
        type: 'warning',
        isRead: false,
        link: '/student/assessments',
        createdAt: '2023-09-22T09:45:00Z',
      },
      {
        id: `notif-student-4-${user.id}`,
        userId: user.id,
        title: 'New Announcement',
        message: 'Important announcement regarding SIWES completion certificates has been posted.',
        type: 'info',
        isRead: false,
        link: '/announcements',
        createdAt: '2023-09-21T14:20:00Z',
      }
    );
  } else if (user.role === 'academic-supervisor' || user.role === 'industry-supervisor') {
    notifications.push(
      {
        id: `notif-supervisor-1-${user.id}`,
        userId: user.id,
        title: 'New Logbook Entries',
        message: 'You have 3 new logbook entries to review from your assigned students.',
        type: 'info',
        isRead: false,
        link: '/supervisor/students',
        createdAt: '2023-09-24T11:30:00Z',
      },
      {
        id: `notif-supervisor-2-${user.id}`,
        userId: user.id,
        title: 'Upcoming Visitation',
        message: 'You have a scheduled visitation for student Chidimma Okonkwo on September 30th.',
        type: 'warning',
        isRead: true,
        link: '/supervisor/visitations',
        createdAt: '2023-09-23T09:15:00Z',
      },
      {
        id: `notif-supervisor-3-${user.id}`,
        userId: user.id,
        title: 'Assessment Reminder',
        message: 'Final assessments for your students are due by October 15th.',
        type: 'warning',
        isRead: false,
        link: '/supervisor/students',
        createdAt: '2023-09-22T13:45:00Z',
      },
      {
        id: `notif-supervisor-4-${user.id}`,
        userId: user.id,
        title: 'New Student Assigned',
        message: 'A new student has been assigned to you for supervision.',
        type: 'success',
        isRead: false,
        link: '/supervisor/students',
        createdAt: '2023-09-21T10:30:00Z',
      }
    );
  } else if (user.role === 'coordinator') {
    notifications.push(
      {
        id: `notif-coordinator-1-${user.id}`,
        userId: user.id,
        title: 'Supervisor Assignment Required',
        message: '5 students are waiting for supervisor assignments.',
        type: 'warning',
        isRead: false,
        link: '/coordinator/assignments',
        createdAt: '2023-09-24T14:30:00Z',
      },
      {
        id: `notif-coordinator-2-${user.id}`,
        userId: user.id,
        title: 'Monthly Report Due',
        message: 'The monthly SIWES program report is due in 3 days.',
        type: 'warning',
        isRead: true,
        link: '/coordinator/reports',
        createdAt: '2023-09-23T11:15:00Z',
      },
      {
        id: `notif-coordinator-3-${user.id}`,
        userId: user.id,
        title: 'New Organizations Registered',
        message: '3 new organizations have registered to participate in the SIWES program.',
        type: 'success',
        isRead: false,
        link: '/coordinator/statistics',
        createdAt: '2023-09-22T09:45:00Z',
      },
      {
        id: `notif-coordinator-4-${user.id}`,
        userId: user.id,
        title: 'Supervisor Meeting',
        message: 'Reminder: Virtual meeting with all supervisors tomorrow at 10:00 AM.',
        type: 'info',
        isRead: false,
        link: '/messages',
        createdAt: '2023-09-21T15:30:00Z',
      }
    );
  } else if (user.role === 'admin') {
    notifications.push(
      {
        id: `notif-admin-1-${user.id}`,
        userId: user.id,
        title: 'System Update Scheduled',
        message: 'A system maintenance update is scheduled for this weekend.',
        type: 'warning',
        isRead: false,
        link: '/admin/settings',
        createdAt: '2023-09-24T16:45:00Z',
      },
      {
        id: `notif-admin-2-${user.id}`,
        userId: user.id,
        title: 'New User Registrations',
        message: '12 new users have registered in the past week.',
        type: 'info',
        isRead: true,
        link: '/admin/users',
        createdAt: '2023-09-23T13:30:00Z',
      },
      {
        id: `notif-admin-3-${user.id}`,
        userId: user.id,
        title: 'Database Backup Completed',
        message: 'Weekly database backup completed successfully.',
        type: 'success',
        isRead: false,
        link: '/admin/settings',
        createdAt: '2023-09-22T08:15:00Z',
      },
      {
        id: `notif-admin-4-${user.id}`,
        userId: user.id,
        title: 'Error Reports',
        message: '3 new error reports have been submitted by users.',
        type: 'error',
        isRead: false,
        link: '/admin/settings',
        createdAt: '2023-09-21T11:45:00Z',
      }
    );
  }
  
  return notifications;
};