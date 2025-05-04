import { useAuth } from "../../context/AuthContext";
import {
  useClearance,
  REJECTION_REASONS,
} from "../../context/ClearanceContext";
import { useNotification } from "../../context/NotificationContext";
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
import { Button } from "../../components/ui/button";
import { Check, X, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const AdminPendingRequests = () => {
  const { currentUser } = useAuth();
  const {
    pendingRequests,
    approveClearance,
    rejectClearance,
    clearedRequests,
  } = useClearance();
  const { addNotification } = useNotification();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Handle approving a clearance request
  const handleApprove = (requestId: any, studentId: any) => {
    approveClearance(requestId);

    // Add notification for the student
    addNotification({
      userId: studentId,
      message: `Your clearance request for ${currentUser?.department} has been approved.`,
      type: "success",
    });
  };

  // Open rejection dialog
  const openRejectDialog = (requestId: any) => {
    setSelectedRequest(requestId);
    setRejectionReason("");
    setRejectDialogOpen(true);
  };

  // Handle rejecting a clearance request
  const handleReject = () => {
    if (!selectedRequest || !rejectionReason) return;

    const request = pendingRequests.find((req) => req.id === selectedRequest);
    if (!request) return;

    rejectClearance(selectedRequest, rejectionReason);

    // Add notification for the student
    addNotification({
      userId: request.studentId,
      message: `Your clearance request for ${currentUser?.department} has been rejected: ${rejectionReason}`,
      type: "error",
    });

    setRejectDialogOpen(false);
  };

  const department = currentUser?.department || "";
  const rejectionOptions =
    REJECTION_REASONS[department as keyof typeof REJECTION_REASONS] || [];

  return (
    <AppLayout requiredRole="admin">
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-blue-800">
          Department Clearance Management
        </h1>
        <p className="text-muted-foreground">
          Review and process student clearance requests for{" "}
          {currentUser?.department}.
        </p>

        <Card>
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-blue-800">
              Clearance Request Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid grid-cols-2 bg-blue-50">
                <TabsTrigger value="pending" className="text-blue-700">
                  Pending Requests
                </TabsTrigger>
                <TabsTrigger value="cleared" className="text-blue-700">
                  Cleared Students
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="px-6 py-4">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-800 border-b border-blue-100 pb-2 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-amber-500" />
                    Pending Clearance Requests
                  </h3>

                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                    {pendingRequests.length === 0 ? (
                      <div className="bg-gray-50 rounded-md p-4 text-center">
                        <p className="text-sm text-gray-500 flex items-center justify-center">
                          <Clock className="h-5 w-5 mr-1 text-gray-400" />
                          No pending requests to review
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
                              <TableHead className="text-right font-semibold text-blue-900">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pendingRequests.map((request) => (
                              <TableRow
                                key={request.id}
                                className="hover:bg-blue-50 transition-colors"
                              >
                                <TableCell className="font-medium">
                                  {request.studentName}
                                </TableCell>
                                <TableCell>{request.matricNumber}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    {format(
                                      new Date(request.dateRequested),
                                      "MMM d, yyyy"
                                    )}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-green-600 text-green-600 hover:bg-green-50"
                                      onClick={() =>
                                        handleApprove(
                                          request.id,
                                          request.studentId
                                        )
                                      }
                                    >
                                      <Check className="mr-1 h-4 w-4" />
                                      Clear
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-red-600 text-red-600 hover:bg-red-50"
                                      onClick={() =>
                                        openRejectDialog(request.id)
                                      }
                                    >
                                      <X className="mr-1 h-4 w-4" />
                                      Reject
                                    </Button>
                                  </div>
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

              <TabsContent value="cleared" className="px-6 py-4">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-800 border-b border-blue-100 pb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Cleared Students
                  </h3>

                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                    {clearedRequests?.length === 0 ? (
                      <div className="bg-gray-50 rounded-md p-4 text-center">
                        <p className="text-sm text-gray-500 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 mr-1 text-gray-400" />
                          No cleared students yet
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
                            {clearedRequests?.map((req) => (
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
                                      format(
                                        new Date(req.dateUpdated),
                                        "MMM d, yyyy"
                                      )}
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
            </Tabs>
          </CardContent>
        </Card>

        {/* Rejection Dialog */}
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-blue-800">
                Reject Clearance Request
              </DialogTitle>
              <DialogDescription>
                Please select a reason for rejecting this clearance request.
                This will be visible to the student.
              </DialogDescription>
            </DialogHeader>

            <RadioGroup
              value={rejectionReason}
              onValueChange={setRejectionReason}
              className="space-y-2"
            >
              {rejectionOptions.map((reason) => (
                <div
                  className="flex items-center space-x-2 p-2 hover:bg-blue-50 rounded-md"
                  key={reason}
                >
                  <RadioGroupItem value={reason} id={reason} />
                  <Label htmlFor={reason} className="cursor-pointer w-full">
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setRejectDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectionReason}
              >
                Reject Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default AdminPendingRequests;
