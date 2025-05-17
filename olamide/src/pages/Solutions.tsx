import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Fingerprint,
  CreditCard,
  Camera,
  Smartphone,
  Users,
} from "lucide-react";
import CTA from "../components/CTA";

const Solutions = () => {
  const solutions = [
    {
      icon: <Fingerprint className="h-10 w-10 text-primary" />,
      title: "Biometric Access Control",
      description:
        "Our biometric access control system uses advanced facial recognition, fingerprint scanning, and iris technology to ensure only authorized individuals can enter campus facilities.",
      benefits: [
        "Multi-factor authentication combining different biometric methods",
        "Fast processing for smooth traffic flow at entry points",
        "Anti-spoofing technology prevents use of photos or replicas",
        "Centralized management of access rights and privileges",
        "Detailed audit trails for all access events",
      ],
      features: [
        "99.9% accurate facial recognition algorithms",
        "Touchless technology options for hygienic access",
        "Integration with existing student/staff databases",
        "Mobile enrollment capabilities",
        "Customizable access levels and zones",
      ],
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Smart ID Cards with RFID/NFC",
      description:
        "RFID-enabled smart cards provide secure, contactless access for students and staff, with encrypted data that can't be easily duplicated or tampered with.",
      benefits: [
        "Quick, contactless verification at entry points",
        "Multi-purpose functionality for access, payments, and attendance",
        "Easy to issue and revoke as needed",
        "Durable and cost-effective solution",
        "Compatible with existing door hardware and systems",
      ],
      features: [
        "High-frequency RFID with 128-bit AES encryption",
        "Customizable card designs with anti-counterfeiting features",
        "Integration with campus payment and library systems",
        "Mobile credential options for virtual ID cards",
        "Batch issuance capabilities for student intake",
      ],
    },
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "AI-Powered CCTV Surveillance",
      description:
        "Smart CCTV systems with advanced computer vision algorithms detect suspicious activities and unauthorized access attempts in real-time.",
      benefits: [
        "Proactive threat detection before incidents occur",
        "24/7 automated monitoring with reduced manual observation",
        "Historical footage analysis for investigations",
        "Heat mapping for identifying security vulnerability points",
        "Reduced false alarms through AI filtering",
      ],
      features: [
        "Person recognition and tracking across multiple cameras",
        "Behavior analysis for tailgating and loitering detection",
        "License plate recognition for vehicle access control",
        "Integration with access control events for cross-verification",
        "Cloud-based storage with encrypted transmission",
      ],
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Mobile App-Based Access",
      description:
        "Secure mobile applications with biometric authentication for touchless campus entry, providing convenience while maintaining high security standards.",
      benefits: [
        "Eliminates the need to carry physical cards",
        "Multi-factor authentication using device biometrics",
        "Push notifications for security alerts and announcements",
        "Streamlined guest pass generation",
        "Remote access management capabilities",
      ],
      features: [
        "Bluetooth Low Energy (BLE) and NFC compatibility",
        "Offline access mode during network outages",
        "Geofencing capabilities for location-based access",
        "QR code generation for temporary access",
        "Secure encrypted communication channels",
      ],
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Visitor Management System",
      description:
        "Digital registration and tracking system with QR codes for temporary campus access, ensuring all visitors are properly authenticated and monitored.",
      benefits: [
        "Streamlined pre-registration process for expected visitors",
        "Automated notifications to hosts upon visitor arrival",
        "Digital record keeping of all campus visitors",
        "Customizable approval workflows for different visitor types",
        "Time-limited access passes with automatic expiration",
      ],
      features: [
        "Web portal for visitor pre-registration",
        "Self-service kiosks for on-arrival registration",
        "ID scanning and verification capabilities",
        "Watch list screening for known security threats",
        "Integration with access control and security systems",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-slate-900 to-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                Comprehensive Security Solutions
              </h1>
              <p className="text-xl text-slate-200 mb-8">
                Our integrated approach combines multiple technologies to create
                layered security that effectively prevents unauthorized access.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Details */}
        <section className="py-16 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="space-y-20">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                >
                  <div
                    className={`space-y-6 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {solution.icon}
                      <h2 className="text-2xl font-heading font-bold">
                        {solution.title}
                      </h2>
                    </div>
                    <p className="text-lg text-slate-700">
                      {solution.description}
                    </p>

                    <Card className="border-0 shadow-md bg-white">
                      <CardHeader>
                        <CardTitle className="text-lg">Key Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {solution.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <span className="mr-2 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">
                                ✓
                              </span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="border-0 shadow-md bg-white h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Featured Capabilities
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {solution.features.map((feature, i) => (
                            <li key={i} className="pb-4 border-b last:border-0">
                              <span className="font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
