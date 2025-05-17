import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import SupervisorDashboard from './SupervisorDashboard';
import CoordinatorDashboard from './CoordinatorDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Render dashboard based on user role
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
      
    case 'academic_supervisor':
    case 'industry_supervisor':
      return <SupervisorDashboard />;
      
    case 'coordinator':
      return <CoordinatorDashboard />;
      
    case 'administrator':
      return <AdminDashboard />;
      
    default:
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-neutral-800">Welcome to SIWES Management System</h2>
          <p className="mt-2 text-neutral-600">Your user role does not have a dedicated dashboard.</p>
        </div>
      );
  }
};

export default DashboardPage;