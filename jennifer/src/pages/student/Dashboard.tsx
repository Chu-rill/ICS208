import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { logbookEntries } from '../../data/logbookEntries';
import { assessments } from '../../data/assessments';
import { createUserNotifications } from '../../data/notifications';
import { 
  Calendar, Clock, FileText, ClipboardCheck, ArrowRight, 
  AlertCircle, CheckCircle, AlertTriangle, Info
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const notifications = createUserNotifications(user!);
  
  // Get student's logbook entries
  const studentEntries = logbookEntries.filter(entry => entry.studentId === user?.id);
  const totalEntries = studentEntries.length;
  const pendingReviews = studentEntries.filter(entry => entry.status === 'submitted').length;
  const approvedEntries = studentEntries.filter(entry => entry.status === 'approved').length;
  
  // Get student's assessments
  const studentAssessments = assessments.filter(assessment => assessment.studentId === user?.id);
  
  // Calculate days left (assuming 6 months placement)
  const startDate = user?.startDate ? new Date(user.startDate) : new Date();
  const endDate = user?.endDate ? new Date(user.endDate) : new Date(startDate.getTime() + 180 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  const daysCompleted = Math.floor((today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  const daysLeft = Math.max(0, Math.floor((endDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)));
  const progressPercentage = Math.min(100, Math.floor((daysCompleted / totalDays) * 100));
  
  // Recent activities
  const recentActivities = [
    ...studentEntries.map(entry => ({
      type: 'logbook',
      date: new Date(entry.createdAt),
      title: entry.title,
      status: entry.status,
      id: entry.id
    })),
    ...studentAssessments.map(assessment => ({
      type: 'assessment',
      date: new Date(assessment.createdAt),
      title: `${assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)} Assessment`,
      status: assessment.status,
      id: assessment.id
    }))
  ]
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .slice(0, 5);
  
  // Upcoming deadlines
  const upcomingDeadlines = [
    {
      title: 'Mid-term Assessment',
      date: new Date(startDate.getTime() + (totalDays / 2) * 24 * 60 * 60 * 1000),
      type: 'assessment'
    },
    {
      title: 'Final Assessment',
      date: endDate,
      type: 'assessment'
    },
    {
      title: 'Weekly Logbook Submission',
      date: new Date(today.getTime() + (7 - today.getDay()) * 24 * 60 * 60 * 1000),
      type: 'logbook'
    }
  ]
  .filter(deadline => deadline.date > today)
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with your industrial training
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/student/logbook"
              className="btn-primary"
            >
              Update Logbook
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Calendar size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Placement Progress</h2>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{daysCompleted} days</p>
                <p className="ml-2 text-sm text-gray-600">of {totalDays} days</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {progressPercentage}% Complete
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    {daysLeft} days left
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FileText size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Logbook Entries</h2>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{totalEntries}</p>
                <p className="ml-2 text-sm text-gray-600">entries</p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-xs text-gray-500">Approved</p>
              <p className="text-lg font-medium text-gray-900">{approvedEntries}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-lg font-medium text-gray-900">{pendingReviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <ClipboardCheck size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Assessments</h2>
              <div className="mt-1">
                <p className="text-2xl font-semibold text-gray-900">
                  {studentAssessments.length > 0 ? `${studentAssessments[0].totalScore}%` : 'No assessments'}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            {studentAssessments.length > 0 ? (
              <div>
                <div className="text-sm text-gray-500 mb-2">
                  Latest Assessment: {studentAssessments[0].type.charAt(0).toUpperCase() + studentAssessments[0].type.slice(1)}
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-purple-100">
                    <div
                      style={{ width: `${(studentAssessments[0].totalScore / studentAssessments[0].maximumScore) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">0</span>
                    <span className="text-xs text-gray-500">100</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">No assessments available yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <Link to="/student/logbook" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1">
                    {activity.type === 'logbook' ? (
                      <FileText size={20} className="text-green-500" />
                    ) : (
                      <ClipboardCheck size={20} className="text-purple-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">
                      {activity.date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <div className="mt-1">
                      {activity.status === 'approved' && (
                        <span className="tag-green">Approved</span>
                      )}
                      {activity.status === 'submitted' && (
                        <span className="tag-yellow">Submitted</span>
                      )}
                      {activity.status === 'reviewed' && (
                        <span className="tag-blue">Reviewed</span>
                      )}
                      {activity.status === 'draft' && (
                        <span className="tag-gray">Draft</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent activity</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-4 mt-1">
                  <Clock size={20} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                  <p className="text-xs text-gray-500">
                    {deadline.date.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <div className="mt-1">
                    {deadline.type === 'logbook' ? (
                      <span className="tag-green">Logbook</span>
                    ) : (
                      <span className="tag-purple">Assessment</span>
                    )}
                  </div>
                </div>
                <div>
                  <Link
                    to={deadline.type === 'logbook' ? '/student/logbook' : '/student/assessments'}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          <Link to="/notifications" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {notifications.slice(0, 3).map((notification) => (
            <div key={notification.id} className="flex items-start p-3 bg-gray-50 rounded-md">
              <div className="mr-3 mt-0.5">
                {notification.type === 'success' && <CheckCircle size={20} className="text-green-500" />}
                {notification.type === 'warning' && <AlertTriangle size={20} className="text-orange-500" />}
                {notification.type === 'error' && <AlertCircle size={20} className="text-red-500" />}
                {notification.type === 'info' && <Info size={20} className="text-blue-500" />}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                {notification.link && (
                  <Link
                    to={notification.link}
                    className="mt-2 inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-800"
                  >
                    View details <ArrowRight size={14} className="ml-1" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;