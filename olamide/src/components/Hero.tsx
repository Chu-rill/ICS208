import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShieldCheck } from "lucide-react";
import { Card } from "./ui/card";

const Hero: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="inline-flex items-center px-3 py-1.5 bg-secondary/10"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">
                Advanced Campus Security
              </span>
            </Badge>

            <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight animate-fade-in">
              Securing Universities Against Unauthorized Access
            </h1>

            <p className="text-xl text-slate-300">
              Comprehensive security solutions that prevent unauthorized access
              with biometrics, AI-powered surveillance, and smart verification
              systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="md:text-lg">
                Explore Solutions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="md:text-lg bg-transparent text-white border-white hover:bg-white/10"
              >
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  className="w-8 h-8 rounded-full border-2 border-background"
                  alt="User"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/22.jpg"
                  className="w-8 h-8 rounded-full border-2 border-background"
                  alt="User"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  className="w-8 h-8 rounded-full border-2 border-background"
                  alt="User"
                />
              </div>
              <p className="text-sm text-slate-300">
                <span className="font-medium text-white">50+ universities</span>{" "}
                already secured
              </p>
            </div>
          </div>

          <Card className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-xl animate-fade-in bg-transparent border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 z-10 mix-blend-overlay" />
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Campus Security Dashboard"
              className="w-full h-full object-cover"
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
