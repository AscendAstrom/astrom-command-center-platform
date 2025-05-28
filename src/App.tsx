
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider"
import Dashboard from "./pages/Dashboard";
import CommandCenter from "./pages/CommandCenter";
import AstroScan from "./pages/AstroScan";
import AstroBricks from "./pages/AstroBricks";
import AstroMetrics from "./pages/AstroMetrics";
import AstroFlow from "./pages/AstroFlow";
import AstroView from "./pages/AstroView";
import AdminPanel from "./pages/AdminPanel";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster"
import AIEcosystem from "./pages/AIEcosystem";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<SidebarProvider><DashboardLayout><Dashboard /></DashboardLayout></SidebarProvider>} />
          <Route path="/dashboard" element={<SidebarProvider><DashboardLayout><Dashboard /></DashboardLayout></SidebarProvider>} />
          <Route path="/command-center" element={<SidebarProvider><DashboardLayout><CommandCenter /></DashboardLayout></SidebarProvider>} />
          <Route path="/astro-scan" element={<SidebarProvider><DashboardLayout><AstroScan /></DashboardLayout></SidebarProvider>} />
          <Route path="/astro-bricks" element={<SidebarProvider><DashboardLayout><AstroBricks /></DashboardLayout></SidebarProvider>} />
          <Route path="/astro-metrics" element={<SidebarProvider><DashboardLayout><AstroMetrics /></DashboardLayout></SidebarProvider>} />
          <Route path="/astro-flow" element={<SidebarProvider><DashboardLayout><AstroFlow /></DashboardLayout></SidebarProvider>} />
          <Route path="/astro-view" element={<SidebarProvider><DashboardLayout><AstroView /></DashboardLayout></SidebarProvider>} />
          <Route path="/ai-ecosystem" element={<SidebarProvider><DashboardLayout><AIEcosystem /></DashboardLayout></SidebarProvider>} />
          <Route path="/admin" element={<SidebarProvider><DashboardLayout><AdminPanel /></DashboardLayout></SidebarProvider>} />
          <Route path="/settings" element={<SidebarProvider><DashboardLayout><Settings /></DashboardLayout></SidebarProvider>} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
