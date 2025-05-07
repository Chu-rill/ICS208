import React, { useState } from "react";
import { Button } from "./ui/button";
import { Fingerprint, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm shadow-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Fingerprint className="h-6 w-6 text-primary" />
          <span className="text-xl font-heading font-bold">GateKeeper</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/solutions"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Solutions
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Demo Dashboard
          </Link>
          <Button variant="default">Request Demo</Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/"
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/solutions"
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solutions
                </Link>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Demo Dashboard
                </Link>
                <Button
                  variant="default"
                  className="mt-2 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request Demo
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
