import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      name: "John Doe",
      date: "2024-08-16",
      time: "10:00 AM",
      bloodType: "A+",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2024-08-17",
      time: "02:00 PM",
      bloodType: "B-",
      status: "Pending",
    },
    {
      id: 3,
      name: "Mike Johnson",
      date: "2024-08-18",
      time: "11:00 AM",
      bloodType: "O+",
      status: "Confirmed",
    },
  ];

  const statusColors = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-amber-100 text-amber-800",
  };

  const bloodTypeColors = {
    "A+": "bg-red-100 text-red-800",
    "B-": "bg-blue-100 text-blue-800",
    "O+": "bg-orange-100 text-orange-800",
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Appointments</CardTitle>
          <CardDescription>
            Manage upcoming blood donation appointments.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {appointment.name}
                    </h2>
                    <p className="text-muted-foreground">
                      <Calendar className="mr-2 inline-block h-4 w-4" />
                      {appointment.date} - {appointment.time}
                    </p>
                    <Badge
                      className={`mt-1 ${
                        bloodTypeColors[appointment.bloodType] || ""
                      }`}
                    >
                      {appointment.bloodType}
                    </Badge>
                  </div>
                  <div>
                    <Badge className={statusColors[appointment.status]}>
                      {appointment.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="flex-1 bg-[#D11B2F] hover:bg-[#A71526] cursor-pointer">
            Add Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
