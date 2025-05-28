
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import DataSources from "./pages/DataSources";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import TenantAdmin from "./pages/TenantAdmin";
import AstroScan from "./pages/AstroScan";
import AstroBricks from "./pages/AstroBricks";
import AstroMetrics from "./pages/AstroMetrics";
import AstroView from "./pages/AstroView";
import AstroFlow from "./pages/AstroFlow";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-slate-950">
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/data-sources" element={<DataSources />} />
                <Route path="/astro-scan" element={<AstroScan />} />
                <Route path="/astro-bricks" element={<AstroBricks />} />
                <Route path="/astro-metrics" element={<AstroMetrics />} />
                <Route path="/astro-view" element={<AstroView />} />
                <Route path="/astro-flow" element={<AstroFlow />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/automation" element={<Automation />} />
                <Route path="/admin" element={<TenantAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
