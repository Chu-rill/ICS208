import { useAuth } from "../../context/AuthContext";
import { useClearance } from "../../context/ClearanceContext";
import AppLayout from "../../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Check } from "lucide-react";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { pendingRequests, clearedRequests } = useClearance();
  const navigate = useNavigate();

  return (
    <AppLayout requiredRole="admin">
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold">Clearance Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the {currentUser?.department} clearance administration
          portal.
        </p>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Requests Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-amber-100 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-amber-800">
                    Pending Requests
                  </CardTitle>
                  <CardDescription className="text-amber-700">
                    Review student clearance requests
                  </CardDescription>
                </div>
                <div className="h-12 w-12 bg-amber-200 rounded-full flex items-center justify-center">
                  <ChevronRight className="h-6 w-6 text-amber-700" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-3xl font-bold">{pendingRequests.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Requests awaiting review
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/admin/pending")}
                  variant="ghost"
                  className="border border-amber-200 hover:bg-amber-50 text-amber-800"
                >
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {pendingRequests.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h4 className="text-sm font-medium">Recent requests:</h4>
                  {pendingRequests.slice(0, 3).map((request) => (
                    <div
                      key={request.id}
                      className="p-3 bg-gray-50 rounded-md text-sm flex justify-between items-center"
                    >
                      <span>
                        {request.studentName} ({request.matricNumber})
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate("/admin/pending")}
                        className="h-8 px-2"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cleared Students Card */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-green-100 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-green-800">
                    Cleared Students
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Students who have been cleared
                  </CardDescription>
                </div>
                <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-3xl font-bold">{clearedRequests.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Students cleared successfully
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/admin/cleared")}
                  variant="ghost"
                  className="border border-green-200 hover:bg-green-50 text-green-800"
                >
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {clearedRequests.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h4 className="text-sm font-medium">Recently cleared:</h4>
                  {clearedRequests.slice(0, 3).map((request) => (
                    <div
                      key={request.id}
                      className="p-3 bg-gray-50 rounded-md text-sm flex justify-between items-center"
                    >
                      <span>
                        {request.studentName} ({request.matricNumber})
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        Cleared
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
