import { useState } from "react";
import Navbar from "../components/Navbar";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Shield,
  Bell,
  // Camera,
  Users,
  CreditCard,
  Smartphone,
  AlertTriangle,
  Fingerprint,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Dashboard = () => {
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const recentAccessEvents = [
    {
      time: "09:45:32",
      user: "John Smith (ID: 56782)",
      action: "Entered through Main Gate",
      status: "Authorized",
      method: "Fingerprint",
    },
    {
      time: "09:43:18",
      user: "Emily Johnson (ID: 78945)",
      action: "Entered through North Gate",
      status: "Authorized",
      method: "Smart Card",
    },
    {
      time: "09:41:05",
      user: "Unknown Person",
      action: "Attempted access at East Gate",
      status: "Unauthorized",
      method: "Attempted Card Use",
    },
    {
      time: "09:38:56",
      user: "David Williams (ID: 34521)",
      action: "Entered through Main Gate",
      status: "Authorized",
      method: "Face Recognition",
    },
    {
      time: "09:37:22",
      user: "Sarah Brown (ID: 67890)",
      action: "Entered through South Gate",
      status: "Authorized",
      method: "Mobile App",
    },
    {
      time: "09:35:47",
      user: "Robert Garcia (ID: 12378)",
      action: "Exited through Main Gate",
      status: "Authorized",
      method: "Smart Card",
    },
    {
      time: "09:32:30",
      user: "Michael Taylor (ID: 45692)",
      action: "Entered through West Gate",
      status: "Authorized",
      method: "Fingerprint",
    },
    {
      time: "09:30:15",
      user: "Unknown Person",
      action: "Attempted access at Main Gate",
      status: "Unauthorized",
      method: "Invalid Credentials",
    },
  ];

  const activeAlerts = [
    {
      type: "Tailgating Detected",
      location: "Science Building Entrance",
      time: "09:41:12",
      severity: "High",
    },
    {
      type: "Multiple Failed Access Attempts",
      location: "Library East Door",
      time: "09:38:45",
      severity: "Medium",
    },
    {
      type: "Camera 12 Offline",
      location: "Parking Lot B",
      time: "09:22:30",
      severity: "Low",
    },
    {
      type: "Unauthorized Access Attempt",
      location: "Admin Building Rear",
      time: "09:15:56",
      severity: "High",
    },
  ];

  const visitors = [
    {
      name: "James Wilson",
      host: "Prof. Anderson",
      purpose: "Meeting",
      arrivalTime: "09:30 AM",
      status: "Checked In",
    },
    {
      name: "Maria Rodriguez",
      host: "Dean Thompson",
      purpose: "Interview",
      arrivalTime: "10:00 AM",
      status: "Expected",
    },
    {
      name: "Thomas Campbell",
      host: "Dr. Richards",
      purpose: "Campus Tour",
      arrivalTime: "10:15 AM",
      status: "Expected",
    },
    {
      name: "Lisa Taylor",
      host: "Ms. Martinez",
      purpose: "Event",
      arrivalTime: "08:45 AM",
      status: "Checked In",
    },
    {
      name: "Robert Johnson",
      host: "Prof. Lewis",
      purpose: "Meeting",
      arrivalTime: "11:30 AM",
      status: "Expected",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow px-4 md:px-6 py-8">
        <div className="container">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold">
                Security Dashboard
              </h1>
              <p className="text-slate-500">Demo Interface • {currentDate}</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Bell className="w-4 h-4" />
                Alerts
                <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  4
                </span>
              </Button>
              <Button variant="default" size="sm">
                Generate Report
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 flex items-center">
                <Shield className="h-10 w-10 text-green-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Authorized Access
                  </p>
                  <p className="text-2xl font-bold">1,254</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 flex items-center">
                <AlertTriangle className="h-10 w-10 text-red-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">Unauthorized</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 flex items-center">
                <Users className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Visitors Today
                  </p>
                  <p className="text-2xl font-bold">87</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-4 flex items-center">
                <Bell className="h-10 w-10 text-amber-500 mr-4" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="bg-white border shadow-sm">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
              <TabsTrigger value="visitors">Visitor Management</TabsTrigger>
              <TabsTrigger value="stats">System Status</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="border-b bg-slate-50">
                  <CardTitle className="text-lg">Access Events</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 text-left">
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Time
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Individual
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Action
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Method
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAccessEvents.map((event, i) => (
                          <tr key={i} className="border-t hover:bg-slate-50">
                            <td className="py-3 px-4 text-sm">{event.time}</td>
                            <td className="py-3 px-4">{event.user}</td>
                            <td className="py-3 px-4 text-sm">
                              {event.action}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {event.method}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  event.status === "Authorized"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {event.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="border-b bg-slate-50">
                  <CardTitle className="text-lg">Security Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeAlerts.map((alert, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.severity === "High"
                            ? "border-l-red-500 bg-red-50"
                            : alert.severity === "Medium"
                            ? "border-l-amber-500 bg-amber-50"
                            : "border-l-blue-500 bg-blue-50"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{alert.type}</h3>
                            <p className="text-sm text-slate-600">
                              {alert.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                alert.severity === "High"
                                  ? "bg-red-200 text-red-800"
                                  : alert.severity === "Medium"
                                  ? "bg-amber-200 text-amber-800"
                                  : "bg-blue-200 text-blue-800"
                              }`}
                            >
                              {alert.severity}
                            </span>
                            <p className="text-xs text-slate-500 mt-1">
                              {alert.time}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="default">
                            Investigate
                          </Button>
                          <Button size="sm" variant="outline">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visitors">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-sm bg-white md:col-span-2">
                  <CardHeader className="border-b bg-slate-50">
                    <CardTitle className="text-lg">Today's Visitors</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 text-left">
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Visitor
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Host
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Purpose
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Time
                          </th>
                          <th className="py-3 px-4 text-sm font-medium text-slate-500">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitors.map((visitor, i) => (
                          <tr key={i} className="border-t hover:bg-slate-50">
                            <td className="py-3 px-4">{visitor.name}</td>
                            <td className="py-3 px-4 text-sm">
                              {visitor.host}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {visitor.purpose}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {visitor.arrivalTime}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  visitor.status === "Checked In"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {visitor.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="border-b bg-slate-50">
                    <CardTitle className="text-lg">
                      New Visitor Registration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Visitor Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Host
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Faculty member to visit"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Purpose
                        </label>
                        <select className="w-full p-2 border rounded">
                          <option>Meeting</option>
                          <option>Interview</option>
                          <option>Campus Tour</option>
                          <option>Event</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Arrival Time
                        </label>
                        <input
                          type="time"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <Button className="w-full">Register Visitor</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="border-b bg-slate-50">
                    <CardTitle className="text-lg">System Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Biometric System
                          </span>
                          <span className="text-xs text-green-600">
                            Operational
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: "98%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          98% Uptime
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Smart Card Readers
                          </span>
                          <span className="text-xs text-green-600">
                            Operational
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          100% Uptime
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            AI Surveillance
                          </span>
                          <span className="text-xs text-amber-600">
                            Partial Issues
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          92% Uptime - Camera 12 offline
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Mobile Access App
                          </span>
                          <span className="text-xs text-green-600">
                            Operational
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: "99%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          99% Uptime
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Visitor Management
                          </span>
                          <span className="text-xs text-green-600">
                            Operational
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          100% Uptime
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader className="border-b bg-slate-50">
                    <CardTitle className="text-lg">
                      Access Method Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-6 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Fingerprint className="w-5 h-5 text-blue-500 mr-3" />
                          <span>Biometric Authentication</span>
                        </div>
                        <span className="font-medium">42%</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 text-green-500 mr-3" />
                          <span>Smart ID Cards</span>
                        </div>
                        <span className="font-medium">35%</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Smartphone className="w-5 h-5 text-purple-500 mr-3" />
                          <span>Mobile App Access</span>
                        </div>
                        <span className="font-medium">18%</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-amber-500 mr-3" />
                          <span>Visitor QR Codes</span>
                        </div>
                        <span className="font-medium">5%</span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-medium text-sm mb-2">
                        System Performance
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-green-500">
                            99.8%
                          </p>
                          <p className="text-xs text-slate-500">
                            System Uptime
                          </p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-blue-500">
                            0.3s
                          </p>
                          <p className="text-xs text-slate-500">
                            Avg. Response Time
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
