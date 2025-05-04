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
import { Check, X } from "lucide-react";
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

const AdminPendingRequests = () => {
  const { currentUser } = useAuth();
  const { pendingRequests, approveClearance, rejectClearance } = useClearance();
  const { addNotification } = useNotification();

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");

  // Handle approving a clearance request
  const handleApprove = (
    requestId: string,
    studentId: string,
    studentName: string
  ) => {
    approveClearance(requestId);

    // Add notification for the student
    addNotification({
      userId: studentId,
      message: `Your clearance request for ${currentUser?.department} has been approved.`,
      type: "success",
    });
  };

  // Open rejection dialog
  const openRejectDialog = (requestId: string) => {
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
        <h1 className="text-2xl font-bold">Pending Requests</h1>
        <p className="text-muted-foreground">
          Review and process student clearance requests for{" "}
          {currentUser?.department}.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Pending Clearance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No pending requests to review
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Matric Number</TableHead>
                    <TableHead>Date Requested</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.studentName}
                      </TableCell>
                      <TableCell>{request.matricNumber}</TableCell>
                      <TableCell>
                        {format(new Date(request.dateRequested), "MMM d, yyyy")}
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
                                request.studentId,
                                request.studentName
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
                            onClick={() => openRejectDialog(request.id)}
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
            )}
          </CardContent>
        </Card>

        {/* Rejection Dialog */}
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Clearance Request</DialogTitle>
              <DialogDescription>
                Please select a reason for rejecting this clearance request.
                This will be visible to the student.
              </DialogDescription>
            </DialogHeader>

            <RadioGroup
              value={rejectionReason}
              onValueChange={setRejectionReason}
            >
              {rejectionOptions.map((reason) => (
                <div className="flex items-center space-x-2" key={reason}>
                  <RadioGroupItem value={reason} id={reason} />
                  <Label htmlFor={reason}>{reason}</Label>
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
