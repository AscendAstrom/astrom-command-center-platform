
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import DashboardHeader from "./layout/DashboardHeader";
import { AIAssistant } from "@/components/ai/AIAssistant";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [context, setContext] = useState('DEFAULT');

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/astroscan')) {
      setContext('ASTRO_SCAN');
    } else if (path.includes('/astroflow')) {
      setContext('ASTRO_FLOW');
    } else if (path.includes('/astrometrics')) {
      setContext('ASTRO_METRICS');
    } else if (path.includes('/astroview')) {
      setContext('ASTRO_VIEW');
    } else if (path.includes('/dashboard')) {
      setContext('DASHBOARD');
    } else {
      setContext('DEFAULT');
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </SidebarInset>
      <AIAssistant context={context} />
    </div>
  );
};

export default DashboardLayout;
