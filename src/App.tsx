
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "./components/DashboardLayout";
import CommandCenter from "./pages/CommandCenter";
import TenantAdmin from "./pages/TenantAdmin";
import DataSources from "./pages/DataSources";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-slate-950">
            <Routes>
              <Route path="/" element={
                <DashboardLayout>
                  <CommandCenter />
                </DashboardLayout>
              } />
              <Route path="/admin" element={
                <DashboardLayout>
                  <TenantAdmin />
                </DashboardLayout>
              } />
              <Route path="/data-sources" element={
                <DashboardLayout>
                  <DataSources />
                </DashboardLayout>
              } />
              <Route path="/analytics" element={
                <DashboardLayout>
                  <Analytics />
                </DashboardLayout>
              } />
              <Route path="/automation" element={
                <DashboardLayout>
                  <Automation />
                </DashboardLayout>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
