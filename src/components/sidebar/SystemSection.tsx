
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
import { SystemItem } from "./types";

interface SystemSectionProps {
  items: SystemItem[];
}

export function SystemSection({ items }: SystemSectionProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const getNavCls = (item: SystemItem, active: boolean) => {
    if (collapsed) {
      return `group relative flex items-center justify-center w-full p-2 rounded-xl transition-all duration-300 ease-out hover:shadow-sm ${
        active 
          ? `${item.activeBg} ${item.color} shadow-sm border border-border/20`
          : `text-muted-foreground hover:${item.bg} hover:${item.color} hover:shadow-sm`
      }`;
    }
    
    const baseClasses = "group relative flex items-center w-full p-3 rounded-xl transition-all duration-300 ease-out hover:shadow-sm";
    
    if (active) {
      return `${baseClasses} ${item.activeBg} ${item.color} shadow-sm border border-border/20`;
    }
    
    return `${baseClasses} text-muted-foreground hover:${item.bg} hover:${item.color} hover:shadow-sm`;
  };

  return (
    <SidebarGroup className={`flex-shrink-0 ${collapsed ? 'px-1' : 'px-3'}`}>
      <SidebarGroupLabel className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-wider mb-4 px-2">
        {!collapsed && "SYSTEM"}
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
                  {collapsed ? (
                    <div className={`p-2 rounded-lg ${item.iconBg} shadow-sm transition-all duration-300 group-hover:scale-105`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <>
                      <div className={`p-3 rounded-xl ${item.iconBg} shadow-sm flex-shrink-0 transition-all duration-300 group-hover:scale-105`}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-semibold text-sm flex-1 min-w-0 ml-3">{item.title}</span>
                      {isActive(item.url) && (
                        <ChevronRight className="h-4 w-4 opacity-60 flex-shrink-0 mr-2" />
                      )}
                    </>
                  )}
                  {/* Active indicator */}
                  {isActive(item.url) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-current/0 via-current to-current/0 rounded-r-full"></div>
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
