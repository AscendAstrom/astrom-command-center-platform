
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Bell, Zap, Activity } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-border/50 glass-card sticky top-0 z-50 flex items-center px-6 animate-fade-in">
          <SidebarTrigger className="mr-4 text-primary hover:text-primary/80 transition-all duration-200 hover:scale-110" />
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg-blue rounded-2xl flex items-center justify-center font-bold text-white text-sm shadow-lg hover-glow transition-all duration-300 animate-pulse-glow">
              <Zap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-astrom-blue to-astrom-purple bg-clip-text text-transparent">
                ASTROM
              </h1>
              <span className="text-xs text-astrom-blue font-medium opacity-80">
                Healthcare Intelligence Platform
              </span>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-astrom-green rounded-full animate-bounce-subtle shadow-sm"></div>
              <span className="text-sm text-muted-foreground font-medium">System Operational</span>
              <Activity className="h-3 w-3 text-astrom-green" />
            </div>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover-lift rounded-full h-10 w-10 hover:bg-astrom-blue/10"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 gradient-bg-orange text-white text-xs animate-bounce-subtle border-0 shadow-lg">
                3
              </Badge>
            </Button>
            
            {/* User Profile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10 hover-lift hover:bg-astrom-purple/10 border border-border/30"
            >
              <User className="h-4 w-4" />
            </Button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-astrom-surface relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--astrom-blue))_1px,_transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
