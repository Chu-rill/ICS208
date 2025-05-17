import {
  Activity,
  CalendarCheck,
  // Droplets,
  HeartHandshake,
  Users,
} from "lucide-react";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import BloodTypeCard from "../components/BloodTypeCard";
import DonationScheduleCard from "../components/DonationScheduleCard";
import BloodUsageChart from "../components/BloodUsageChart";
import NotificationList from "../components/NotificationList";

export function Dashboard() {
  const bloodInventory = [
    { type: "A+", quantity: 120, status: "high" as const },
    { type: "A-", quantity: 45, status: "medium" as const },
    { type: "B+", quantity: 78, status: "medium" as const },
    { type: "B-", quantity: 18, status: "low" as const },
    { type: "AB+", quantity: 36, status: "medium" as const },
    { type: "AB-", quantity: 8, status: "critical" as const },
    { type: "O+", quantity: 96, status: "high" as const },
    { type: "O-", quantity: 12, status: "critical" as const },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header title="Dashboard" />

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatsCard
            title="Total Donors"
            value={2584}
            description="Active donors in the system"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Donations This Month"
            value={315}
            description="Units of blood collected"
            icon={HeartHandshake}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Upcoming Appointments"
            value={48}
            description="Scheduled for next 7 days"
            icon={CalendarCheck}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Urgent Requests"
            value={7}
            description="Critical blood types needed"
            icon={Activity}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        <div className="grid gap-4 md:gap-6 mb-6">
          <h2 className="text-xl font-bold">Blood Inventory Status</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {bloodInventory.map((blood) => (
              <BloodTypeCard
                key={blood.type}
                bloodType={blood.type}
                quantity={blood.quantity}
                status={blood.status}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="col-span-1">
            <div className="grid gap-4">
              <h2 className="text-xl font-bold">Your Donations</h2>
              <DonationScheduleCard
                title="Regular Blood Donation"
                date="May 15, 2025"
                time="10:00 AM - 11:00 AM"
                location="Central Blood Bank"
                isUpcoming={true}
              />
              <DonationScheduleCard
                title="Plasma Donation"
                date="March 3, 2025"
                time="2:30 PM - 4:00 PM"
                location="Memorial Hospital"
                isUpcoming={false}
              />
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-4 md:gap-6">
            <BloodUsageChart />
            <NotificationList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
