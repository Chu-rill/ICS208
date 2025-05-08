import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    navigate("/dashboard");
    // Simulate authentication (replace with actual authentication logic)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Logo/Header Area */}
      <div className="mb-8 text-center">
        <div className="h-16 w-16 rounded-full bg-[#D11B2F] mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">BL</span>
        </div>
        <h1 className="text-3xl font-bold text-[#D11B2F]">BloodLink</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md border border-gray-100 shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-gray-300 focus:border-[#D11B2F] focus:ring focus:ring-red-200 transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm text-[#D11B2F] hover:text-[#A71526] font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-[#D11B2F] focus:ring focus:ring-red-200 transition-all"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-[#D11B2F] hover:bg-[#A71526] text-white font-medium rounded-md transition-colors"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-[#D11B2F] hover:text-[#A71526] font-medium"
              >
                Register
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2025 Blood Donor Connect. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
