import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar } from "lucide-react";

// Define types for the bloodType and status values
type BloodType = "A+" | "B-" | "O+";
type DonationStatus = "Completed" | "Pending";

interface Donation {
  id: number;
  donorName: string;
  bloodType: BloodType;
  date: string;
  quantity: string;
  status: DonationStatus;
}

const Donations = () => {
  const donationData: Donation[] = [
    {
      id: 1,
      donorName: "Alice Smith",
      bloodType: "A+",
      date: "2024-08-10",
      quantity: "500ml",
      status: "Completed",
    },
    {
      id: 2,
      donorName: "Bob Johnson",
      bloodType: "B-",
      date: "2024-08-12",
      quantity: "450ml",
      status: "Pending",
    },
    {
      id: 3,
      donorName: "Charlie Brown",
      bloodType: "O+",
      date: "2024-08-15",
      quantity: "520ml",
      status: "Completed",
    },
  ];

  // Add proper type annotations to solve the TS error
  const statusColors: Record<DonationStatus, string> = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-amber-100 text-amber-800",
  };

  const bloodTypeColors: Record<BloodType, string> = {
    "A+": "bg-red-100 text-red-800",
    "B-": "bg-blue-100 text-blue-800",
    "O+": "bg-orange-100 text-orange-800",
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Donations</CardTitle>
          <CardDescription>
            Manage and view blood donation records.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            {donationData.map((donation) => (
              <Card key={donation.id} className="shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {donation.donorName}
                    </h2>
                    <p className="text-muted-foreground">
                      Blood Type:{" "}
                      <Badge className={bloodTypeColors[donation.bloodType]}>
                        {donation.bloodType}
                      </Badge>
                    </p>
                    <p className="text-muted-foreground flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {donation.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="secondary">{donation.quantity}</Badge>
                    <Badge className={`ml-2 ${statusColors[donation.status]}`}>
                      {donation.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="flex-1 bg-[#D11B2F] hover:bg-[#A71526] cursor-pointer">
            Add Donation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Donations;
