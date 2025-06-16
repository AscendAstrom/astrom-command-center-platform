
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AstroScanPage from "./pages/AstroScan";
import AstroBricksPage from "./pages/AstroBricks";
import AstroMetricsPage from "./pages/AstroMetrics";
import AstroFlowPage from "./pages/AstroFlow";
import AstroViewPage from "./pages/AstroView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/astro-scan" element={<AstroScanPage />} />
          <Route path="/astro-bricks" element={<AstroBricksPage />} />
          <Route path="/astro-metrics" element={<AstroMetricsPage />} />
          <Route path="/astro-flow" element={<AstroFlowPage />} />
          <Route path="/astro-view" element={<AstroViewPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
