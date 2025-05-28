
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  subtitle: string;
  url: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  activeBg: string;
  iconBg: string;
}

export interface SystemItem {
  title: string;
  url: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  activeBg: string;
  iconBg: string;
}
