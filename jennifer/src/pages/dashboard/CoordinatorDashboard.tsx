import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Users, 
  UserPlus, 
  FileText, 
  BarChart2, 
  ArrowRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/common/StatsCard';
import { 
  generateDepartmentStats, 
  generateInstitutionKpis, 
  generateSupervisionActivities 
} from '../../data/coordinator';
import DataTable from '../../components/common/DataTable';
import { InstitutionKpi } from '../../types/coordinator';

const CoordinatorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Get coordinator data
  const departments = generateDepartmentStats();
  const kpis = generateInstitutionKpis();
  const supervisionActivities = generateSupervisionActivities();
  
  // Department table columns
  const departmentColumns = [
    {
      header: 'Department',
      accessor: 'name',
      sortable: true
    },
    {
      header: 'Students',
      accessor: (dept: any) => (
        <div className="flex items-center">
          <span className="font-medium">{dept.activeStudents}</span>
          <span className="text-neutral-500 mx-1">/</span>
          <span className="text-neutral-500">{dept.totalStudents}</span>
        </div>
      ),
      sortable: true
    },
    {
      header: 'Supervisors',
      accessor: (dept: any) => (
        <div className="flex items-center">
          <span>{dept.academicSupervisors} academic</span>
          <span className="mx-1">|</span>
          <span>{dept.industrySupervisors} industry</span>
        </div>
      )
    },
    {
      header: 'Avg. Rating',
      accessor: (dept: any) => (
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <svg 
                key={star}
                className={`h-4 w-4 ${star <= Math.round(dept.avgStudentRating) ? 'text-warning-400' : 'text-neutral-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2">{dept.avgStudentRating.toFixed(1)}</span>
        </div>
      ),
      sortable: true
    },
    {
      header: 'Action',
      accessor: (dept: any) => (
        <Link 
          to={`/departments/${dept.id}`}
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
          You are overseeing {departments.reduce((sum, dept) => sum + dept.activeStudents, 0)} active SIWES students across {departments.length} departments.
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <Link 
            to="/assignments" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Manage Assignments
          </Link>
          <Link 
            to="/supervisors" 
            className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Supervision Activity
          </Link>
          <Link 
            to="/reports" 
            className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Generate Reports
          </Link>
        </div>
      </div>
      
      {/* Institution KPIs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Institution KPIs</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi: InstitutionKpi) => (
            <div key={kpi.name} className="bg-neutral-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-neutral-500">{kpi.name}</h4>
                {kpi.change !== 0 && (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    kpi.change > 0 ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                  }`}>
                    {kpi.change > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(kpi.change).toFixed(1)}
                  </span>
                )}
              </div>
              
              <div className="mt-2 flex items-end">
                <span className="text-2xl font-bold text-neutral-900">{typeof kpi.value === 'number' ? kpi.value.toFixed(1) : kpi.value}</span>
                <span className="ml-1 text-xs text-neutral-500 mb-1">{kpi.unit}</span>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${(kpi.value / kpi.target) * 100}%` }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-neutral-500">
                  <span>Previous: {kpi.previousValue.toFixed(1)}</span>
                  <span>Target: {kpi.target.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Departments" 
          value={departments.length} 
          icon={Building}
        />
        <StatsCard 
          title="Active Students" 
          value={departments.reduce((sum, dept) => sum + dept.activeStudents, 0)} 
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard 
          title="Total Supervisors" 
          value={
            departments.reduce((sum, dept) => sum + dept.academicSupervisors, 0) + 
            departments.reduce((sum, dept) => sum + dept.industrySupervisors, 0)
          } 
          icon={UserPlus}
        />
        <StatsCard 
          title="Completion Rate" 
          value={`${Math.round(
            (departments.reduce((sum, dept) => sum + dept.completedStudents, 0) / 
            departments.reduce((sum, dept) => sum + dept.totalStudents, 0)) * 100
          )}%`} 
          icon={FileText}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
      
      {/* Departments table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-neutral-900">Departments Overview</h3>
            <Link to="/departments" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
              View all departments <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <DataTable 
          columns={departmentColumns}
          data={departments}
          keyField="id"
          searchable={false}
          pagination={false}
          onRowClick={(dept) => window.location.href = `/departments/${dept.id}`}
        />
      </div>
      
      {/* Supervision Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Supervision Activity</h3>
          <Link to="/supervisors" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
            View all supervisors <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {supervisionActivities.map((activity) => (
            <div key={activity.supervisorId} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                      {activity.supervisorName.split(' ').map(name => name[0]).join('')}
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-neutral-900">{activity.supervisorName}</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {activity.supervisorType === 'academic' ? 'Academic' : 'Industry'} Supervisor • {activity.department}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  activity.averageResponseTime < 1 ? 'bg-success-100 text-success-800' : 
                  activity.averageResponseTime < 2 ? 'bg-primary-100 text-primary-800' : 
                  'bg-warning-100 text-warning-800'
                }`}>
                  {activity.averageResponseTime.toFixed(1)} day response
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-neutral-900">{activity.totalStudents}</span>
                  <span className="text-xs text-neutral-500">Students</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-neutral-900">{activity.reviewsCompleted}</span>
                  <span className="text-xs text-neutral-500">Reviews</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-neutral-900">{activity.visitsCompleted}</span>
                  <span className="text-xs text-neutral-500">Visits</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-xs text-neutral-500">
                  Last activity: {new Date(activity.lastActivity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Analytics Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-neutral-900">Analytics Overview</h3>
          <Link to="/analytics" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
            View detailed analytics <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="h-64 flex flex-col justify-center items-center">
          <BarChart2 className="h-16 w-16 text-neutral-300" />
          <p className="mt-4 text-neutral-600 text-center">
            Comprehensive analytics with student performance, supervisor engagement, and program effectiveness metrics would be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;