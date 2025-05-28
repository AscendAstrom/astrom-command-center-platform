
import { 
  Layers,
  Target,
  Eye,
  Zap,
  Scan,
  Settings,
  Shield,
  LayoutDashboard
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Sources", subtitle: "ASTRO-SCAN", url: "/astro-scan", icon: Scan },
  { title: "Modeling", subtitle: "ASTRO-BRICKS", url: "/astro-bricks", icon: Layers },
  { title: "Metrics", subtitle: "ASTRO-METRICS", url: "/astro-metrics", icon: Target },
  { title: "Visuals", subtitle: "ASTRO-VIEW", url: "/astro-view", icon: Eye },
  { title: "Automation", subtitle: "ASTRO-FLOW", url: "/astro-flow", icon: Zap },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Admin Panel", url: "/admin", icon: Shield },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path || (path === "/astro-scan" && location.pathname === "/");
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-astrom-blue/20 text-astrom-blue border-r-2 border-astrom-blue shadow-sm" 
      : "text-sidebar-foreground hover:text-astrom-blue hover:bg-sidebar-accent transition-all duration-200";

  return (
    <Sidebar 
      className={`${collapsed ? "w-14" : "w-64"} bg-sidebar-background border-r border-sidebar-border`} 
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider">
            {!collapsed && "ASTROM Platform"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive: navIsActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${getNavCls({ isActive: isActive(item.url) })}`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{item.title}</span>
                          <span className="text-xs opacity-70">{item.subtitle}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-sidebar-border my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider">
            {!collapsed && "System"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive: navIsActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${getNavCls({ isActive: isActive(item.url) })}`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
