
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
import { NavigationItem } from "./types";
import { useSidebarHelpers } from "./useSidebarHelpers";

interface NavigationSectionProps {
  items: NavigationItem[];
  collapsed: boolean;
  title: string;
}

const NavigationSection = ({ items, collapsed, title }: NavigationSectionProps) => {
  const { isActive, getNavCls } = useSidebarHelpers();

  return (
    <SidebarGroup className="flex-1 px-3">
      <SidebarGroupLabel className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-wider mb-4 px-2">
        {!collapsed && title}
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
                  <div className={`p-3 rounded-xl ${item.iconBg} shadow-sm flex-shrink-0 transition-all duration-300 group-hover:scale-105`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  {!collapsed && (
                    <div className="flex flex-col flex-1 min-w-0 ml-3">
                      <span className="font-semibold text-sm leading-tight">{item.title}</span>
                      {item.subtitle && (
                        <span className="text-xs opacity-75 font-medium">{item.subtitle}</span>
                      )}
                    </div>
                  )}
                  {!collapsed && isActive(item.url) && (
                    <div className="flex items-center flex-shrink-0 mr-2">
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </div>
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

export default NavigationSection;
