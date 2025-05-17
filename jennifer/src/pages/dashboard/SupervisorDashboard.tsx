import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ClipboardCheck, 
  Clock, 
  UserCheck, 
  ArrowRight, 
  Calendar,
  BarChart4,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/common/StatsCard';
import { 
  generateSupervisorStudents,
  generateAssessments
} from '../../data/supervisors';
import DataTable from '../../components/common/DataTable';

const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Get supervisor data
  const students = generateSupervisorStudents(user.id);
  const activeStudents = students.filter(s => s.status === 'active');
  
  // Calculate pending reviews
  const totalPendingReviews = students.reduce((total, student) => total + student.pendingReviews, 0);
  
  // Get assessments for the first student (for demo purposes)
  const assessments = students.length > 0 ? generateAssessments(user.id, students[0].studentId) : [];
  const pendingAssessments = assessments.filter(a => a.status === 'draft');
  
  // Upcoming visits (only for academic supervisors)
  const upcomingVisits = user.role === 'academic_supervisor' ? [
    {
      id: 'visit-1',
      studentName: 'Adebayo Johnson',
      company: 'TechNigeria Ltd',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'scheduled'
    },
    {
      id: 'visit-2',
      studentName: 'Chioma Okafor',
      company: 'Nigerian Engineering Solutions',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'scheduled'
    }
  ] : [];
  
  // Student list table columns
  const studentColumns = [
    {
      header: 'Student',
      accessor: (student: any) => (
        <div className="flex items-center">
          {student.avatar ? (
            <img 
              src={student.avatar} 
              alt={`${student.firstName} ${student.lastName}`}
              className="h-8 w-8 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mr-3">
              {student.firstName.charAt(0)}{student.lastName.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-neutral-800">{student.firstName} {student.lastName}</p>
            <p className="text-xs text-neutral-500">{student.department}</p>
          </div>
        </div>
      ),
      sortable: true,
      width: 'w-1/3'
    },
    {
      header: 'Company',
      accessor: 'companyName',
      sortable: true
    },
    {
      header: 'Progress',
      accessor: (student: any) => (
        <div className="w-full">
          <div className="flex items-center">
            <div className="flex-grow h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${student.progress}%` }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-neutral-600">{student.progress}%</span>
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (student: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          student.status === 'active' ? 'bg-success-100 text-success-800' :
          student.status === 'inactive' ? 'bg-error-100 text-error-800' :
          'bg-neutral-100 text-neutral-800'
        }`}>
          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      ),
      sortable: true
    },
    {
      header: 'Action',
      accessor: (student: any) => (
        <Link 
          to={`/students/${student.studentId}`}
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
          You are supervising {activeStudents.length} active students. 
          {totalPendingReviews > 0 && ` You have ${totalPendingReviews} pending reviews to complete.`}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <Link 
            to="/students" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Manage Students
          </Link>
          <Link 
            to="/assessments" 
            className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            View Assessments
          </Link>
          {user.role === 'academic_supervisor' && (
            <Link 
              to="/visits" 
              className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Schedule Visits
            </Link>
          )}
        </div>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Students" 
          value={students.length} 
          icon={Users}
          description={`${activeStudents.length} active, ${students.length - activeStudents.length} completed`}
        />
        <StatsCard 
          title="Pending Reviews" 
          value={totalPendingReviews} 
          icon={ClipboardCheck}
        />
        <StatsCard 
          title="Assessments Completed" 
          value={assessments.filter(a => a.status === 'finalized').length} 
          icon={FileText}
          trend={{ value: 10, isPositive: true }}
        />
        {user.role === 'academic_supervisor' ? (
          <StatsCard 
            title="Upcoming Visits" 
            value={upcomingVisits.length} 
            icon={Calendar}
          />
        ) : (
          <StatsCard 
            title="Average Response Time" 
            value="1.2 days" 
            icon={Clock}
            trend={{ value: 15, isPositive: true }}
          />
        )}
      </div>
      
      {/* Students table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-neutral-900">Assigned Students</h3>
            <Link to="/students" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
              View all students <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
        
        <DataTable 
          columns={studentColumns}
          data={students.slice(0, 5)}
          keyField="id"
          searchable={false}
          pagination={false}
          onRowClick={(student) => window.location.href = `/students/${student.studentId}`}
        />
      </div>
      
      {/* Pending Reviews and Upcoming Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Reviews */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Pending Reviews</h3>
          
          {totalPendingReviews > 0 ? (
            <div className="space-y-3">
              {students
                .filter(student => student.pendingReviews > 0)
                .slice(0, 3)
                .map(student => (
                  <div key={student.id} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {student.avatar ? (
                          <img 
                            src={student.avatar} 
                            alt={`${student.firstName} ${student.lastName}`}
                            className="h-8 w-8 rounded-full mr-3 object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center mr-3">
                            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-neutral-800">{student.firstName} {student.lastName}</p>
                          <p className="text-xs text-neutral-500">{student.pendingReviews} pending {student.pendingReviews === 1 ? 'entry' : 'entries'}</p>
                        </div>
                      </div>
                      <Link 
                        to={`/students/${student.studentId}/logbook`}
                        className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                ))
              }
              
              {totalPendingReviews > 3 && (
                <Link 
                  to="/reviews"
                  className="block text-center text-sm text-primary-600 hover:text-primary-500 py-2 mt-2"
                >
                  View all {totalPendingReviews} pending reviews
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle2 className="h-8 w-8 text-success-500 mx-auto" />
              <p className="mt-2 text-sm text-neutral-600">No pending reviews</p>
            </div>
          )}
        </div>
        
        {/* Upcoming Section */}
        {user.role === 'academic_supervisor' ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Upcoming Visits</h3>
            
            {upcomingVisits.length > 0 ? (
              <div className="space-y-3">
                {upcomingVisits.map(visit => (
                  <div key={visit.id} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-800">{visit.studentName}</p>
                        <p className="text-xs text-neutral-500">{visit.company}</p>
                        <p className="text-xs text-neutral-600 mt-1">
                          {new Date(visit.date).toLocaleDateString()} ({Math.ceil((new Date(visit.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days)
                        </p>
                      </div>
                      <Link 
                        to="/visits"
                        className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Calendar className="h-8 w-8 text-neutral-400 mx-auto" />
                <p className="mt-2 text-sm text-neutral-600">No upcoming visits scheduled</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Pending Assessments</h3>
            
            {pendingAssessments.length > 0 ? (
              <div className="space-y-3">
                {pendingAssessments.slice(0, 3).map(assessment => (
                  <div key={assessment.id} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-warning-500 mr-2" />
                          <p className="font-medium text-neutral-800">
                            {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)} Assessment
                          </p>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                          Created on {new Date(assessment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Link 
                        to={`/assessments/${assessment.id}`}
                        className="text-primary-600 hover:text-primary-500 text-sm font-medium"
                      >
                        Complete
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="h-8 w-8 text-success-500 mx-auto" />
                <p className="mt-2 text-sm text-neutral-600">No pending assessments</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Recent Activity Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-4">Supervision Activity</h3>
        
        <div className="h-64 flex flex-col justify-center items-center">
          <BarChart4 className="h-16 w-16 text-neutral-300" />
          <p className="mt-4 text-neutral-600 text-center">
            Activity chart would display here with review frequency, response times, and assessment completion rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;