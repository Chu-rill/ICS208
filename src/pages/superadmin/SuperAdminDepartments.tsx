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
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-1"></div>
          <CardHeader className="bg-white pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Department Details
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <Tabs defaultValue={DEPARTMENTS[0]}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-blue-50">
                {DEPARTMENTS.map((dept) => (
                  <TabsTrigger
                    key={dept}
                    value={dept}
                    className="text-blue-700"
                  >
                    {dept}
                  </TabsTrigger>
                ))}
              </TabsList>

              {DEPARTMENTS.map((dept) => (
                <TabsContent key={dept} value={dept} className="px-6 py-4">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-blue-800 border-b border-blue-100 pb-2">
                      {dept} Clearance Details
                    </h3>

                    {/* Pending Requests */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                      <h4 className="text-md font-semibold mb-3 text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-amber-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Pending Requests
                      </h4>
                      {pendingRequests.filter((req) => req.department === dept)
                        .length === 0 ? (
                        <div className="bg-gray-50 rounded-md p-4 text-center">
                          <p className="text-sm text-gray-500 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            No pending requests
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader className="bg-blue-50">
                              <TableRow>
                                <TableHead className="font-semibold text-blue-900">
                                  Student Name
                                </TableHead>
                                <TableHead className="font-semibold text-blue-900">
                                  Matric Number
                                </TableHead>
                                <TableHead className="font-semibold text-blue-900">
                                  Request Date
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {pendingRequests
                                .filter((req) => req.department === dept)
                                .map((req) => (
                                  <TableRow
                                    key={req.id}
                                    className="hover:bg-blue-50 transition-colors"
                                  >
                                    <TableCell className="font-medium">
                                      {req.studentName}
                                    </TableCell>
                                    <TableCell>{req.matricNumber}</TableCell>
                                    <TableCell>
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                        {new Date(
                                          req.dateRequested
                                        ).toLocaleDateString()}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>

                    {/* Cleared Students */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                      <h4 className="text-md font-semibold mb-3 text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Cleared Students
                      </h4>
                      {clearedRequests.filter((req) => req.department === dept)
                        .length === 0 ? (
                        <div className="bg-gray-50 rounded-md p-4 text-center">
                          <p className="text-sm text-gray-500 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            No cleared students
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader className="bg-blue-50">
                              <TableRow>
                                <TableHead className="font-semibold text-blue-900">
                                  Student Name
                                </TableHead>
                                <TableHead className="font-semibold text-blue-900">
                                  Matric Number
                                </TableHead>
                                <TableHead className="font-semibold text-blue-900">
                                  Cleared Date
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {clearedRequests
                                .filter((req) => req.department === dept)
                                .map((req) => (
                                  <TableRow
                                    key={req.id}
                                    className="hover:bg-blue-50 transition-colors"
                                  >
                                    <TableCell className="font-medium">
                                      {req.studentName}
                                    </TableCell>
                                    <TableCell>{req.matricNumber}</TableCell>
                                    <TableCell>
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {req.dateUpdated &&
                                          new Date(
                                            req.dateUpdated
                                          ).toLocaleDateString()}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
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
