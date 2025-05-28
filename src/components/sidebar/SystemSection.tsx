
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SystemItem } from "./types";
import { useSidebarHelpers } from "./useSidebarHelpers";

interface SystemSectionProps {
  items: SystemItem[];
  collapsed: boolean;
}

const SystemSection = ({ items, collapsed }: SystemSectionProps) => {
  const { isActive, getNavCls } = useSidebarHelpers();

  return (
    <SidebarGroup className="flex-shrink-0 px-3">
      <SidebarGroupLabel className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-wider mb-4 px-2">
        {!collapsed && "SYSTEM"}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-auto p-0">
                <NavLink 
                  to={item.url} 
                  end 
                  className={getNavCls(item, isActive(item.url))}
                >
                  <div className={`p-4 rounded-xl ${item.iconBg} shadow-sm flex-shrink-0 transition-all duration-300 group-hover:scale-105`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  {!collapsed && (
                    <span className="font-semibold text-sm flex-1 min-w-0 ml-3">{item.title}</span>
                  )}
                  {!collapsed && isActive(item.url) && (
                    <ChevronRight className="h-4 w-4 opacity-60 flex-shrink-0 mr-2" />
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
};

export default SystemSection;
