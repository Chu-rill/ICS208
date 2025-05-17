import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Auth Pages
import Login from './pages/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout Components
import DashboardLayout from './components/layouts/DashboardLayout';

// Common Pages
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Messages from './pages/communication/Messages';
import Announcements from './pages/communication/Announcements';
import Notifications from './pages/communication/Notifications';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import Logbook from './pages/student/Logbook';
import Placement from './pages/student/Placement';
import Assessments from './pages/student/Assessments';

// Supervisor Pages
import SupervisorDashboard from './pages/supervisor/Dashboard';
import StudentManagement from './pages/supervisor/StudentManagement';
import StudentReview from './pages/supervisor/StudentReview';
import Visitations from './pages/supervisor/Visitations';

// Coordinator Pages
import CoordinatorDashboard from './pages/coordinator/Dashboard';
import Assignments from './pages/coordinator/Assignments';
import Reports from './pages/coordinator/Reports';
import Statistics from './pages/coordinator/Statistics';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import Organizations from './pages/admin/Organizations';
import ProgramManagement from './pages/admin/ProgramManagement';
import SystemSettings from './pages/admin/SystemSettings';

function App() {
  const { isAuthenticated, userRole } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Shared Protected Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Student Routes */}
            <Route path="/student/dashboard" element={userRole === 'student' ? <StudentDashboard /> : <Navigate to="/" />} />
            <Route path="/student/logbook" element={userRole === 'student' ? <Logbook /> : <Navigate to="/" />} />
            <Route path="/student/placement" element={userRole === 'student' ? <Placement /> : <Navigate to="/" />} />
            <Route path="/student/assessments" element={userRole === 'student' ? <Assessments /> : <Navigate to="/" />} />

            {/* Supervisor Routes */}
            <Route 
              path="/supervisor/dashboard" 
              element={(userRole === 'academic-supervisor' || userRole === 'industry-supervisor') ? <SupervisorDashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/supervisor/students" 
              element={(userRole === 'academic-supervisor' || userRole === 'industry-supervisor') ? <StudentManagement /> : <Navigate to="/" />} 
            />
            <Route 
              path="/supervisor/students/:studentId" 
              element={(userRole === 'academic-supervisor' || userRole === 'industry-supervisor') ? <StudentReview /> : <Navigate to="/" />} 
            />
            <Route 
              path="/supervisor/visitations" 
              element={(userRole === 'academic-supervisor' || userRole === 'industry-supervisor') ? <Visitations /> : <Navigate to="/" />} 
            />

            {/* Coordinator Routes */}
            <Route path="/coordinator/dashboard" element={userRole === 'coordinator' ? <CoordinatorDashboard /> : <Navigate to="/" />} />
            <Route path="/coordinator/assignments" element={userRole === 'coordinator' ? <Assignments /> : <Navigate to="/" />} />
            <Route path="/coordinator/reports" element={userRole === 'coordinator' ? <Reports /> : <Navigate to="/" />} />
            <Route path="/coordinator/statistics" element={userRole === 'coordinator' ? <Statistics /> : <Navigate to="/" />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/admin/users" element={userRole === 'admin' ? <UserManagement /> : <Navigate to="/" />} />
            <Route path="/admin/organizations" element={userRole === 'admin' ? <Organizations /> : <Navigate to="/" />} />
            <Route path="/admin/programs" element={userRole === 'admin' ? <ProgramManagement /> : <Navigate to="/" />} />
            <Route path="/admin/settings" element={userRole === 'admin' ? <SystemSettings /> : <Navigate to="/" />} />
          </Route>
        </Route>

        {/* Redirect based on role */}
        <Route path="/" element={
          isAuthenticated ? (
            userRole === 'student' ? <Navigate to="/student/dashboard" /> :
            (userRole === 'academic-supervisor' || userRole === 'industry-supervisor') ? <Navigate to="/supervisor/dashboard" /> :
            userRole === 'coordinator' ? <Navigate to="/coordinator/dashboard" /> :
            userRole === 'admin' ? <Navigate to="/admin/dashboard" /> :
            <Navigate to="/login" />
          ) : <Navigate to="/login" />
        } />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;