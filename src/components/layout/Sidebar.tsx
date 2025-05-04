import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  List,
  Check,
  User,
  BarChart4,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { currentUser } = useAuth();

  const routes = [
    // Student routes
    ...(currentUser?.role === "student"
      ? [
          {
            path: "/student",
            label: "Dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
          },
          {
            path: "/student/departments",
            label: "View Departments",
            icon: <List className="h-5 w-5" />,
          },
        ]
      : []),

    // Admin routes
    ...(currentUser?.role === "admin"
      ? [
          {
            path: "/admin",
            label: "Dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
          },
          {
            path: "/admin/pending",
            label: "Pending Requests",
            icon: <ChevronRight className="h-5 w-5" />,
          },
          {
            path: "/admin/cleared",
            label: "Cleared Students",
            icon: <Check className="h-5 w-5" />,
          },
        ]
      : []),

    // Super Admin routes
    ...(currentUser?.role === "superadmin"
      ? [
          {
            path: "/superadmin",
            label: "Dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
          },
          {
            path: "/superadmin/departments",
            label: "Department Overview",
            icon: <BarChart4 className="h-5 w-5" />,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and app name */}
          <div className="h-16 border-b border-gray-200 flex items-center px-6">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">
              {currentUser?.role === "student" && "Student Portal"}
              {currentUser?.role === "admin" && "Admin Portal"}
              {currentUser?.role === "superadmin" && "Super Admin"}
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {routes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors",
                        isActive ? "bg-blue-50 text-blue-700" : ""
                      )
                    }
                    onClick={() => setOpen(false)}
                  >
                    {route.icon}
                    <span className="ml-3">{route.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info at bottom */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {currentUser?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium truncate">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser?.role === "student" && currentUser?.matricNumber}
                  {currentUser?.role === "admin" && currentUser?.department}
                  {currentUser?.role === "superadmin" && "Super Admin"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
