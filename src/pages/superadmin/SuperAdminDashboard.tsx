import { useClearance, DEPARTMENTS } from "../../context/ClearanceContext";
import AppLayout from "../../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart4, Users, Clock, CheckCircle } from "lucide-react";

const SuperAdminDashboard = () => {
  const { pendingRequests, clearedRequests } = useClearance();
  const navigate = useNavigate();

  // Get all unique student IDs across all requests
  const allRequests = [...pendingRequests, ...clearedRequests];
  const uniqueStudentIds = [
    ...new Set(allRequests.map((req) => req.studentId)),
  ];
  const totalStudents = uniqueStudentIds.length;

  // Count students with at least one approved request
  const studentsWithApprovals = new Set(
    clearedRequests.map((req) => req.studentId)
  ).size;

  // Count students with all departments cleared
  const fullyCleared = uniqueStudentIds.filter((studentId) => {
    const approvedDepartments = new Set(
      clearedRequests
        .filter((req) => req.studentId === studentId)
        .map((req) => req.department)
    );
    return approvedDepartments.size === DEPARTMENTS.length;
  }).length;

  // Calculate cleared requests per department
  const clearedByDepartment = DEPARTMENTS.map((dept) => {
    const count = clearedRequests.filter(
      (req) => req.department === dept
    ).length;
    return { name: dept, value: count };
  });

  // Overall clearance data
  const overallData = [
    { name: "Fully Cleared", value: fullyCleared },
    { name: "Partially Cleared", value: studentsWithApprovals - fullyCleared },
    { name: "Not Started", value: totalStudents - studentsWithApprovals },
  ];

  // Colors for charts
  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#6366f1",
    "#d946ef",
  ];

  return (
    <AppLayout requiredRole="superadmin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">
            Clearance System Dashboard
          </h1>
          <Button
            onClick={() => navigate("/superadmin/departments")}
            className="flex items-center bg-blue-400 hover:bg-blue-500"
          >
            <BarChart4 className="mr-2 h-4 w-4" />
            Department Overview
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border border-blue-100">
            <CardHeader className="pb-2 bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-lg text-blue-800 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-blue-700">
                {totalStudents}
              </div>
              <p className="text-sm text-muted-foreground">
                Students in clearance process
              </p>
            </CardContent>
          </Card>

          <Card className="border border-amber-100">
            <CardHeader className="pb-2 bg-amber-50 border-b border-amber-100">
              <CardTitle className="text-lg text-amber-800 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-600" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-amber-600">
                {pendingRequests.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Across all departments
              </p>
            </CardContent>
          </Card>

          <Card className="border border-green-100">
            <CardHeader className="pb-2 bg-green-50 border-b border-green-100">
              <CardTitle className="text-lg text-green-800 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Fully Cleared
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold text-green-600">
                {fullyCleared}
              </div>
              <p className="text-sm text-muted-foreground">
                {totalStudents > 0
                  ? `${Math.round(
                      (fullyCleared / totalStudents) * 100
                    )}% of students`
                  : "No students yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Clearance Status Chart */}
          <Card className="border border-blue-100">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-blue-800">
                Overall Clearance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={overallData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {overallData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} students`, "Count"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Departmental Progress Chart */}
          <Card className="border border-blue-100">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-blue-800">
                Departmental Clearance Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clearedByDepartment}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {clearedByDepartment.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} cleared`, "Count"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-md text-sm text-blue-700">
                This chart shows the number of students cleared by each
                department. Higher values indicate departments that are
                processing clearances more efficiently.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SuperAdminDashboard;
