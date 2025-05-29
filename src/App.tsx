
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import AstroScan from "@/pages/AstroScan";
import AstroBricks from "@/pages/AstroBricks";
import AstroMetrics from "@/pages/AstroMetrics";
import AstroView from "@/pages/AstroView";
import AstroFlow from "@/pages/AstroFlow";
import AIEcosystem from "@/pages/AIEcosystem";
import CommandCenter from "@/pages/CommandCenter";
import AdminPanel from "@/pages/AdminPanel";
import ProductionAudit from "@/pages/ProductionAudit";
import Settings from "@/pages/Settings";
import Auth from "@/pages/Auth";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="astrom-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<DashboardLayout><Outlet /></DashboardLayout>}>
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
              <Route path="production-audit" element={<ProductionAudit />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
