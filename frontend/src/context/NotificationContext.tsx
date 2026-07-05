import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface ActiveToast {
  id: string;
  title: string;
  description: string;
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

  const [activeToasts, setActiveToasts] = useState<ActiveToast[]>([]);

  const addNotification = (title: string, description: string) => {
    const id = `notif-${Date.now()}`;
    const newNotif: NotificationItem = {
      id,
      title,
      description,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Push to toast notifications
    const newToast = { id, title, description };
    setActiveToasts((prev) => [...prev, newToast]);

    // Dismiss exactly after 1 second (1000ms)
    setTimeout(() => {
      setActiveToasts((prev) => prev.filter((t) => t.id !== id));
    }, 1000);
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

      {/* Floating Toast Popups Overlay */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {activeToasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 35, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto flex max-w-sm items-start gap-4 rounded-2xl border border-violet-500/20 bg-[#0d0d16]/95 p-4 shadow-2xl backdrop-blur-md shadow-violet-950/20"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600/25 text-violet-300">
                <Bell size={18} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white leading-5">{toast.title}</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-normal">{toast.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
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
