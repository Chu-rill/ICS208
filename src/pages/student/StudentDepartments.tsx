import AppLayout from "../../components/layout/AppLayout";
import { useClearance, DEPARTMENTS } from "../../context/ClearanceContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ChevronRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const StudentDepartments = () => {
  const { requestClearance, getDepartmentRequestStatus, getRejectionReason } =
    useClearance();

  // Department icons (could be expanded)
  const departmentIcons: Record<string, React.ReactNode> = {
    "School Fees": <span className="text-2xl">💰</span>,
    Library: <span className="text-2xl">📚</span>,
    Hostel: <span className="text-2xl">🏠</span>,
    Department: <span className="text-2xl">🎓</span>,
    Bursary: <span className="text-2xl">💼</span>,
    Sports: <span className="text-2xl">🏀</span>,
  };

  const getStatusBadge = (
    status: "none" | "pending" | "approved" | "rejected"
  ) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600">Cleared</Badge>;
      case "pending":
        return <Badge className="bg-amber-600">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Not Requested</Badge>;
    }
  };

  return (
    <AppLayout requiredRole="student">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Department Clearance</h1>
        </div>

        <div className="grid gap-6">
          {DEPARTMENTS.map((department) => {
            const status = getDepartmentRequestStatus(department);
            const rejectionReason = getRejectionReason(department);

            return (
              <Card key={department} className="relative overflow-hidden">
                {status === "approved" && (
                  <div className="absolute -right-8 top-6 bg-green-600 text-white px-10 py-1 rotate-45">
                    Cleared
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="mr-4">{departmentIcons[department]}</div>
                      <div>
                        <CardTitle>{department}</CardTitle>
                        <CardDescription>
                          {department === "School Fees" &&
                            "Financial obligations and payments"}
                          {department === "Library" &&
                            "Book returns and library clearance"}
                          {department === "Hostel" &&
                            "Room inspections and key returns"}
                          {department === "Department" &&
                            "Academic clearance and project submission"}
                          {department === "Bursary" &&
                            "Scholarship and financial aid clearance"}
                          {department === "Sports" &&
                            "Sports equipment returns and fees"}
                        </CardDescription>
                      </div>
                    </div>
                    <div>{getStatusBadge(status)}</div>
                  </div>
                </CardHeader>

                <CardContent>
                  {status === "rejected" && rejectionReason && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your clearance request was rejected:{" "}
                        <span className="font-medium">{rejectionReason}</span>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="requirements">
                      <AccordionTrigger>Requirements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {department === "School Fees" && (
                            <>
                              <li>Complete payment of all tuition fees</li>
                              <li>Settle any outstanding fees or fines</li>
                              <li>Provide proof of payment if required</li>
                            </>
                          )}
                          {department === "Library" && (
                            <>
                              <li>Return all borrowed books and materials</li>
                              <li>Pay any outstanding library fines</li>
                              <li>Clear any holds on your library account</li>
                            </>
                          )}
                          {department === "Hostel" && (
                            <>
                              <li>Room inspection clearance</li>
                              <li>Return room keys and access cards</li>
                              <li>Clear any outstanding hostel fees</li>
                            </>
                          )}
                          {department === "Department" && (
                            <>
                              <li>Submit all required coursework</li>
                              <li>
                                Return any borrowed departmental equipment
                              </li>
                              <li>Complete exit interview if applicable</li>
                            </>
                          )}
                          {department === "Bursary" && (
                            <>
                              <li>Account reconciliation</li>
                              <li>Scholarship/financial aid clearance</li>
                              <li>Clear any financial holds</li>
                            </>
                          )}
                          {department === "Sports" && (
                            <>
                              <li>Return all sports equipment</li>
                              <li>Pay outstanding sports fees</li>
                              <li>Clear team obligations</li>
                            </>
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>

                <CardFooter className="flex justify-end border-t bg-gray-50 p-4">
                  {status === "none" || status === "rejected" ? (
                    <Button
                      onClick={() => requestClearance(department)}
                      className="space-x-2"
                    >
                      <span>Request Clearance</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : status === "pending" ? (
                    <Button disabled variant="outline">
                      Request Pending
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      Cleared
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDepartments;
