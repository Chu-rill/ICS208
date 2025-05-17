import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, LogOut, Settings, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateNotifications } from '../../data/communications';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Get notifications for the current user
  const notifications = user ? generateNotifications(user.id) : [];
  const unreadNotifications = notifications.filter(n => !n.read);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (notificationsOpen) setNotificationsOpen(false);
    if (profileOpen) setProfileOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (profileOpen) setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.includes('/logbook')) return 'Logbook';
    if (path.includes('/placement')) return 'Placement';
    if (path.includes('/profile')) return 'Profile';
    if (path.includes('/students')) return 'Students';
    if (path.includes('/assessments')) return 'Assessments';
    if (path.includes('/visits')) return 'Visits';
    if (path.includes('/departments')) return 'Departments';
    if (path.includes('/assignments')) return 'Assignments';
    if (path.includes('/reports')) return 'Reports';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/users')) return 'Users';
    if (path.includes('/organizations')) return 'Organizations';
    if (path.includes('/programs')) return 'Programs';
    if (path.includes('/announcements')) return 'Announcements';
    if (path.includes('/messages')) return 'Messages';
    return 'SIWES Management System';
  };

  return (
    <header className="bg-white shadow-sm z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-neutral-500 lg:hidden"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary-500 text-white mr-3">
                <span className="font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-xl hidden md:block text-neutral-900">
                SIWES
              </span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-start">
            <h1 className="text-xl font-semibold text-neutral-800">{getTitle()}</h1>
          </div>

          <div className="flex items-center lg:ml-6 space-x-4">
            <div className="relative">
              <button
                className="p-2 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={toggleNotifications}
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-error-500 text-white text-xs flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-20">
                  <div className="py-2 px-4 bg-primary-500 text-white font-medium flex justify-between items-center">
                    <span>Notifications</span>
                    <span className="text-xs bg-white text-primary-500 rounded-full px-2 py-1">
                      {unreadNotifications.length} new
                    </span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-neutral-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b last:border-b-0 hover:bg-neutral-50 ${
                            !notification.read ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className={`rounded-full p-2 mr-3 ${
                              notification.type === 'info' ? 'bg-primary-100 text-primary-700' :
                              notification.type === 'success' ? 'bg-success-100 text-success-700' :
                              notification.type === 'warning' ? 'bg-warning-100 text-warning-700' :
                              'bg-error-100 text-error-700'
                            }`}>
                              <Bell className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-900 truncate">
                                {notification.title}
                              </p>
                              <p className="text-xs text-neutral-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-neutral-400 mt-1">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="bg-neutral-50 px-4 py-2 text-center">
                    <Link 
                      to="/notifications" 
                      className="text-sm text-primary-500 hover:text-primary-600"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/messages" 
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <MessageSquare className="h-5 w-5" />
            </Link>

            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleProfile}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20">
                  {user && (
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-neutral-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                    </div>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;