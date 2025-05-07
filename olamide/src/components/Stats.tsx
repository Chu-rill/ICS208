import React from "react";
import { Card, CardContent } from "./ui/card";

const Stats: React.FC = () => {
  return (
    <section className="bg-primary py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">98%</p>
              <p className="text-lg text-white/80">
                Reduction in Unauthorized Access
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">50+</p>
              <p className="text-lg text-white/80">University Partners</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">250k+</p>
              <p className="text-lg text-white/80">Students Protected</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-6 text-center">
              <p className="text-4xl md:text-5xl font-bold text-white">99.9%</p>
              <p className="text-lg text-white/80">System Uptime</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;
