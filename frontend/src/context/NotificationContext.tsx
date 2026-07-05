import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface NotificationContextProps {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (title: string, description: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "New document indexed",
      description: "Q3 Revenue Operating Plan.pdf was processed.",
      time: "24 min ago",
      read: false,
    },
    {
      id: "notif-2",
      title: "Sync completed",
      description: "Notion workspaces connected successfully.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "notif-3",
      title: "Conflict detected",
      description: "Conflicting remote work policy documents found.",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const addNotification = (title: string, description: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      description,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

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
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
