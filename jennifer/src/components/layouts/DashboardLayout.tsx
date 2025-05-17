import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { 
  Menu, X, LogOut, Bell, MessageSquare, Settings, User, 
  Home, BookOpen, Briefcase, ClipboardCheck, Users, Calendar,
  BarChart2, FileText, Building, Database, Cog, ChevronDown,
  MenuIcon
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, userRole, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const getNavLinks = () => {
    switch (userRole) {
      case 'student':
        return [
          { path: '/student/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
          { path: '/student/logbook', name: 'Logbook', icon: <BookOpen size={20} /> },
          { path: '/student/placement', name: 'Placement', icon: <Briefcase size={20} /> },
          { path: '/student/assessments', name: 'Assessments', icon: <ClipboardCheck size={20} /> },
        ];
      case 'academic-supervisor':
      case 'industry-supervisor':
        return [
          { path: '/supervisor/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
          { path: '/supervisor/students', name: 'Students', icon: <Users size={20} /> },
          { path: '/supervisor/visitations', name: 'Visitations', icon: <Calendar size={20} /> },
        ];
      case 'coordinator':
        return [
          { path: '/coordinator/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
          { path: '/coordinator/assignments', name: 'Assignments', icon: <Users size={20} /> },
          { path: '/coordinator/reports', name: 'Reports', icon: <FileText size={20} /> },
          { path: '/coordinator/statistics', name: 'Statistics', icon: <BarChart2 size={20} /> },
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
          { path: '/admin/users', name: 'Users', icon: <Users size={20} /> },
          { path: '/admin/organizations', name: 'Organizations', icon: <Building size={20} /> },
          { path: '/admin/programs', name: 'Programs', icon: <Database size={20} /> },
          { path: '/admin/settings', name: 'Settings', icon: <Cog size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 z-30 fixed top-0 w-full">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu size={24} />
            </button>
            <div className="flex items-center ml-4 lg:ml-0">
              <span className="text-primary-600 text-xl font-bold">SIWES</span>
              <span className="text-gray-600 text-xl">MS</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/notifications" className="text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </Link>
            <Link to="/messages" className="text-gray-600 hover:text-gray-900">
              <MessageSquare size={20} />
            </Link>
            <div className="relative">
              <button
                type="button"
                className="flex items-center space-x-2"
                onClick={toggleDropdown}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    {user?.name?.charAt(0)}
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2 text-red-600">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
      </div>

      <div
        className={`fixed top-0 left-0 bottom-0 flex flex-col w-64 bg-white border-r border-gray-200 z-40 transition-all duration-300 transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center">
            <span className="text-primary-600 text-xl font-bold">SIWES</span>
            <span className="text-gray-600 text-xl">MS</span>
          </div>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 lg:hidden"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        <div className="py-4 flex-grow overflow-y-auto">
          <nav className="px-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  location.pathname.startsWith(link.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="mr-3">{link.icon}</div>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-8 px-4 border-t border-gray-200 pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Communication
            </h3>
            <nav className="mt-2 space-y-1">
              <Link
                to="/messages"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  location.pathname.startsWith('/messages')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <MessageSquare size={20} className="mr-3" />
                Messages
              </Link>
              <Link
                to="/announcements"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  location.pathname.startsWith('/announcements')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <FileText size={20} className="mr-3" />
                Announcements
              </Link>
            </nav>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-16 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} SIWES Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;