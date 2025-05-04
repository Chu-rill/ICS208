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
import { Search } from "lucide-react";

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
        <h1 className="text-2xl font-bold">Cleared Students</h1>
        <p className="text-muted-foreground">
          View all students who have been cleared by {currentUser?.department}.
        </p>

        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <CardTitle>Cleared Students List</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or matric..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm
                  ? "No matching students found"
                  : "No students have been cleared yet"}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Matric Number</TableHead>
                    <TableHead>Date Requested</TableHead>
                    <TableHead>Date Cleared</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.studentName}
                      </TableCell>
                      <TableCell>{student.matricNumber}</TableCell>
                      <TableCell>
                        {format(new Date(student.dateRequested), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {student.dateUpdated &&
                          format(new Date(student.dateUpdated), "MMM d, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminClearedStudents;
