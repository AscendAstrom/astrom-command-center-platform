
import { 
  Layers,
  Target,
  Eye,
  Zap,
  Scan,
  Settings,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import { NavigationItem, SystemItem } from "./types";

export const navigationItems: NavigationItem[] = [
  { 
    title: "Dashboard", 
    subtitle: "HOSPITAL VIEW", 
    url: "/dashboard", 
    icon: LayoutDashboard, 
    color: "text-slate-600 dark:text-slate-400", 
    bg: "bg-slate-50 dark:bg-slate-800/50",
    activeBg: "bg-slate-100 dark:bg-slate-700/50",
    iconBg: "bg-gradient-to-br from-slate-500 to-slate-600"
  },
  { 
    title: "Sources", 
    subtitle: "ASTRO-SCAN", 
    url: "/astro-scan", 
    icon: Scan, 
    color: "text-blue-600 dark:text-blue-400", 
    bg: "bg-blue-50 dark:bg-blue-950/50",
    activeBg: "bg-blue-100 dark:bg-blue-900/30",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  { 
    title: "Modeling", 
    subtitle: "ASTRO-BRICKS", 
    url: "/astro-bricks", 
    icon: Layers, 
    color: "text-orange-600 dark:text-orange-400", 
    bg: "bg-orange-50 dark:bg-orange-950/50",
    activeBg: "bg-orange-100 dark:bg-orange-900/30",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600"
  },
  { 
    title: "Metrics", 
    subtitle: "ASTRO-METRICS", 
    url: "/astro-metrics", 
    icon: Target, 
    color: "text-green-600 dark:text-green-400", 
    bg: "bg-green-50 dark:bg-green-950/50",
    activeBg: "bg-green-100 dark:bg-green-900/30",
    iconBg: "bg-gradient-to-br from-green-500 to-green-600"
  },
  { 
    title: "Visuals", 
    subtitle: "ASTRO-VIEW", 
    url: "/astro-view", 
    icon: Eye, 
    color: "text-purple-600 dark:text-purple-400", 
    bg: "bg-purple-50 dark:bg-purple-950/50",
    activeBg: "bg-purple-100 dark:bg-purple-900/30",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  { 
    title: "Automation", 
    subtitle: "ASTRO-FLOW", 
    url: "/astro-flow", 
    icon: Zap, 
    color: "text-pink-600 dark:text-pink-400", 
    bg: "bg-pink-50 dark:bg-pink-950/50",
    activeBg: "bg-pink-100 dark:bg-pink-900/30",
    iconBg: "bg-gradient-to-br from-pink-500 to-pink-600"
  },
];

export const systemItems: SystemItem[] = [
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings, 
    color: "text-slate-600 dark:text-slate-400", 
    bg: "bg-slate-50 dark:bg-slate-800/50",
    activeBg: "bg-slate-100 dark:bg-slate-700/50",
    iconBg: "bg-gradient-to-br from-slate-500 to-slate-600"
  },
  { 
    title: "Admin Panel", 
    url: "/admin", 
    icon: Shield, 
    color: "text-slate-600 dark:text-slate-400", 
    bg: "bg-slate-50 dark:bg-slate-800/50",
    activeBg: "bg-slate-100 dark:bg-slate-700/50",
    iconBg: "bg-gradient-to-br from-slate-500 to-slate-600"
  },
];
