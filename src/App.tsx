
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MarketAnalysis from "./pages/MarketAnalysis";
import RiskScoring from "./pages/RiskScoring";
import ProjectStatus from "./pages/ProjectStatus";
import Reports from "./pages/Reports";
import ChatAssistant from "./pages/ChatAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="risk-navigator-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/market-analysis" element={<MarketAnalysis />} />
            <Route path="/risk-scoring" element={<RiskScoring />} />
            <Route path="/project-status" element={<ProjectStatus />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/chat-assistant" element={<ChatAssistant />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
