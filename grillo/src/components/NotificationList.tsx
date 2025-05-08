import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Bell, Users, Calendar, AlertCircle } from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "request" | "appointment" | "general";
  message: string;
  time: string;
  isRead: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    message: "Critical blood level for type O-",
    time: "10 minutes ago",
    isRead: false,
  },
  {
    id: "2",
    type: "request",
    message: "New blood request from Central Hospital",
    time: "1 hour ago",
    isRead: false,
  },
  {
    id: "3",
    type: "appointment",
    message: "Your donation appointment is tomorrow at 10:00 AM",
    time: "3 hours ago",
    isRead: true,
  },
  {
    id: "4",
    type: "general",
    message: "Thank you for your recent donation!",
    time: "Yesterday",
    isRead: true,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "alert":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case "request":
      return <Users className="h-4 w-4 text-blue-500" />;
    case "appointment":
      return <Calendar className="h-4 w-4 text-green-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

export function NotificationList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>Recent alerts and messages</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-[#D11B2F]">
          Mark all as read
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 p-3 rounded-md ${
              !notification.isRead ? "bg-[#FDE1E3]" : "bg-card"
            }`}
          >
            <div className="mt-0.5">{getIcon(notification.type)}</div>
            <div className="flex-1">
              <p
                className={`text-sm ${
                  !notification.isRead ? "font-medium" : ""
                }`}
              >
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {notification.time}
              </p>
            </div>
            {!notification.isRead && (
              <div className="h-2 w-2 rounded-full bg-[#D11B2F]"></div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default NotificationList;
