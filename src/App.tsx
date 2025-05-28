
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import AstroScan from "./pages/AstroScan";
import AstroBricks from "./pages/AstroBricks";
import AstroMetrics from "./pages/AstroMetrics";
import AstroView from "./pages/AstroView";
import AstroFlow from "./pages/AstroFlow";
import DashboardLayout from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="astrom-ui-theme">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<AstroScan />} />
                  <Route path="/astro-scan" element={<AstroScan />} />
                  <Route path="/astro-bricks" element={<AstroBricks />} />
                  <Route path="/astro-metrics" element={<AstroMetrics />} />
                  <Route path="/astro-view" element={<AstroView />} />
                  <Route path="/astro-flow" element={<AstroFlow />} />
                </Routes>
              </DashboardLayout>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
