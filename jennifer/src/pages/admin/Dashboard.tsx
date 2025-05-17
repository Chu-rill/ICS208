import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { demoUsers } from '../../data/users';
import { organizations } from '../../data/organizations';
import { programStatistics } from '../../data/stats';
import { createUserNotifications } from '../../data/notifications';
import {
  Users, Building, Settings, Shield, Activity,
  BarChart2, ArrowRight, ArrowUpRight, ArrowDownRight,
  CheckCircle, AlertCircle, AlertTriangle, Info
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const notifications = createUserNotifications(user!);
  
  // User statistics
  const students = demoUsers.filter(u => u.role === 'student');
  const academicSupervisors = demoUsers.filter(u => u.role === 'academic-supervisor');
  const industrySupervisors = demoUsers.filter(u => u.role === 'industry-supervisor');
  const coordinators = demoUsers.filter(u => u.role === 'coordinator');
  const admins = demoUsers.filter(u => u.role === 'admin');
  
  // System status indicators
  const systemStatus = {
    uptime: '99.9%',
    lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString(),
    activeUsers: 42,
    pendingRegistrations: 12
  };
  
  // Recent user activities (simulated)
  const recentActivities = [
    {
      id: 'a1',
      user: 'Dr. Tunde Bakare',
      action: 'Created a new announcement',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'create'
    },
    {
      id: 'a2',
      user: 'Engr. Abdul Yusuf',
      action: 'Updated student assessment',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: 'update'
    },
    {
      id: 'a3',
      user: 'System',
      action: 'Database backup completed',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: 'system'
    },
    {
      id: 'a4',
      user: 'Admin',
      action: 'Approved 3 new organizations',
      timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000),
      type: 'approve'
    },
    {
      id: 'a5',
      user: 'Amina Ibrahim',
      action: 'New student registration',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      type: 'create'
    }
  ];
  
  // User registration trend (simulated)
  const userRegistrationData = [
    { month: 'Jan', students: 12, supervisors: 2 },
    { month: 'Feb', students: 19, supervisors: 3 },
    { month: 'Mar', students: 15, supervisors: 1 },
    { month: 'Apr', students: 25, supervisors: 4 },
    { month: 'May', students: 32, supervisors: 5 },
    { month: 'Jun', students: 19, supervisors: 2 },
    { month: 'Jul', students: 10, supervisors: 3 },
    { month: 'Aug', students: 15, supervisors: 2 },
    { month: 'Sep', students: 28, supervisors: 4 }
  ];
  
  // System performance metrics (simulated)
  const performanceData = [
    { name: 'Week 1', response: 320, errors: 2 },
    { name: 'Week 2', response: 350, errors: 3 },
    { name: 'Week 3', response: 410, errors: 1 },
    { name: 'Week 4', response: 490, errors: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              System Administration Dashboard
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/admin/settings"
              className="btn-primary"
            >
              <Settings size={18} className="mr-2" />
              System Settings
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
              <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
              <p className="text-2xl font-semibold text-gray-900">{demoUsers.length}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-500">Students:</span>
                <span className="ml-1 font-medium text-gray-900">{students.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Supervisors:</span>
                <span className="ml-1 font-medium text-gray-900">
                  {academicSupervisors.length + industrySupervisors.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Building size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Organizations</h2>
              <p className="text-2xl font-semibold text-gray-900">{organizations.length}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-500">Active:</span>
                <span className="ml-1 font-medium text-gray-900">
                  {organizations.filter(org => org.status === 'active').length}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Pending:</span>
                <span className="ml-1 font-medium text-gray-900">
                  {organizations.filter(org => org.status === 'pending').length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Activity size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">System Status</h2>
              <p className="text-2xl font-semibold text-gray-900">{systemStatus.uptime}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-500">Last Backup:</span>
                <span className="ml-1 font-medium text-gray-900">{systemStatus.lastBackup}</span>
              </div>
              <div>
                <span className="text-gray-500">Active Now:</span>
                <span className="ml-1 font-medium text-gray-900">{systemStatus.activeUsers}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <Shield size={24} />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Security</h2>
              <p className="text-2xl font-semibold text-green-600">Normal</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-500">Failed Logins:</span>
                <span className="ml-1 font-medium text-gray-900">5</span>
              </div>
              <div>
                <span className="text-gray-500">Last Scan:</span>
                <span className="ml-1 font-medium text-gray-900">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Registration Trend */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">User Registration Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userRegistrationData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#93C5FD" 
                  name="Students" 
                />
                <Area 
                  type="monotone" 
                  dataKey="supervisors" 
                  stackId="1"
                  stroke="#10B981" 
                  fill="#6EE7B7" 
                  name="Supervisors" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">System Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="response" 
                  stroke="#3B82F6" 
                  activeDot={{ r: 8 }}
                  name="Avg. Response Time (ms)" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="errors" 
                  stroke="#EF4444" 
                  name="Error Count" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Program Statistics and User Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">SIWES Program Statistics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Academic Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Placement Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programStatistics.map((stat, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stat.academicYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stat.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{(stat.placementRate * 100).toFixed(1)}%</span>
                        {index > 0 && (
                          <>
                            {stat.placementRate > programStatistics[index - 1].placementRate ? (
                              <ArrowUpRight size={16} className="ml-1 text-green-500" />
                            ) : (
                              <ArrowDownRight size={16} className="ml-1 text-red-500" />
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{(stat.completionRate * 100).toFixed(1)}%</span>
                        {index > 0 && (
                          <>
                            {stat.completionRate > programStatistics[index - 1].completionRate ? (
                              <ArrowUpRight size={16} className="ml-1 text-green-500" />
                            ) : (
                              <ArrowDownRight size={16} className="ml-1 text-red-500" />
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{stat.averageAssessmentScore.toFixed(1)}</span>
                        {index > 0 && (
                          <>
                            {stat.averageAssessmentScore > programStatistics[index - 1].averageAssessmentScore ? (
                              <ArrowUpRight size={16} className="ml-1 text-green-500" />
                            ) : (
                              <ArrowDownRight size={16} className="ml-1 text-red-500" />
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent System Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {activity.type === 'create' && (
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <span className="block h-2 w-2 rounded-full bg-green-600"></span>
                      </div>
                    )}
                    {activity.type === 'update' && (
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                        <span className="block h-2 w-2 rounded-full bg-blue-600"></span>
                      </div>
                    )}
                    {activity.type === 'system' && (
                      <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                        <span className="block h-2 w-2 rounded-full bg-purple-600"></span>
                      </div>
                    )}
                    {activity.type === 'approve' && (
                      <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                        <span className="block h-2 w-2 rounded-full bg-yellow-600"></span>
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-xs text-gray-500">
                        {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">System Notifications</h2>
            <Link to="/notifications" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="p-6 grid grid-cols-1 gap-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start p-4 bg-gray-50 rounded-md">
                {notification.type === 'success' && <CheckCircle size={20} className="text-green-500 mr-3 flex-shrink-0" />}
                {notification.type === 'warning' && <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0" />}
                {notification.type === 'error' && <AlertCircle size={20} className="text-red-500 mr-3 flex-shrink-0" />}
                {notification.type === 'info' && <Info size={20} className="text-blue-500 mr-3 flex-shrink-0" />}
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

        <div className="bg-white rounded-lg shadow-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to="/admin/users"
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Users size={24} className="text-blue-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Manage Users</h3>
                  <p className="text-xs text-gray-500 mt-1">Approve, edit, or remove user accounts</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/admin/organizations"
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Building size={24} className="text-green-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Manage Organizations</h3>
                  <p className="text-xs text-gray-500 mt-1">Add or update participating companies</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/admin/programs"
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <BarChart2 size={24} className="text-purple-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Program Management</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure SIWES programs and cycles</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/admin/settings"
              className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Settings size={24} className="text-gray-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">System Settings</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure system parameters and behavior</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;