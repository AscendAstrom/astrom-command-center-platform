
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import pages
import Dashboard from "@/pages/Dashboard";
import AstroScan from "@/pages/AstroScan";
import AstroBricks from "@/pages/AstroBricks";
import AstroMetrics from "@/pages/AstroMetrics";
import AstroView from "@/pages/AstroView";
import AstroFlow from "@/pages/AstroFlow";
import AIEcosystem from "@/pages/AIEcosystem";
import Auth from "@/pages/Auth";
import Settings from "@/pages/Settings";
import CommandCenter from "@/pages/CommandCenter";
import AdminPanel from "@/pages/AdminPanel";

// Layout
import DashboardLayout from "@/components/DashboardLayout";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="astrom-ui-theme">
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public route */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="astro-scan" element={<AstroScan />} />
                <Route path="astro-bricks" element={<AstroBricks />} />
                <Route path="astro-metrics" element={<AstroMetrics />} />
                <Route path="astro-view" element={<AstroView />} />
                <Route path="astro-flow" element={<AstroFlow />} />
                <Route path="ai-ecosystem" element={<AIEcosystem />} />
                <Route path="command-center" element={<CommandCenter />} />
                <Route path="admin" element={<AdminPanel />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Catch all - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
