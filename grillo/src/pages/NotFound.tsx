import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Droplets } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blood-500 rounded-full p-4">
            <Droplets className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-blood-500 mb-2">404</h1>
        <p className="text-xl text-gray-700 mb-8">Oops! Page not found</p>
        <Button asChild className="bg-blood-500 hover:bg-blood-600">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
