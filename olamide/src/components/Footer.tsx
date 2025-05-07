import React from "react";
import { Fingerprint } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Fingerprint className="h-6 w-6 text-secondary" />
              <span className="text-xl font-heading font-bold">GateKeeper</span>
            </div>
            <p className="text-slate-400">
              Advanced campus security solutions for modern universities
            </p>
          </div>

          <div>
            <h3 className="font-heading font-medium mb-4">Solutions</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Biometric Access
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Smart ID Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  AI Surveillance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Mobile App Access
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Visitor Management
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-medium mb-4">Connect</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Schedule Demo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} GateKeeper Security Systems. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
