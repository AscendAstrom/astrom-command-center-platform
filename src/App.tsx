
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AstroScanPage from "./pages/AstroScan";
import AstroBricksPage from "./pages/AstroBricks";
import AstroMetricsPage from "./pages/AstroMetrics";
import AstroFlowPage from "./pages/AstroFlow";
import AstroViewPage from "./pages/AstroView";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/index" element={<Index />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/astro-scan"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AstroScanPage />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/astro-bricks"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AstroBricksPage />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/astro-metrics"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AstroMetricsPage />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/astro-flow"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AstroFlowPage />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/astro-view"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AstroViewPage />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
