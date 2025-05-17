import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  ClipboardCheck, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  Briefcase, 
  BookOpen,
  BarChart,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/common/StatsCard';
import ProgressCard from '../../components/common/ProgressCard';
import { generateLogbookEntries, generatePlacement, generateStudentProgress } from '../../data/students';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Get student data
  const logbookEntries = generateLogbookEntries(user.id);
  const placement = generatePlacement(user.id);
  const progress = generateStudentProgress(user.id);
  
  // Calculate days remaining
  const startDate = new Date(placement.startDate);
  const endDate = new Date(placement.endDate);
  const currentDate = new Date();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  
  // Recent logbook entries
  const recentEntries = logbookEntries.slice(0, 5);
  
  // Pending approvals
  const pendingEntries = logbookEntries.filter(entry => entry.status === 'submitted').slice(0, 3);
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="p-6 flex-1">
            <h2 className="text-2xl font-bold text-neutral-900">Welcome, {user.firstName}!</h2>
            <p className="mt-2 text-neutral-600">
              You are on Day {progress.completedDays} of your {progress.totalDays}-day placement at {placement.companyName}.
            </p>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <Link 
                to="/logbook/new" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create Logbook Entry
              </Link>
              <Link 
                to="/logbook" 
                className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View All Entries
              </Link>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-primary-50 md:w-80 flex flex-col justify-center space-y-3">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-sm text-neutral-700">
                <span className="font-medium">{placement.position}</span> at {placement.companyName}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-sm text-neutral-700">
                <span className="font-medium">{new Date(placement.startDate).toLocaleDateString()}</span> to <span className="font-medium">{new Date(placement.endDate).toLocaleDateString()}</span>
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-sm text-neutral-700">
                <span className="font-medium">{daysRemaining}</span> days remaining
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Days Completed" 
          value={progress.completedDays} 
          icon={Calendar}
          description={`${Math.round((progress.completedDays / progress.totalDays) * 100)}% of placement`}
        />
        <StatsCard 
          title="Total Entries" 
          value={progress.totalEntries} 
          icon={BookOpen}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard 
          title="Pending Approvals" 
          value={progress.pendingApprovals} 
          icon={ClipboardCheck}
        />
        <StatsCard 
          title="Average Rating" 
          value={`${progress.assessmentScores.reduce((acc, curr) => acc + curr.score, 0) / progress.assessmentScores.length}/5`} 
          icon={BarChart}
          trend={{ value: 0.3, isPositive: true }}
        />
      </div>
      
      {/* Progress and Upcoming section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-neutral-900">Progress Overview</h3>
            <Link to="/profile" className="text-sm text-primary-600 hover:text-primary-500 flex items-center">
              View detailed report <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            <ProgressCard 
              title="Overall Completion" 
              value={progress.completedDays} 
              maxValue={progress.totalDays} 
              unit=" days" 
              color="primary" 
              size="md"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProgressCard 
                title="Technical Skills" 
                value={progress.assessmentScores.find(s => s.category === 'Technical Skills')?.score || 0} 
                maxValue={5} 
                color="success" 
                size="sm"
              />
              <ProgressCard 
                title="Communication" 
                value={progress.assessmentScores.find(s => s.category === 'Communication')?.score || 0}
                maxValue={5} 
                color="success" 
                size="sm"
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Skills Developed</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(progress.skills)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([skill, count]) => (
                    <span 
                      key={skill} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {skill} <span className="ml-1 text-primary-500">{count}</span>
                    </span>
                  ))
                }
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Weekly Hours</h4>
              <div className="h-24 flex items-end space-x-1">
                {progress.weeklyHours.slice(-8).map((week, index) => {
                  const percentage = (week.hours / 45) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-primary-100 rounded-t"
                        style={{ height: `${percentage}%` }}
                      >
                        <div 
                          className="bg-primary-500 w-full h-full rounded-t"
                          style={{ opacity: 0.2 + (index / 10) }}
                        ></div>
                      </div>
                      <span className="text-xs text-neutral-500 mt-1 truncate w-full text-center">
                        {week.week}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Pending and Recent section */}
        <div className="space-y-6">
          {/* Pending approvals */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Pending Approvals</h3>
            
            {pendingEntries.length > 0 ? (
              <div className="space-y-3">
                {pendingEntries.map(entry => (
                  <div key={entry.id} className="flex items-start p-3 bg-warning-50 rounded-md">
                    <AlertCircle className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-neutral-800">{entry.title}</h4>
                      <p className="text-xs text-neutral-500">Submitted on {new Date(entry.updatedAt).toLocaleDateString()}</p>
                      <Link 
                        to={`/logbook/${entry.id}`} 
                        className="text-xs text-primary-600 hover:text-primary-500 mt-1 inline-block"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="h-8 w-8 text-success-500 mx-auto" />
                <p className="mt-2 text-sm text-neutral-600">No pending approvals</p>
              </div>
            )}
          </div>
          
          {/* Recent entries */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Recent Entries</h3>
              <Link to="/logbook" className="text-sm text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentEntries.map(entry => (
                <Link 
                  key={entry.id}
                  to={`/logbook/${entry.id}`}
                  className="block p-3 border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-neutral-800">{entry.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      entry.status === 'approved' ? 'bg-success-100 text-success-800' :
                      entry.status === 'rejected' ? 'bg-error-100 text-error-800' :
                      entry.status === 'reviewed' ? 'bg-primary-100 text-primary-800' :
                      entry.status === 'submitted' ? 'bg-warning-100 text-warning-800' :
                      'bg-neutral-100 text-neutral-800'
                    }`}>
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{new Date(entry.date).toLocaleDateString()}</p>
                  <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{entry.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;