import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Calendar } from "lucide-react";
import { Badge } from "../components/ui/badge";

const Profile = () => {
  // Demo data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://github.com/shadcn.png",
    bloodType: "A+",
    lastDonation: "2024-08-15",
    totalDonations: 7,
  };

  const bloodTypeColors = {
    "A+": "bg-red-100 text-red-800",
    "B-": "bg-blue-100 text-blue-800",
    "O+": "bg-orange-100 text-orange-800",
    "AB+": "bg-purple-100 text-purple-800",
    "O-": "bg-gray-100 text-gray-800",
    "A-": "bg-yellow-100 text-yellow-800",
    "B+": "bg-green-100 text-green-800",
    "AB-": "bg-pink-100 text-pink-800",
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="font-semibold">Blood Type</div>
            <div className="text-muted-foreground">
              <Badge className={bloodTypeColors[user.bloodType]}>
                {user.bloodType}
              </Badge>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="font-semibold">Last Donation</div>
            <div className="text-muted-foreground flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {user.lastDonation}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="font-semibold">Total Donations</div>
            <div className="text-muted-foreground">{user.totalDonations}</div>
          </div>

          <Button className="flex-1 bg-[#D11B2F] hover:bg-[#A71526] cursor-pointer">
            Update Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
