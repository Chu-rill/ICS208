import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ClearanceProvider } from "./context/ClearanceContext";
import { NotificationProvider } from "./context/NotificationContext";

// Pages
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentDepartments from "./pages/student/StudentDepartments";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPendingRequests from "./pages/admin/AdminPendingRequests";
import AdminClearedStudents from "./pages/admin/AdminClearedStudents";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminDepartments from "./pages/superadmin/SuperAdminDepartments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ClearanceProvider>
          <NotificationProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Auth route */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                {/* Student routes */}
                <Route path="/student" element={<StudentDashboard />} />
                <Route
                  path="/student/departments"
                  element={<StudentDepartments />}
                />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/admin/pending"
                  element={<AdminPendingRequests />}
                />
                <Route
                  path="/admin/cleared"
                  element={<AdminClearedStudents />}
                />

                {/* Super admin routes */}
                <Route path="/superadmin" element={<SuperAdminDashboard />} />
                <Route
                  path="/superadmin/departments"
                  element={<SuperAdminDepartments />}
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </ClearanceProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
