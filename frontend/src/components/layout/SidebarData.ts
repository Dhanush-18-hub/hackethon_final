import {
  Home,
  MessageSquare,
  FileText,
  Share2,
  CheckSquare,
  BarChart3,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Home",
    icon: Home,
    path: "/dashboard/home",
  },
  {
    title: "Ask Brain",
    icon: MessageSquare,
    path: "/dashboard/askbrain",
  },
  {
    title: "Documents",
    icon: FileText,
    path: "/dashboard/documents",
  },
  {
    title: "Knowledge Graph",
    icon: Share2,
    path: "/dashboard/knowledge",
  },
  {
    title: "AI Agents",
    icon: CheckSquare,
    path: "/dashboard/tasks",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/dashboard/analytics",
  },
  {
    title: "Admin",
    icon: Shield,
    path: "/dashboard/admin",
  },
];
