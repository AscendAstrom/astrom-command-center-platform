
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Dashboard from "./pages/Dashboard";
import CommandCenter from "./pages/CommandCenter";
import AstroScan from "./pages/AstroScan";
import AstroBricks from "./pages/AstroBricks";
import AstroMetrics from "./pages/AstroMetrics";
import AstroFlow from "./pages/AstroFlow";
import AstroView from "./pages/AstroView";
import AdminPanel from "./pages/AdminPanel";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import AIEcosystem from "./pages/AIEcosystem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/dashboard" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <Dashboard />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/command-center" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <CommandCenter />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/astro-scan" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <AstroScan />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/astro-bricks" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <AstroBricks />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/astro-metrics" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <AstroMetrics />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/astro-flow" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <AstroFlow />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/astro-view" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <AstroView />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/ai-ecosystem" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <AIEcosystem />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/admin" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <AdminPanel />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
              <Route path="/settings" element={
                <AuthGuard>
                  <SidebarProvider>
                    <DashboardLayout>
                      <Settings />
                    </DashboardLayout>
                  </SidebarProvider>
                </AuthGuard>
              } />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
