import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";

interface DonationScheduleCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  isUpcoming: boolean;
}

export function DonationScheduleCard({
  title,
  date,
  time,
  location,
  isUpcoming,
}: DonationScheduleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>
          {isUpcoming ? "Upcoming Donation" : "Recent Donation"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#D11B2F]" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#D11B2F]" />
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#D11B2F]" />
          <span className="text-sm">{location}</span>
        </div>
      </CardContent>
      <CardFooter>
        {isUpcoming ? (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
            <Button
              variant="default"
              className="flex-1 bg-[#D11B2F] hover:bg-[#A71526]"
            >
              Confirm
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            className="w-full bg-[#D11B2F]  hover:bg-[#A71526]"
          >
            Schedule Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default DonationScheduleCard;
