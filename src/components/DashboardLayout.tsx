
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Activity, Search } from "lucide-react";

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
          
          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* System Status */}
            <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce-subtle shadow-sm"></div>
              <span className="text-sm text-muted-foreground font-medium">System Operational</span>
              <Activity className="h-3 w-3 text-green-500" />
            </div>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover-lift rounded-full h-10 w-10 hover:bg-primary/10"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 text-white text-xs animate-bounce-subtle border-0 shadow-lg">
                3
              </Badge>
            </Button>
            
            {/* User Profile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-10 w-10 hover-lift hover:bg-primary/10 border border-border/30"
            >
              <User className="h-4 w-4" />
            </Button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/20 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
