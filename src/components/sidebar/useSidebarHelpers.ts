
import { useLocation } from "react-router-dom";
import { NavigationItem, SystemItem } from "./types";

export const useSidebarHelpers = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };
  
  const getNavCls = (item: NavigationItem | SystemItem, active: boolean) => {
    const baseClasses = "group relative flex items-center w-full p-3 rounded-xl transition-all duration-300 ease-out hover:shadow-sm";
    
    if (active) {
      return `${baseClasses} ${item.activeBg} ${item.color} shadow-sm border border-border/20`;
    }
    
    return `${baseClasses} text-muted-foreground hover:${item.bg} hover:${item.color} hover:shadow-sm`;
  };

  return { isActive, getNavCls };
};
