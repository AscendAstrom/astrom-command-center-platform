import { 
  Layers,
  Target,
  Eye,
  Zap,
  Scan,
  Settings,
  Shield,
  LayoutDashboard,
  ChevronRight,
  Activity,
  Sparkles,
  Command
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
  { 
    title: "Dashboard", 
    subtitle: "OVERVIEW", 
    url: "/dashboard", 
    icon: LayoutDashboard, 
    color: "text-slate-600 dark:text-slate-400", 
    bg: "bg-slate-50 dark:bg-slate-800/50",
    activeBg: "bg-slate-100 dark:bg-slate-700/50",
    iconBg: "bg-gradient-to-br from-slate-500 to-slate-600"
  },
  { 
    title: "Command Center", 
    subtitle: "WORKFLOW", 
    url: "/command-center", 
    icon: Command, 
    color: "text-cyan-600 dark:text-cyan-400", 
    bg: "bg-cyan-50 dark:bg-cyan-950/50",
    activeBg: "bg-cyan-100 dark:bg-cyan-900/30",
    iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-600"
  },
  { 
    title: "Sources", 
    subtitle: "ASTRO-SCAN", 
    url: "/astro-scan", 
    icon: Scan, 
    color: "text-blue-600 dark:text-blue-400", 
    bg: "bg-blue-50 dark:bg-blue-950/50",
    activeBg: "bg-blue-100 dark:bg-blue-900/30",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  { 
    title: "Modeling", 
    subtitle: "ASTRO-BRICKS", 
    url: "/astro-bricks", 
    icon: Layers, 
    color: "text-orange-600 dark:text-orange-400", 
    bg: "bg-orange-50 dark:bg-orange-950/50",
    activeBg: "bg-orange-100 dark:bg-orange-900/30",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-600"
  },
  { 
    title: "Metrics", 
    subtitle: "ASTRO-METRICS", 
    url: "/astro-metrics", 
    icon: Target, 
    color: "text-green-600 dark:text-green-400", 
    bg: "bg-green-50 dark:bg-green-950/50",
    activeBg: "bg-green-100 dark:bg-green-900/30",
    iconBg: "bg-gradient-to-br from-green-500 to-green-600"
  },
  { 
    title: "Visuals", 
    subtitle: "ASTRO-VIEW", 
    url: "/astro-view", 
    icon: Eye, 
    color: "text-purple-600 dark:text-purple-400", 
    bg: "bg-purple-50 dark:bg-purple-950/50",
    activeBg: "bg-purple-100 dark:bg-purple-900/30",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  { 
    title: "Automation", 
    subtitle: "ASTRO-FLOW", 
    url: "/astro-flow", 
    icon: Zap, 
    color: "text-pink-600 dark:text-pink-400", 
    bg: "bg-pink-50 dark:bg-pink-950/50",
    activeBg: "bg-pink-100 dark:bg-pink-900/30",
    iconBg: "bg-gradient-to-br from-pink-500 to-pink-600"
  },
];

const systemItems = [
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings, 
    color: "text-slate-600 dark:text-slate-400", 
    bg: "bg-slate-50 dark:bg-slate-800/50",
    activeBg: "bg-slate-100 dark:bg-slate-700/50",
    iconBg: "bg-gradient-to-br from-slate-500 to-slate-600"
  },
  { 
    title: "Admin Panel", 
    url: "/admin", 
    icon: Shield, 
    color: "text-slate-600 dark:text-slate-400", 
    bg: "bg-slate-50 dark:bg-slate-800/50",
    activeBg: "bg-slate-100 dark:bg-slate-700/50",
    iconBg: "bg-gradient-to-br from-slate-500 to-slate-600"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };
  
  const getNavCls = (item: any, active: boolean) => {
    const baseClasses = "group relative flex items-center w-full p-3 rounded-xl transition-all duration-300 ease-out hover:shadow-sm";
    
    if (active) {
      return `${baseClasses} ${item.activeBg} ${item.color} shadow-sm border border-border/20`;
    }
    
    return `${baseClasses} text-muted-foreground hover:${item.bg} hover:${item.color} hover:shadow-sm`;
  };

  return (
    <Sidebar 
      className="bg-background/95 backdrop-blur-xl border-r border-border/50 transition-all duration-300 min-h-screen"
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col h-full overflow-y-auto">
        {/* Header */}
        {!collapsed && (
          <div className="flex-shrink-0 p-4 mb-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ASTROM
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Intelligence Platform
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Platform Modules */}
        <SidebarGroup className="flex-1 px-3">
          <SidebarGroupLabel className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-wider mb-4 px-2">
            {!collapsed && "PLATFORM MODULES"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
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
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-current/0 via-current to-current/0 rounded-r-full"></div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gradient-to-r from-transparent via-border/50 to-transparent my-4 mx-3" />

        {/* System Section */}
        <SidebarGroup className="flex-shrink-0 px-3">
          <SidebarGroupLabel className="text-muted-foreground/80 font-semibold text-xs uppercase tracking-wider mb-4 px-2">
            {!collapsed && "SYSTEM"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {systemItems.map((item, index) => (
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

        {/* Footer */}
        {!collapsed && (
          <div className="flex-shrink-0 mt-4 mx-3 mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl border border-green-200/50 dark:border-green-800/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">AI Powered</span>
                <span className="text-xs text-green-600/80 dark:text-green-400/80 font-medium">Data Analytics</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
