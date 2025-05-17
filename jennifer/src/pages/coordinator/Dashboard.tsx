import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  departmentStats, 
  monthlyPlacements, 
  supervisorActivities, 
  industryParticipation 
} from '../../data/stats';
import { demoUsers } from '../../data/users';
import { announcements } from '../../data/announcements';
import { createUserNotifications } from '../../data/notifications';
import {
  Users, Building, Briefcase, Award, Activity, ArrowRight,
  FileText, CheckCircle, Clock, User, BarChart2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const CoordinatorDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const notifications = createUserNotifications(user!);
  
  const students = demoUsers.filter(u => u.role === 'student');
  const supervisors = demoUsers.filter(u => u.role === 'academic-supervisor' || u.role === 'industry-supervisor');
  const placedStudents = students.filter(s => s.placementStatus === 'placed');
  const placementRate = (placedStudents.length / students.length) * 100;
  
  // Convert department stats to percentage for pie chart
  const departmentData = departmentStats.map(dept => ({
    name: dept.department,
    value: dept.totalStudents
  }));
  
  // Top performers (students with highest assessment scores)
  const topPerformers = students
    .filter(s => s.assessmentScore !== undefined)
    .sort((a, b) => (b.assessmentScore || 0) - (a.assessmentScore || 0))
    .slice(0, 5);
  
  // Recent announcements
  const recentAnnouncements = announcements.slice(0, 3);
  
  // Active supervisors
  const activeSupervisors = supervisorActivities
    .sort((a, b) => b.reviewedEntries - a.reviewedEntries)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              SIWES Program Coordination Dashboard
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/coordinator/reports"
              className="btn-primary"
            >
              <FileText size={18} className="mr-2" />
              Generate Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Students</h2>
              <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <User size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Supervisors</h2>
              <p className="text-2xl font-semibold text-gray-900">{supervisors.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Building size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Organizations</h2>
              <p className="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Briefcase size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Placement Rate</h2>
              <p className="text-2xl font-semibold text-gray-900">{placementRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Placements */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Placements</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyPlacements}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#3B82F6" 
                  activeDot={{ r: 8 }} 
                  name="Student Placements" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Students by Department</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Participation */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Industry Participation</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={industryParticipation}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="organizations" fill="#3B82F6" name="Organizations" />
                <Bar dataKey="placements" fill="#10B981" name="Placements" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Department Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placedStudents" fill="#3B82F6" name="Placed Students" />
                <Bar dataKey="completedStudents" fill="#10B981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performers and Active Supervisors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Performing Students</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {topPerformers.map((student, index) => (
              <div key={index} className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0">
                  {student.avatar ? (
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      {student.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500">{student.department}</div>
                </div>
                <div className="flex items-center">
                  <Award size={16} className="text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-900">{student.assessmentScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Most Active Supervisors</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {activeSupervisors.map((supervisor, index) => (
              <div key={index} className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0">
                  {demoUsers.find(u => u.id === supervisor.supervisorId)?.avatar ? (
                    <img
                      src={demoUsers.find(u => u.id === supervisor.supervisorId)?.avatar}
                      alt={supervisor.supervisorName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      {supervisor.supervisorName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-900">{supervisor.supervisorName}</div>
                  <div className="text-sm text-gray-500">{supervisor.department}</div>
                </div>
                <div className="flex items-center">
                  <Activity size={16} className="text-blue-500 mr-1" />
                  <span className="text-sm font-medium text-gray-900">{supervisor.reviewedEntries} reviews</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Announcements and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Recent Announcements</h2>
            <Link to="/announcements" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="px-6 py-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{announcement.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(announcement.publishDate).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {announcement.content.substring(0, 120)}...
                </p>
                <div className="mt-2">
                  <Link
                    to={`/announcements/${announcement.id}`}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                  >
                    Read more <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Required Actions</h2>
            <Link to="/notifications" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.slice(0, 4).map((notification) => (
              <div key={notification.id} className="px-6 py-4">
                <div className="flex items-start">
                  {notification.type === 'warning' && (
                    <Clock size={20} className="text-orange-500 mr-3 flex-shrink-0" />
                  )}
                  {notification.type === 'info' && (
                    <FileText size={20} className="text-blue-500 mr-3 flex-shrink-0" />
                  )}
                  {notification.type === 'success' && (
                    <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    {notification.link && (
                      <Link
                        to={notification.link}
                        className="mt-2 text-primary-600 hover:text-primary-800 text-sm font-medium inline-flex items-center"
                      >
                        Take action <ArrowRight size={16} className="ml-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-card">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/coordinator/assignments"
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center transition-colors"
          >
            <Users size={32} className="text-primary-600 mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Assign Supervisors</h3>
            <p className="text-xs text-gray-500">5 students need assignment</p>
          </Link>
          
          <Link
            to="/coordinator/reports"
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center transition-colors"
          >
            <FileText size={32} className="text-green-600 mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">Generate Reports</h3>
            <p className="text-xs text-gray-500">Monthly reports due soon</p>
          </Link>
          
          <Link
            to="/coordinator/statistics"
            className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center transition-colors"
          >
            <BarChart2 size={32} className="text-purple-600 mb-3" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">View Analytics</h3>
            <p className="text-xs text-gray-500">Program performance metrics</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;