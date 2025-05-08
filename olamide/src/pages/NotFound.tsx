import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Shield } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md px-4">
          <div className="mb-6 flex justify-center">
            <div className="bg-slate-200 p-4 rounded-full">
              <Shield className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-heading font-bold mb-4">404</h1>
          <p className="text-xl text-slate-700 mb-6">
            This area is secured and restricted from access
          </p>
          <p className="text-slate-500 mb-8">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Button asChild size="lg">
            <a href="/">Return to Secure Area</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
