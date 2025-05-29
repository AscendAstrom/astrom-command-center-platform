
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
import AstroScan from "./pages/AstroScan";
import AstroBricks from "./pages/AstroBricks";
import AstroMetrics from "./pages/AstroMetrics";
import AstroView from "./pages/AstroView";
import AstroFlow from "./pages/AstroFlow";
import AIEcosystem from "./pages/AIEcosystem";
import CommandCenter from "./pages/CommandCenter";
import AdminPanel from "./pages/AdminPanel";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthGuard } from "./components/auth/AuthGuard";
import { ProductionGuard } from "./components/ProductionGuard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <ProductionGuard>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/" element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  } />
                  <Route path="/astro-scan" element={
                    <AuthGuard>
                      <AstroScan />
                    </AuthGuard>
                  } />
                  <Route path="/astro-bricks" element={
                    <AuthGuard>
                      <AstroBricks />
                    </AuthGuard>
                  } />
                  <Route path="/astro-metrics" element={
                    <AuthGuard>
                      <AstroMetrics />
                    </AuthGuard>
                  } />
                  <Route path="/astro-view" element={
                    <AuthGuard>
                      <AstroView />
                    </AuthGuard>
                  } />
                  <Route path="/astro-flow" element={
                    <AuthGuard>
                      <AstroFlow />
                    </AuthGuard>
                  } />
                  <Route path="/ai-ecosystem" element={
                    <AuthGuard>
                      <AIEcosystem />
                    </AuthGuard>
                  } />
                  <Route path="/command-center" element={
                    <AuthGuard>
                      <CommandCenter />
                    </AuthGuard>
                  } />
                  <Route path="/admin" element={
                    <AuthGuard>
                      <AdminPanel />
                    </AuthGuard>
                  } />
                  <Route path="/settings" element={
                    <AuthGuard>
                      <Settings />
                    </AuthGuard>
                  } />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </ProductionGuard>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
