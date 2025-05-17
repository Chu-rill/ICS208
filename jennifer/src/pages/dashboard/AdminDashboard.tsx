import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building, 
  Settings, 
  Bell, 
  ArrowRight,
  Shield,
  Database,
  BarChart,
  Activity,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/common/StatsCard';
import { 
  generateOrganizations, 
  generatePrograms, 
  generateAnnouncements 
} from '../../data/administrator';
import { users } from '../../data/users';
import DataTable from '../../components/common/DataTable';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Get admin data
  const organizations = generateOrganizations();
  const programs = generatePrograms();
  const announcements = generateAnnouncements();
  
  // Calculate user stats
  const userStats = {
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    academicSupervisors: users.filter(u => u.role === 'academic_supervisor').length,
    industrySupervisors: users.filter(u => u.role === 'industry_supervisor').length,
    coordinators: users.filter(u => u.role === 'coordinator').length,
    administrators: users.filter(u => u.role === 'administrator').length
  };
  
  // Recent announcements
  const recentAnnouncements = announcements.slice(0, 3);
  
  // Organizations table columns
  const organizationColumns = [
    {
      header: 'Organization',
      accessor: (org: any) => (
        <div className="flex items-center">
          {org.logo ? (
            <img 
              src={org.logo} 
              alt={org.name}
              className="h-8 w-8 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mr-3">
              {org.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-neutral-800">{org.name}</p>
            <p className="text-xs text-neutral-500">{org.industry}</p>
          </div>
        </div>
      ),
      sortable: true,
      width: 'w-1/3'
    },
    {
      header: 'Location',
      accessor: (org: any) => `${org.city}, ${org.state}`,
      sortable: true
    },
    {
      header: 'Students',
      accessor: (org: any) => (
        <div className="flex items-center">
          <span className="font-medium">{org.activeStudents}</span>
          <span className="text-neutral-500 mx-1">/</span>
          <span className="text-neutral-500">{org.historicalStudents}</span>
        </div>
      ),
      sortable: true
    },
    {
      header: 'Status',
      accessor: (org: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          org.status === 'active' ? 'bg-success-100 text-success-800' :
          org.status === 'inactive' ? 'bg-error-100 text-error-800' :
          'bg-warning-100 text-warning-800'
        }`}>
          {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
        </span>
      ),
      sortable: true
    },
    {
      header: 'Action',
      accessor: (org: any) => (
        <Link 
          to={`/organizations/${org.id}`}
          className="text-primary-600 hover:text-primary-500 text-sm font-medium"
        >
          View
        </Link>
      )
    }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-neutral-900">Welcome, {user.firstName}!</h2>
        <p className="mt-2 text-neutral-600">
          You have access to manage all aspects of the SIWES Management System. There are {userStats.total} users and {organizations.length} organizations registered in the system.
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <Link 
            to="/users" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Manage Users
          </Link>
          <Link 
            to="/organizations" 
            className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            View Organizations
          </Link>
          <Link 
            to="/settings" 
            className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            System Settings
          </Link>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Users" 
          value={userStats.total} 
          icon={Users}
          description={`${userStats.students} students, ${userStats.academicSupervisors + userStats.industrySupervisors} supervisors`}
        />
        <StatsCard 
          title="Organizations" 
          value={organizations.length} 
          icon={Building}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Active Programs" 
          value={programs.filter(p => p.status === 'active').length} 
          icon={GraduationCap}
        />
        <StatsCard 
          title="System Uptime" 
          value="99.9%" 
          icon={Activity}
          trend={{ value: 0.2, isPositive: true }}
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-neutral-900">User Distribution</h3>
            <Link to="/users" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
              Manage users <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-neutral-50 rounded-lg p-4 text-center">
              <Users className="h-8 w-8 text-primary-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-neutral-900">{userStats.students}</p>
              <p className="text-sm text-neutral-600">Students</p>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4 text-center">
              <Shield className="h-8 w-8 text-secondary-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-neutral-900">{userStats.academicSupervisors + userStats.industrySupervisors}</p>
              <p className="text-sm text-neutral-600">Supervisors</p>
              <div className="mt-1 text-xs text-neutral-500">
                <span>{userStats.academicSupervisors} academic</span>
                <span className="mx-1">|</span>
                <span>{userStats.industrySupervisors} industry</span>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-4 text-center">
              <Database className="h-8 w-8 text-accent-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-neutral-900">{userStats.coordinators + userStats.administrators}</p>
              <p className="text-sm text-neutral-600">Administrators</p>
              <div className="mt-1 text-xs text-neutral-500">
                <span>{userStats.coordinators} coordinators</span>
                <span className="mx-1">|</span>
                <span>{userStats.administrators} admins</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-100">
                    User Distribution
                  </span>
                </div>
              </div>
              <div className="flex h-4 overflow-hidden text-xs bg-neutral-100 rounded-full">
                <div
                  style={{ width: `${(userStats.students / userStats.total) * 100}%` }}
                  className="flex flex-col justify-center text-center text-white bg-primary-500 shadow-none whitespace-nowrap"
                ></div>
                <div
                  style={{ width: `${(userStats.academicSupervisors / userStats.total) * 100}%` }}
                  className="flex flex-col justify-center text-center text-white bg-secondary-500 shadow-none whitespace-nowrap"
                ></div>
                <div
                  style={{ width: `${(userStats.industrySupervisors / userStats.total) * 100}%` }}
                  className="flex flex-col justify-center text-center text-white bg-secondary-700 shadow-none whitespace-nowrap"
                ></div>
                <div
                  style={{ width: `${((userStats.coordinators + userStats.administrators) / userStats.total) * 100}%` }}
                  className="flex flex-col justify-center text-center text-white bg-accent-500 shadow-none whitespace-nowrap"
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>Students ({Math.round((userStats.students / userStats.total) * 100)}%)</span>
                <span>Academic Sup. ({Math.round((userStats.academicSupervisors / userStats.total) * 100)}%)</span>
                <span>Industry Sup. ({Math.round((userStats.industrySupervisors / userStats.total) * 100)}%)</span>
                <span>Admin ({Math.round(((userStats.coordinators + userStats.administrators) / userStats.total) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Announcements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-neutral-900">Recent Announcements</h3>
            <Link to="/announcements" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentAnnouncements.map(announcement => (
              <div key={announcement.id} className="border rounded-md p-3">
                <div className="flex items-start">
                  <Bell className={`h-5 w-5 mr-3 flex-shrink-0 ${
                    announcement.priority === 'urgent' ? 'text-error-500' :
                    announcement.priority === 'high' ? 'text-warning-500' :
                    announcement.priority === 'medium' ? 'text-primary-500' :
                    'text-neutral-400'
                  }`} />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-800">{announcement.title}</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      By {announcement.author} • {new Date(announcement.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                      {announcement.content}
                    </p>
                    <Link 
                      to={`/announcements/${announcement.id}`}
                      className="text-xs text-primary-600 hover:text-primary-500 mt-2 inline-block"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            <Link 
              to="/announcements/new"
              className="block text-center py-3 border border-dashed border-neutral-300 rounded-md text-sm text-primary-600 hover:text-primary-500 hover:border-primary-300 transition-colors"
            >
              <Bell className="h-5 w-5 mx-auto mb-1" />
              Create New Announcement
            </Link>
          </div>
        </div>
      </div>
      
      {/* Organizations table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-neutral-900">Organizations</h3>
            <div className="flex space-x-3">
              <Link 
                to="/organizations/new"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Organization
              </Link>
              <Link 
                to="/organizations"
                className="text-sm text-primary-600 hover:text-primary-500 flex items-center"
              >
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        <DataTable 
          columns={organizationColumns}
          data={organizations.slice(0, 5)}
          keyField="id"
          searchable={false}
          pagination={false}
          onRowClick={(org) => window.location.href = `/organizations/${org.id}`}
        />
      </div>
      
      {/* Program Management & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-neutral-900">Program Management</h3>
            <Link to="/programs" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
              Manage programs <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {programs.slice(0, 3).map(program => (
              <div key={program.id} className="border rounded-md p-3">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-neutral-800">{program.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    program.status === 'active' ? 'bg-success-100 text-success-800' :
                    program.status === 'inactive' ? 'bg-error-100 text-error-800' :
                    'bg-neutral-100 text-neutral-800'
                  }`}>
                    {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                  {program.description}
                </p>
                <div className="mt-2 flex items-center text-xs text-neutral-500">
                  <span className="mr-3">{program.duration} {program.durationUnit}</span>
                  <span>{program.departments.length} departments</span>
                </div>
              </div>
            ))}
            
            <Link 
              to="/programs/new"
              className="block text-center py-3 border border-dashed border-neutral-300 rounded-md text-sm text-primary-600 hover:text-primary-500 hover:border-primary-300 transition-colors"
            >
              <GraduationCap className="h-5 w-5 mx-auto mb-1" />
              Create New Program
            </Link>
          </div>
        </div>
        
        {/* System Health */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-neutral-900">System Health</h3>
            <Link to="/settings" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
              System settings <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-neutral-700">Server Load</span>
                <span className="text-sm text-neutral-500">24.5%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '24.5%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-neutral-700">Database Usage</span>
                <span className="text-sm text-neutral-500">68.3%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-warning-500 h-2 rounded-full" style={{ width: '68.3%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-neutral-700">Storage Space</span>
                <span className="text-sm text-neutral-500">42.1%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '42.1%' }}></div>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium text-neutral-700 mb-3">Recent System Events</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-success-500 mt-1.5 mr-2"></div>
                  <div>
                    <p className="text-xs font-medium text-neutral-700">Database backup completed</p>
                    <p className="text-xs text-neutral-500">Today, 04:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-warning-500 mt-1.5 mr-2"></div>
                  <div>
                    <p className="text-xs font-medium text-neutral-700">System updates available</p>
                    <p className="text-xs text-neutral-500">Yesterday, 11:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-success-500 mt-1.5 mr-2"></div>
                  <div>
                    <p className="text-xs font-medium text-neutral-700">Security scan completed</p>
                    <p className="text-xs text-neutral-500">Apr 15, 2023, 2:45 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Usage Analytics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Usage Analytics</h3>
          <Link to="/analytics" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
            View detailed analytics <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="h-64 flex flex-col justify-center items-center">
          <BarChart className="h-16 w-16 text-neutral-300" />
          <p className="mt-4 text-neutral-600 text-center">
            Comprehensive system usage analytics would be displayed here, including user logins, feature usage, and performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;