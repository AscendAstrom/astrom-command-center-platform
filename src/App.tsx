
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import AstroScan from "./pages/AstroScan";
import AstroBricks from "./pages/AstroBricks";
import AstroMetrics from "./pages/AstroMetrics";
import AstroView from "./pages/AstroView";
import AstroFlow from "./pages/AstroFlow";
import CommandCenter from "./pages/CommandCenter";
import Settings from "./pages/Settings";
import AdminPanel from "./pages/AdminPanel";
import DashboardLayout from "./components/DashboardLayout";

// Create QueryClient inside the component to avoid SSR issues
const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="astrom-ui-theme">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full bg-background">
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/command-center" element={<CommandCenter />} />
                    <Route path="/astro-scan" element={<AstroScan />} />
                    <Route path="/astro-bricks" element={<AstroBricks />} />
                    <Route path="/astro-metrics" element={<AstroMetrics />} />
                    <Route path="/astro-view" element={<AstroView />} />
                    <Route path="/astro-flow" element={<AstroFlow />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/admin" element={<AdminPanel />} />
                  </Routes>
                </DashboardLayout>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
