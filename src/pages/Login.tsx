import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
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
import { KeyIcon, UserIcon, GraduationCapIcon } from "lucide-react";

const Login = () => {
  const { login, isAuthenticated, currentUser } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "student" | "admin" | "superadmin"
  >("student");
  // const navigate = useNavigate();

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

  const getInputLabel = () => {
    switch (activeTab) {
      case "student":
        return "Matric Number";
      case "admin":
      case "superadmin":
        return "Username";
    }
  };

  const getInputPlaceholder = () => {
    switch (activeTab) {
      case "student":
        return "Enter your matric number";
      case "admin":
        return "Enter admin username";
      case "superadmin":
        return "Enter superadmin username";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-1"></div>
          <CardHeader className="space-y-2 pt-6">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              University Clearance
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-base">
              Login to access your clearance portal
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <Tabs
              value={activeTab}
              onValueChange={(v) => {
                setActiveTab(v as any);
                setUserInput("");
                setPassword("");
              }}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="student"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 transition-all duration-200"
                >
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 transition-all duration-200"
                >
                  Admin
                </TabsTrigger>
                <TabsTrigger
                  value="superadmin"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 transition-all duration-200"
                >
                  Super Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="mt-0 transition-all">
                <form onSubmit={handleLogin}>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <GraduationCapIcon
                          size={16}
                          className="text-blue-600"
                        />
                        {getInputLabel()}
                      </label>
                      <Input
                        type="text"
                        placeholder={getInputPlaceholder()}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <KeyIcon size={16} className="text-blue-600" />
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 font-medium transition-all duration-200 mt-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Logging in...
                        </span>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-0 transition-all">
                <form onSubmit={handleLogin}>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <UserIcon size={16} className="text-blue-600" />
                        {getInputLabel()}
                      </label>
                      <Input
                        type="text"
                        placeholder={getInputPlaceholder()}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <KeyIcon size={16} className="text-blue-600" />
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 font-medium transition-all duration-200 mt-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Logging in...
                        </span>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="superadmin" className="mt-0 transition-all">
                <form onSubmit={handleLogin}>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <UserIcon size={16} className="text-blue-600" />
                        {getInputLabel()}
                      </label>
                      <Input
                        type="text"
                        placeholder={getInputPlaceholder()}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <KeyIcon size={16} className="text-blue-600" />
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 font-medium transition-all duration-200 mt-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Logging in...
                        </span>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              <span className="font-semibold block mb-1 text-sm text-gray-600">
                Demo Credentials
              </span>
              <span className="block mb-1">
                Student:{" "}
                <span className="font-medium text-blue-600">
                  123456 or 789012 or 345678 or 901234/ password
                </span>
              </span>
              <span className="block mb-1">
                Admin:{" "}
                <span className="font-medium text-blue-600">
                  library_admin or fees_admin / admin
                </span>
              </span>
              <span className="block">
                Super Admin:{" "}
                <span className="font-medium text-blue-600">
                  superadmin / superadmin
                </span>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
