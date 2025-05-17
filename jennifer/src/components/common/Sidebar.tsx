import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Users, 
  ClipboardList, 
  CalendarRange,
  BarChart4, 
  Building, 
  Settings, 
  UserCircle,
  MessageSquare,
  Bell,
  GraduationCap,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const role = user?.role;

  // Navigation items based on user role
  const getNavItems = (role?: UserRole) => {
    // Common navigation items
    const commonItems = [
      {
        name: 'Dashboard',
        to: '/',
        icon: <LayoutDashboard className="w-5 h-5" />
      },
      {
        name: 'Profile',
        to: '/profile',
        icon: <UserCircle className="w-5 h-5" />
      },
      {
        name: 'Messages',
        to: '/messages',
        icon: <MessageSquare className="w-5 h-5" />
      },
      {
        name: 'Notifications',
        to: '/notifications',
        icon: <Bell className="w-5 h-5" />
      }
    ];
    
    // Role-specific items
    let roleItems: Array<{ name: string; to: string; icon: JSX.Element }> = [];
    
    switch (role) {
      case 'student':
        roleItems = [
          {
            name: 'Logbook',
            to: '/logbook',
            icon: <BookOpen className="w-5 h-5" />
          },
          {
            name: 'Placement',
            to: '/placement',
            icon: <Briefcase className="w-5 h-5" />
          },
          {
            name: 'Assessments',
            to: '/assessments',
            icon: <ClipboardList className="w-5 h-5" />
          }
        ];
        break;
        
      case 'academic_supervisor':
      case 'industry_supervisor':
        roleItems = [
          {
            name: 'Students',
            to: '/students',
            icon: <Users className="w-5 h-5" />
          },
          {
            name: 'Assessments',
            to: '/assessments',
            icon: <ClipboardList className="w-5 h-5" />
          }
        ];
        
        // Academic supervisors can visit students, industry supervisors cannot
        if (role === 'academic_supervisor') {
          roleItems.push({
            name: 'Visits',
            to: '/visits',
            icon: <CalendarRange className="w-5 h-5" />
          });
        }
        break;
        
      case 'coordinator':
        roleItems = [
          {
            name: 'Departments',
            to: '/departments',
            icon: <Building className="w-5 h-5" />
          },
          {
            name: 'Students',
            to: '/students',
            icon: <GraduationCap className="w-5 h-5" />
          },
          {
            name: 'Supervisors',
            to: '/supervisors',
            icon: <Users className="w-5 h-5" />
          },
          {
            name: 'Assignments',
            to: '/assignments',
            icon: <Briefcase className="w-5 h-5" />
          },
          {
            name: 'Reports',
            to: '/reports',
            icon: <FileText className="w-5 h-5" />
          },
          {
            name: 'Analytics',
            to: '/analytics',
            icon: <BarChart4 className="w-5 h-5" />
          }
        ];
        break;
        
      case 'administrator':
        roleItems = [
          {
            name: 'Users',
            to: '/users',
            icon: <Users className="w-5 h-5" />
          },
          {
            name: 'Organizations',
            to: '/organizations',
            icon: <Building className="w-5 h-5" />
          },
          {
            name: 'Programs',
            to: '/programs',
            icon: <GraduationCap className="w-5 h-5" />
          },
          {
            name: 'Announcements',
            to: '/announcements',
            icon: <Bell className="w-5 h-5" />
          },
          {
            name: 'Reports',
            to: '/reports',
            icon: <FileText className="w-5 h-5" />
          },
          {
            name: 'Settings',
            to: '/settings',
            icon: <Settings className="w-5 h-5" />
          }
        ];
        break;
    }
    
    return [...commonItems, ...roleItems];
  };
  
  const navItems = getNavItems(role);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary-500 text-white">
              <span className="font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-xl text-neutral-900">SIWES</span>
          </div>
        </div>
        
        <nav className="mt-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`
                  }
                  onClick={onClose}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-neutral-50">
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                  <UserCircle className="h-5 w-5" />
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-900 truncate max-w-[180px]">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-neutral-500 capitalize">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;