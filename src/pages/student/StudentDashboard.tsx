import { useClearance, DEPARTMENTS } from "../../context/ClearanceContext";
import AppLayout from "../../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Progress } from "../..//components/ui/progress";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const StudentDashboard = () => {
  const { getStudentClearanceProgress, studentRequests } = useClearance();
  const navigate = useNavigate();

  const progress = getStudentClearanceProgress();

  // Count approved departments
  const approvedDepartments = studentRequests
    .filter((req) => req.status === "approved")
    .map((req) => req.department);

  // Count pending departments
  const pendingDepartments = studentRequests
    .filter((req) => req.status === "pending")
    .map((req) => req.department);

  // Count departments with rejected requests
  const rejectedDepartments = studentRequests
    .filter((req) => req.status === "rejected")
    .map((req) => req.department);

  // Count remaining departments
  const remainingDepartments = DEPARTMENTS.filter(
    (dept) =>
      !approvedDepartments.includes(dept) &&
      !pendingDepartments.includes(dept) &&
      !rejectedDepartments.includes(dept)
  );

  return (
    <AppLayout requiredRole="student">
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>

        {/* Progress card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
            <CardTitle>Clearance Progress</CardTitle>
            <CardDescription className="text-blue-100">
              Track your clearance completion status
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />

              <p className="mt-4 text-sm">
                {progress === 0
                  ? "You haven't started your clearance process yet. Visit the departments section to begin."
                  : progress === 100
                  ? "Congratulations! You've completed your clearance process."
                  : `Your clearance progress is ${progress}%, please continue with the remaining departments.`}
              </p>

              <Button
                className="mt-4 w-full"
                onClick={() => navigate("/student/departments")}
              >
                View Departments <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Approved Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {approvedDepartments.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Departments cleared
              </p>
            </CardContent>
          </Card>

          {/* Pending Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {pendingDepartments.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Requests awaiting approval
              </p>
            </CardContent>
          </Card>

          {/* Rejected Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {rejectedDepartments.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Requests needing attention
              </p>
            </CardContent>
          </Card>

          {/* Remaining Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {remainingDepartments.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Departments to request
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;
