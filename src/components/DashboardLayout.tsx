
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Bell } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm surface-elevated flex items-center px-6">
          <SidebarTrigger className="mr-4 text-primary hover:text-primary/80 transition-colors" />
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-astrom-blue to-astrom-green rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-lg">
              A
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">ASTROM</h1>
              <span className="text-xs text-astrom-blue font-medium">Healthcare Intelligence Platform</span>
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-astrom-green rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">System Operational</span>
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-astrom-orange text-white text-xs">
                3
              </Badge>
            </Button>
            
            {/* User Profile */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
            </Button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
