import React from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Shield, Bell, UserCheck, AlertTriangle } from "lucide-react";

const DemoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">
            See GateKeeper in Action
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore our interactive demo to understand how our security
            solutions would work at your campus.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="biometric">Biometric</TabsTrigger>
            <TabsTrigger value="surveillance">Surveillance</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-slate-900 text-white p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Security Dashboard</h3>
                    <span className="text-sm text-slate-400">Live Preview</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-green-50 border-green-100">
                      <CardContent className="p-4 flex items-center">
                        <Shield className="h-10 w-10 text-green-500 mr-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Secure Access
                          </p>
                          <p className="text-2xl font-bold">1,254</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-red-50 border-red-100">
                      <CardContent className="p-4 flex items-center">
                        <AlertTriangle className="h-10 w-10 text-red-500 mr-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Access Denied
                          </p>
                          <p className="text-2xl font-bold">23</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                      <CardContent className="p-4 flex items-center">
                        <UserCheck className="h-10 w-10 text-blue-500 mr-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Visitors
                          </p>
                          <p className="text-2xl font-bold">87</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-50 border-amber-100">
                      <CardContent className="p-4 flex items-center">
                        <Bell className="h-10 w-10 text-amber-500 mr-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Alerts
                          </p>
                          <p className="text-2xl font-bold">5</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Recent Activity</h4>
                    <div className="space-y-2">
                      {[
                        {
                          time: "09:45 AM",
                          user: "John Smith",
                          action: "Entered through Main Gate",
                          status: "Authorized",
                        },
                        {
                          time: "09:32 AM",
                          user: "Emily Johnson",
                          action: "Entered through North Gate",
                          status: "Authorized",
                        },
                        {
                          time: "09:21 AM",
                          user: "Unknown Person",
                          action: "Attempted access at East Gate",
                          status: "Unauthorized",
                        },
                        {
                          time: "09:15 AM",
                          user: "David Williams",
                          action: "Entered through Main Gate",
                          status: "Authorized",
                        },
                        {
                          time: "09:07 AM",
                          user: "Sarah Brown",
                          action: "Entered through South Gate",
                          status: "Authorized",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-slate-50 rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-500">
                              {item.time}
                            </span>
                            <span className="font-medium">{item.user}</span>
                            <span className="text-sm">{item.action}</span>
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              item.status === "Authorized"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biometric" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-4">
                    Biometric Access Control
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Our biometric system uses facial recognition, fingerprint
                    scanning, and iris technology to ensure only authorized
                    personnel can enter secured areas.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mr-3 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-medium">
                          Multiple Verification Methods
                        </h4>
                        <p className="text-sm text-slate-500">
                          Combine fingerprint, facial recognition, and PIN for
                          multi-factor authentication
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-medium">Fast Processing</h4>
                        <p className="text-sm text-slate-500">
                          Verification in under 1 second for smooth traffic flow
                          at entry points
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-medium">
                          Anti-Spoofing Technology
                        </h4>
                        <p className="text-sm text-slate-500">
                          Advanced liveness detection prevents use of photos or
                          replicas
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                    alt="Biometric Access Control"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="surveillance" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                    alt="AI Surveillance"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-4">
                    AI-Powered Surveillance
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Smart cameras with advanced AI algorithms detect
                    unauthorized access attempts and suspicious behavior,
                    alerting security personnel in real-time.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mr-3 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-medium">Behavior Analysis</h4>
                        <p className="text-sm text-slate-500">
                          Detects loitering, tailgating, and other suspicious
                          patterns
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-medium">24/7 Monitoring</h4>
                        <p className="text-sm text-slate-500">
                          Continuous surveillance with low false alarm rates
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-medium">
                          Integration with Access Control
                        </h4>
                        <p className="text-sm text-slate-500">
                          Cross-references camera feeds with access events
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitors" className="mt-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-slate-900 text-white p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">
                      Visitor Management System
                    </h3>
                    <span className="text-sm text-slate-400">
                      Demo Interface
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">
                        Pre-Registered Visitors
                      </h4>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Name</th>
                            <th className="text-left py-2">Host</th>
                            <th className="text-left py-2">Time</th>
                            <th className="text-left py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              name: "Michael Davis",
                              host: "Prof. Johnson",
                              time: "10:30 AM",
                              status: "Approved",
                            },
                            {
                              name: "Sarah Wilson",
                              host: "Dean Smith",
                              time: "11:15 AM",
                              status: "Pending",
                            },
                            {
                              name: "Robert Miller",
                              host: "Dr. Thomas",
                              time: "01:45 PM",
                              status: "Approved",
                            },
                          ].map((visitor, i) => (
                            <tr key={i} className="border-b">
                              <td className="py-2">{visitor.name}</td>
                              <td className="py-2 text-sm text-slate-600">
                                {visitor.host}
                              </td>
                              <td className="py-2 text-sm text-slate-600">
                                {visitor.time}
                              </td>
                              <td className="py-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded ${
                                    visitor.status === "Approved"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {visitor.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-4">Visitor Check-In</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Enter visitor's full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Host/Faculty Member
                          </label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Person to visit"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Purpose of Visit
                          </label>
                          <select className="w-full p-2 border rounded">
                            <option>Meeting</option>
                            <option>Interview</option>
                            <option>Campus Tour</option>
                            <option>Event</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="pt-2">
                          <button className="w-full bg-primary text-white py-2 rounded font-medium">
                            Generate QR Pass
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DemoSection;
