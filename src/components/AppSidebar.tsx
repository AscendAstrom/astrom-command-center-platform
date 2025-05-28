
import { 
  BarChart3, 
  Database, 
  Settings, 
  Zap, 
  Activity,
  Building2,
  Users,
  Bell,
  Scan,
  Layers,
  Target,
  Eye
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
  { title: "Command Center", url: "/", icon: Activity },
  { title: "ASTRO-SCAN", url: "/astro-scan", icon: Scan },
  { title: "ASTRO-BRICKS", url: "/astro-bricks", icon: Layers },
  { title: "ASTRO-METRICS", url: "/astro-metrics", icon: Target },
  { title: "ASTRO-VIEW", url: "/astro-view", icon: Eye },
  { title: "Data Sources", url: "/data-sources", icon: Database },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Automation", url: "/automation", icon: Zap },
  { title: "Tenant Admin", url: "/admin", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
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
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel className="text-slate-400 font-semibold">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                <button className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-slate-300">Add Facility</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-300">Manage Users</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-slate-300">View Alerts</span>
                  </div>
                </button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
