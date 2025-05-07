import React from "react";
import { Button } from "./ui/button";

const CTA: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-heading font-bold">
            Ready to Secure Your Campus?
          </h2>
          <p className="text-lg text-slate-300">
            Schedule a personalized demo today and discover how GateKeeper can
            transform your university's security.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              Request Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </div>

          <p className="text-sm text-slate-400 pt-6">
            Already using GateKeeper?{" "}
            <a href="#" className="text-secondary underline">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
