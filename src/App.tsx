
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AstroScan from "./pages/AstroScan";
import AstroFlow from "./pages/AstroFlow";
import AstroView from "./pages/AstroView";
import AstroWorkflow from "./pages/AstroWorkflow";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/astro-scan" element={<AstroScan />} />
            <Route path="/astro-flow" element={<AstroFlow />} />
            <Route path="/astro-view" element={<AstroView />} />
            <Route path="/astro-workflow" element={<AstroWorkflow />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
