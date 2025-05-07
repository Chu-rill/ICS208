import React from "react";
import {
  Fingerprint,
  CreditCard,
  Camera,
  Smartphone,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface SolutionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SolutionCard: React.FC<SolutionProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="security-card flex flex-col h-full">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="font-heading">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span>Real-time authentication</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span>Integrated with central systems</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
            <span>Detailed activity logs</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
};

const SecuritySolutions: React.FC = () => {
  const solutions = [
    {
      icon: <Fingerprint className="security-icon" />,
      title: "Biometric Access Control",
      description:
        "Facial recognition, fingerprint, and iris scanning technologies for precise identity verification.",
    },
    {
      icon: <CreditCard className="security-icon" />,
      title: "Smart ID Cards",
      description:
        "RFID/NFC enabled cards that seamlessly integrate with campus entry points for fast verification.",
    },
    {
      icon: <Camera className="security-icon" />,
      title: "AI-Powered Surveillance",
      description:
        "Smart CCTV systems that detect suspicious activities and unauthorized access attempts.",
    },
    {
      icon: <Smartphone className="security-icon" />,
      title: "Mobile App Access",
      description:
        "Secure mobile applications with biometric authentication for touchless campus entry.",
    },
    {
      icon: <Users className="security-icon" />,
      title: "Visitor Management",
      description:
        "Digital registration and tracking system with QR codes for temporary campus access.",
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Comprehensive Security Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Our integrated security solutions address all aspects of campus
            access management, from student identification to visitor tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SolutionCard {...solution} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySolutions;
