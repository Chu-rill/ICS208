import { useAuth } from "../../context/AuthContext";
import { useClearance } from "../../context/ClearanceContext";
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
import { format } from "date-fns";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Search, CheckCircle, Calendar } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const AdminClearedStudents = () => {
  const { currentUser } = useAuth();
  const { clearedRequests } = useClearance();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cleared students by search term
  const filteredStudents = clearedRequests.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout requiredRole="admin">
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-blue-800">
          Department Clearance Records
        </h1>
        <p className="text-muted-foreground">
          View all students who have been cleared by {currentUser?.department}.
        </p>

        <Card>
          <CardHeader className="bg-blue-50 border-b flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <CardTitle className="text-blue-800 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Cleared Students List
            </CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
              <Input
                placeholder="Search by name or matric..."
                className="pl-8 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-6 p-6">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
                {filteredStudents.length === 0 ? (
                  <div className="bg-gray-50 rounded-md p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">
                        {searchTerm
                          ? "No matching students found"
                          : "No students have been cleared yet"}
                      </p>
                      {searchTerm && (
                        <p className="text-sm text-gray-400 mt-1">
                          Try adjusting your search terms
                        </p>
                      )}
                    </div>
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
                            Date Requested
                          </TableHead>
                          <TableHead className="font-semibold text-blue-900">
                            Date Cleared
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow
                            key={student.id}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            <TableCell className="font-medium">
                              {student.studentName}
                            </TableCell>
                            <TableCell>{student.matricNumber}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                <Calendar className="h-3 w-3 mr-1" />
                                {format(
                                  new Date(student.dateRequested),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </TableCell>
                            <TableCell>
                              {student.dateUpdated && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {format(
                                    new Date(student.dateUpdated),
                                    "MMM d, yyyy"
                                  )}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>

              {filteredStudents.length > 0 && (
                <div className="bg-blue-50 rounded-md p-4 flex items-center">
                  <div className="flex items-center text-blue-800">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-blue-200 mr-2"
                    >
                      {filteredStudents.length}
                    </Badge>
                    <span className="text-sm">
                      {filteredStudents.length === 1 ? "student" : "students"}{" "}
                      cleared by {currentUser?.department}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminClearedStudents;
