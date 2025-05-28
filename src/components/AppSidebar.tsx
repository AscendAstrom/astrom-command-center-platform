
import { 
  Layers,
  Target,
  Eye,
  Zap,
  Scan,
  Settings,
  Shield,
  LayoutDashboard,
  ChevronRight
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
  { title: "Sources", subtitle: "ASTRO-SCAN", url: "/astro-scan", icon: Scan, color: "text-astrom-blue", bg: "bg-astrom-blue/10" },
  { title: "Modeling", subtitle: "ASTRO-BRICKS", url: "/astro-bricks", icon: Layers, color: "text-astrom-orange", bg: "bg-astrom-orange/10" },
  { title: "Metrics", subtitle: "ASTRO-METRICS", url: "/astro-metrics", icon: Target, color: "text-astrom-green", bg: "bg-astrom-green/10" },
  { title: "Visuals", subtitle: "ASTRO-VIEW", url: "/astro-view", icon: Eye, color: "text-astrom-purple", bg: "bg-astrom-purple/10" },
  { title: "Automation", subtitle: "ASTRO-FLOW", url: "/astro-flow", icon: Zap, color: "text-astrom-pink", bg: "bg-astrom-pink/10" },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings, color: "text-astrom-grey", bg: "bg-astrom-grey/10" },
  { title: "Admin Panel", url: "/admin", icon: Shield, color: "text-astrom-grey", bg: "bg-astrom-grey/10" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path || (path === "/astro-scan" && location.pathname === "/");
  
  const getNavCls = (item: any, active: boolean) => {
    const baseClasses = "group flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden";
    
    if (active) {
      return `${baseClasses} ${item.bg} ${item.color} shadow-lg border border-border/30 hover-glow`;
    }
    
    return `${baseClasses} text-sidebar-foreground hover:${item.bg} hover:${item.color} hover:shadow-md hover-lift`;
  };

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-72"} glass-card border-r border-border/30 transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-4 space-y-6">
        {/* Header */}
        {!collapsed && (
          <div className="px-3 py-2 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 gradient-bg-blue rounded-xl flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-astrom-blue to-astrom-purple bg-clip-text text-transparent">
                ASTROM
              </span>
            </div>
            <p className="text-xs text-muted-foreground opacity-70">
              Healthcare Intelligence Platform
            </p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider mb-4 px-3">
            {!collapsed && "Platform Modules"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls(item, isActive(item.url))}
                    >
                      <div className={`p-2 rounded-xl ${item.bg} ${item.color} flex-shrink-0 transition-all duration-300 group-hover:scale-110`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      {!collapsed && (
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-semibold text-sm truncate">{item.title}</span>
                          <span className="text-xs opacity-70 truncate">{item.subtitle}</span>
                        </div>
                      )}
                      {!collapsed && isActive(item.url) && (
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      )}
                      {/* Active indicator */}
                      {isActive(item.url) && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-transparent via-current to-transparent rounded-r-full"></div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gradient-to-r from-transparent via-border to-transparent my-6" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold text-xs uppercase tracking-wider mb-4 px-3">
            {!collapsed && "System"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {systemItems.map((item, index) => (
                <SidebarMenuItem key={item.title} className="animate-slide-up" style={{ animationDelay: `${(index + navigationItems.length) * 0.1}s` }}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls(item, isActive(item.url))}
                    >
                      <div className={`p-2 rounded-xl ${item.bg} ${item.color} flex-shrink-0 transition-all duration-300 group-hover:scale-110`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      {!collapsed && (
                        <span className="font-semibold text-sm truncate">{item.title}</span>
                      )}
                      {!collapsed && isActive(item.url) && (
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      )}
                      {/* Active indicator */}
                      {isActive(item.url) && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-transparent via-current to-transparent rounded-r-full"></div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto px-3 py-4 glass rounded-2xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-bg-green rounded-xl flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">AI Powered</span>
                <span className="text-xs text-muted-foreground">Healthcare Analytics</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
