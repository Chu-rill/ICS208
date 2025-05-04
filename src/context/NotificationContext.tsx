import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  date: Date;
  type: "success" | "warning" | "error" | "info";
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "date" | "isRead">
  ) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
});

export const useNotification = () => useContext(NotificationContext);

// Sample notifications
const generateSampleNotifications = (): Notification[] => {
  return [
    {
      id: "notif1",
      userId: "1", // John Student
      message: "Your Library clearance request has been approved",
      isRead: false,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      type: "success",
    },
    {
      id: "notif2",
      userId: "1", // John Student
      message:
        "Your Department clearance request has been rejected: Missing coursework",
      isRead: true,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      type: "error",
    },
    {
      id: "notif3",
      userId: "2", // Library Admin
      message: "New clearance request from John Student",
      isRead: false,
      date: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      type: "info",
    },
    {
      id: "notif4",
      userId: "3", // Alice Smith
      message: "Your Hostel clearance request is still pending",
      isRead: false,
      date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      type: "warning",
    },
    {
      id: "notif5",
      userId: "4", // Bob Johnson
      message: "Your Bursary clearance request has been approved",
      isRead: true,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      type: "success",
    },
    {
      id: "notif6",
      userId: "2", // Library Admin
      message: "John Student has returned the books. You can approve",
      isRead: false,
      date: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      type: "info",
    },
  ];
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [allNotifications, setAllNotifications] = useState<Notification[]>(
    () => {
      const savedNotifications = localStorage.getItem("notifications");
      return savedNotifications
        ? JSON.parse(savedNotifications)
        : generateSampleNotifications();
    }
  );

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(allNotifications));
  }, [allNotifications]);

  // Filter notifications for current user
  const notifications = currentUser
    ? allNotifications.filter((notif) => notif.userId === currentUser.id)
    : [];

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  // Add notification
  const addNotification = (
    notification: Omit<Notification, "id" | "date" | "isRead">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      date: new Date(),
      isRead: false,
    };

    setAllNotifications((prev) => [newNotification, ...prev]);

    // Show toast notification
    switch (newNotification.type) {
      case "success":
        toast.success(newNotification.message);
        break;
      case "error":
        toast.error(newNotification.message);
        break;
      case "warning":
        toast.warning(newNotification.message);
        break;
      default:
        toast.info(newNotification.message);
        break;
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setAllNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    if (!currentUser) return;

    setAllNotifications((prev) =>
      prev.map((notif) =>
        notif.userId === currentUser.id ? { ...notif, isRead: true } : notif
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
