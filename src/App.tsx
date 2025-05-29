
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LazyComponentWrapper } from "@/components/LazyComponentWrapper";
import { MetaTags } from "@/components/MetaTags";
import { lazy } from "react";

// Lazy load components for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CommandCenter = lazy(() => import("./pages/CommandCenter"));
const AstroScan = lazy(() => import("./pages/AstroScan"));
const AstroBricks = lazy(() => import("./pages/AstroBricks"));
const AstroMetrics = lazy(() => import("./pages/AstroMetrics"));
const AstroFlow = lazy(() => import("./pages/AstroFlow"));
const AstroView = lazy(() => import("./pages/AstroView"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Settings = lazy(() => import("./pages/Settings"));
const Auth = lazy(() => import("./pages/Auth"));
const AIEcosystem = lazy(() => import("./pages/AIEcosystem"));

import DashboardLayout from "./components/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <AuthProvider>
            <Router>
              <MetaTags />
              <Routes>
                <Route path="/auth" element={
                  <LazyComponentWrapper>
                    <Auth />
                  </LazyComponentWrapper>
                } />
                <Route path="/" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <Dashboard />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/dashboard" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <Dashboard />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/command-center" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <CommandCenter />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/astro-scan" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <AstroScan />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/astro-bricks" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <AstroBricks />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/astro-metrics" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <AstroMetrics />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/astro-flow" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <AstroFlow />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/astro-view" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <AstroView />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/ai-ecosystem" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <AIEcosystem />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/admin" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <AdminPanel />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
                <Route path="/settings" element={
                  <AuthGuard>
                    <SidebarProvider>
                      <DashboardLayout>
                        <LazyComponentWrapper>
                          <Settings />
                        </LazyComponentWrapper>
                      </DashboardLayout>
                    </SidebarProvider>
                  </AuthGuard>
                } />
              </Routes>
              <Toaster />
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
