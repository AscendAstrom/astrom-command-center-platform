
import { ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavigationItem } from "./types";

interface NavigationSectionProps {
  items: NavigationItem[];
}

export function NavigationSection({ items }: NavigationSectionProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };
  
  const getNavCls = (item: NavigationItem, active: boolean) => {
    const baseClasses = "group relative flex items-center w-full rounded-xl transition-all duration-300 ease-out hover:shadow-sm";
    const paddingClasses = collapsed ? "p-2" : "p-3";
    
    if (active) {
      return `${baseClasses} ${paddingClasses} ${item.activeBg} ${item.color} shadow-sm border border-border/20`;
    }
    
    return `${baseClasses} ${paddingClasses} text-muted-foreground hover:${item.bg} hover:${item.color} hover:shadow-sm`;
  };

  return (
    <SidebarGroup className="flex-1 px-3">
      <SidebarGroupLabel className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-wider mb-4 px-2">
        {!collapsed && "PLATFORM MODULES"}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2">
          {items.map((item, index) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-auto p-0">
                <NavLink 
                  to={item.url} 
                  end 
                  className={getNavCls(item, isActive(item.url))}
                >
                  <div className={`${collapsed ? 'w-10 h-10' : 'w-10 h-10'} rounded-xl ${item.iconBg} shadow-sm flex-shrink-0 transition-all duration-300 group-hover:scale-105 flex items-center justify-center`}>
                    <item.icon className={`${collapsed ? 'h-5 w-5' : 'h-5 w-5'} text-white`} />
                  </div>
                  {!collapsed && (
                    <div className="flex flex-col flex-1 min-w-0 ml-3">
                      <span className="font-semibold text-sm leading-tight">{item.title}</span>
                      <span className="text-xs opacity-75 font-medium">{item.subtitle}</span>
                    </div>
                  )}
                  {!collapsed && isActive(item.url) && (
                    <div className="flex items-center flex-shrink-0 mr-2">
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </div>
                  )}
                  {/* Active indicator */}
                  {isActive(item.url) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-current/0 via-current to-current/0 rounded-r-full"></div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
