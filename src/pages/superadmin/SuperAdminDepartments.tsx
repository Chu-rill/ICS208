import { useClearance, DEPARTMENTS } from "../../context/ClearanceContext";
import AppLayout from "../../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";

const SuperAdminDepartments = () => {
  const { pendingRequests, clearedRequests } = useClearance();

  // All unique students who have made requests
  const allRequests = [...pendingRequests, ...clearedRequests];
  const uniqueStudentIds = [
    ...new Set(allRequests.map((req) => req.studentId)),
  ];
  const totalStudents = uniqueStudentIds.length || 1; // Avoid division by zero

  // Calculate status for each department
  const departmentStatus = DEPARTMENTS.map((dept) => {
    const pendingCount = pendingRequests.filter(
      (req) => req.department === dept
    ).length;
    const approvedCount = clearedRequests.filter(
      (req) => req.department === dept
    ).length;

    // These would be all students who have submitted requests to this department
    const totalDeptRequests = pendingCount + approvedCount;

    // Calculate clearance rate (% of total students cleared by this department)
    const clearanceRate = Math.round((approvedCount / totalStudents) * 100);

    return {
      name: dept,
      pendingCount,
      approvedCount,
      totalDeptRequests,
      clearanceRate,
    };
  });

  return (
    <AppLayout requiredRole="superadmin">
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Department Overview</h1>
        <p className="text-muted-foreground">
          Monitor clearance progress across all departments
        </p>

        {/* Department Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentStatus.map((dept) => (
            <Card key={dept.name}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>{dept.name}</span>
                  <Badge
                    variant={
                      dept.clearanceRate > 75
                        ? "success"
                        : dept.clearanceRate > 40
                        ? "warning"
                        : "outline"
                    }
                  >
                    {dept.clearanceRate}% Cleared
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={dept.clearanceRate} className="h-2" />

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-green-50 p-2 rounded">
                      <div className="font-medium text-green-700">Cleared</div>
                      <div className="text-xl font-bold text-green-700">
                        {dept.approvedCount}
                      </div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded">
                      <div className="font-medium text-amber-700">Pending</div>
                      <div className="text-xl font-bold text-amber-700">
                        {dept.pendingCount}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Details Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Department Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={DEPARTMENTS[0]}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                {DEPARTMENTS.map((dept) => (
                  <TabsTrigger key={dept} value={dept}>
                    {dept}
                  </TabsTrigger>
                ))}
              </TabsList>

              {DEPARTMENTS.map((dept) => (
                <TabsContent key={dept} value={dept}>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {dept} Clearance Details
                    </h3>

                    {/* Pending Requests */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Pending Requests
                      </h4>
                      {pendingRequests.filter((req) => req.department === dept)
                        .length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No pending requests
                        </p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Student Name</TableHead>
                              <TableHead>Matric Number</TableHead>
                              <TableHead>Request Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pendingRequests
                              .filter((req) => req.department === dept)
                              .map((req) => (
                                <TableRow key={req.id}>
                                  <TableCell>{req.studentName}</TableCell>
                                  <TableCell>{req.matricNumber}</TableCell>
                                  <TableCell>
                                    {new Date(
                                      req.dateRequested
                                    ).toLocaleDateString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>

                    {/* Cleared Students */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Cleared Students
                      </h4>
                      {clearedRequests.filter((req) => req.department === dept)
                        .length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No cleared students
                        </p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Student Name</TableHead>
                              <TableHead>Matric Number</TableHead>
                              <TableHead>Cleared Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {clearedRequests
                              .filter((req) => req.department === dept)
                              .map((req) => (
                                <TableRow key={req.id}>
                                  <TableCell>{req.studentName}</TableCell>
                                  <TableCell>{req.matricNumber}</TableCell>
                                  <TableCell>
                                    {req.dateUpdated &&
                                      new Date(
                                        req.dateUpdated
                                      ).toLocaleDateString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SuperAdminDepartments;
