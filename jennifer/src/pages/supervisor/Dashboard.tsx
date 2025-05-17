import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { demoUsers } from '../../data/users';
import { logbookEntries } from '../../data/logbookEntries';
import { assessments } from '../../data/assessments';
import { createUserNotifications } from '../../data/notifications';
import {
  Users, FileText, ClipboardCheck, Calendar, 
  CheckCircle, Clock, AlertCircle, ArrowRight
} from 'lucide-react';

const SupervisorDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const notifications = createUserNotifications(user!);
  
  // Get supervisor's assigned students
  const supervisor = demoUsers.find(u => u.id === user?.id) as any;
  const assignedStudentIds = supervisor?.assignedStudents || [];
  const assignedStudents = demoUsers.filter(u => assignedStudentIds.includes(u.id));
  
  // Get entries pending review
  const pendingEntries = logbookEntries.filter(entry => 
    assignedStudentIds.includes(entry.studentId) && 
    entry.status === 'submitted'
  );
  
  // Get assessments pending completion
  const pendingAssessments = assignedStudents.filter(student => 
    !assessments.some(assessment => 
      assessment.studentId === student.id && 
      assessment.assessorId === user?.id
    )
  );
  
  // Upcoming visitations (simulated)
  const upcomingVisitations = [
    {
      id: 'v1',
      studentId: assignedStudentIds[0],
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      location: 'TechNigeria Ltd, Lagos',
      status: 'scheduled'
    },
    {
      id: 'v2',
      studentId: assignedStudentIds.length > 1 ? assignedStudentIds[1] : assignedStudentIds[0],
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      location: 'DataTech Solutions, Abuja',
      status: 'scheduled'
    }
  ];
  
  // Recent activities
  const recentActivities = [
    ...pendingEntries.map(entry => ({
      type: 'logbook',
      date: new Date(entry.createdAt),
      title: `New logbook entry: ${entry.title}`,
      studentId: entry.studentId,
      id: entry.id
    })),
    ...assessments
      .filter(assessment => assessment.assessorId === user?.id)
      .map(assessment => ({
        type: 'assessment',
        date: new Date(assessment.createdAt),
        title: `Completed ${assessment.type} assessment`,
        studentId: assessment.studentId,
        id: assessment.id
      }))
  ]
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {user?.role === 'academic-supervisor' ? 'Academic Supervisor Dashboard' : 'Industry Supervisor Dashboard'}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/supervisor/students"
              className="btn-primary"
            >
              <Users size={18} className="mr-2" />
              View Students
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Assigned Students</h2>
              <p className="text-2xl font-semibold text-gray-900">{assignedStudents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FileText size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Pending Reviews</h2>
              <p className="text-2xl font-semibold text-gray-900">{pendingEntries.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <ClipboardCheck size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Pending Assessments</h2>
              <p className="text-2xl font-semibold text-gray-900">{pendingAssessments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Calendar size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Upcoming Visits</h2>
              <p className="text-2xl font-semibold text-gray-900">{upcomingVisitations.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students Overview */}
      <div className="bg-white rounded-lg shadow-card">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Assigned Students</h2>
          <Link to="/supervisor/students" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placement
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignedStudents.map((student: any) => {
                // Calculate progress percentage
                const progress = student.totalDaysLogged / 180 * 100; // Assuming 180 days placement
                
                return (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {student.avatar ? (
                            <img className="h-10 w-10 rounded-full object-cover" src={student.avatar} alt={student.name} />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                              {student.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.matricNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.department}</div>
                      <div className="text-sm text-gray-500">{student.program}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.placementStatus === 'placed' ? (
                        <div>
                          <span className="tag-green">Placed</span>
                          <div className="text-xs text-gray-500 mt-1">{student.company}</div>
                        </div>
                      ) : student.placementStatus === 'seeking' ? (
                        <span className="tag-yellow">Seeking</span>
                      ) : (
                        <span className="tag-blue">Completed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                          <div 
                            style={{ width: `${progress}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              progress < 30 ? 'bg-red-500' : progress < 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">{Math.round(progress)}% completed</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        to={`/supervisor/students/${student.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Tasks and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Pending Tasks</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {pendingEntries.length > 0 ? (
              pendingEntries.slice(0, 3).map((entry) => {
                const student = demoUsers.find(u => u.id === entry.studentId);
                
                return (
                  <div key={entry.id} className="px-6 py-4">
                    <div className="flex items-start">
                      <Clock size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">Review Logbook Entry</p>
                          <span className="tag-yellow ml-2">Pending</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {student?.name} - {entry.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted on {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                        <Link
                          to={`/supervisor/students/${entry.studentId}`}
                          className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center"
                        >
                          Review <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No pending tasks
              </div>
            )}
            
            {pendingAssessments.length > 0 && (
              pendingAssessments.slice(0, 2).map((student: any) => (
                <div key={student.id} className="px-6 py-4">
                  <div className="flex items-start">
                    <ClipboardCheck size={20} className="text-purple-500 mr-3 flex-shrink-0" />
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">Complete Assessment</p>
                        <span className="tag-purple ml-2">Assessment</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {student.name} - Mid-term Assessment
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                      <Link
                        to={`/supervisor/students/${student.id}`}
                        className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center"
                      >
                        Assess <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {upcomingVisitations.length > 0 && user?.role === 'academic-supervisor' && (
              upcomingVisitations.slice(0, 2).map((visit) => {
                const student = demoUsers.find(u => u.id === visit.studentId);
                
                return (
                  <div key={visit.id} className="px-6 py-4">
                    <div className="flex items-start">
                      <Calendar size={20} className="text-green-500 mr-3 flex-shrink-0" />
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">Upcoming Visitation</p>
                          <span className="tag-green ml-2">Scheduled</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {student?.name} at {visit.location}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {visit.date.toLocaleDateString()} at 10:00 AM
                        </p>
                        <Link
                          to="/supervisor/visitations"
                          className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center"
                        >
                          View Details <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => {
                const student = demoUsers.find(u => u.id === activity.studentId);
                
                return (
                  <div key={index} className="px-6 py-4">
                    <div className="flex items-start">
                      {activity.type === 'logbook' ? (
                        <FileText size={20} className="text-blue-500 mr-3 flex-shrink-0" />
                      ) : (
                        <ClipboardCheck size={20} className="text-purple-500 mr-3 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {student?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-card">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          <Link to="/notifications" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {notifications.slice(0, 4).map((notification) => (
            <div key={notification.id} className="bg-gray-50 p-4 rounded-md flex items-start">
              {notification.type === 'success' && <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />}
              {notification.type === 'warning' && <Clock size={20} className="text-yellow-500 mr-3 flex-shrink-0" />}
              {notification.type === 'error' && <AlertCircle size={20} className="text-red-500 mr-3 flex-shrink-0" />}
              {notification.type === 'info' && <FileText size={20} className="text-blue-500 mr-3 flex-shrink-0" />}
              <div>
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                {notification.link && (
                  <Link
                    to={notification.link}
                    className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center"
                  >
                    View details <ArrowRight size={16} className="ml-1" />
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

export default SupervisorDashboard;