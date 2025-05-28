
import { 
  Layers,
  Target,
  Eye,
  Zap,
  Scan
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
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "ASTRO-SCAN", url: "/astro-scan", icon: Scan },
  { title: "ASTRO-BRICKS", url: "/astro-bricks", icon: Layers },
  { title: "ASTRO-METRICS", url: "/astro-metrics", icon: Target },
  { title: "ASTRO-VIEW", url: "/astro-view", icon: Eye },
  { title: "ASTRO-FLOW", url: "/astro-flow", icon: Zap },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path || (path === "/astro-scan" && location.pathname === "/");
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-cyan-500/20 text-cyan-400 border-r-2 border-cyan-400" 
      : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50";

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} bg-slate-900 border-r border-slate-800`} collapsible="icon">
      <SidebarContent className="bg-slate-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-semibold">
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
                        getNavCls({ isActive: isActive(item.url) })
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
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
