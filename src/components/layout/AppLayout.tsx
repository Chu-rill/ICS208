import { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Navigate } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
  requiredRole?: "student" | "admin" | "superadmin" | "any";
}

const AppLayout = ({ children, requiredRole = "any" }: AppLayoutProps) => {
  const { currentUser, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check for required role
  if (requiredRole !== "any" && currentUser?.role !== requiredRole) {
    // Redirect to appropriate dashboard
    if (currentUser?.role === "student") {
      return <Navigate to="/student" />;
    } else if (currentUser?.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (currentUser?.role === "superadmin") {
      return <Navigate to="/superadmin" />;
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
