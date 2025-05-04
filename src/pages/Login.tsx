import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const Login = () => {
  const { login, isAuthenticated, currentUser } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "student" | "admin" | "superadmin"
  >("student");
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (currentUser?.role === "student") {
      return <Navigate to="/student" />;
    } else if (currentUser?.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (currentUser?.role === "superadmin") {
      return <Navigate to="/superadmin" />;
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(userInput, password);
      if (success) {
        // Navigate based on user role (will happen automatically via redirect)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              University Clearance System
            </CardTitle>
            <CardDescription className="text-center">
              Login to access your clearance portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="superadmin">Super Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="mt-0">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Matric Number
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your matric number"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-0">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input
                        type="text"
                        placeholder="Enter admin username"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="superadmin" className="mt-0">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input
                        type="text"
                        placeholder="Enter superadmin username"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-xs text-muted-foreground text-center">
              Demo Credentials:
              <br />
              Student: 123456 / password
              <br />
              Admin: library_admin or fees_admin / admin
              <br />
              Super Admin: superadmin / superadmin
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
