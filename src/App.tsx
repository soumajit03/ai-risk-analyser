
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MarketAnalysis from "./pages/MarketAnalysis";
import RiskScoring from "./pages/RiskScoring";
import ProjectStatus from "./pages/ProjectStatus";
import Reports from "./pages/Reports";
import ChatAssistant from "./pages/ChatAssistant";
import SignInPage from "./pages/Auth/SignIn";
import SignUpPage from "./pages/Auth/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { AuthLayout } from "./components/Auth/AuthLayout";
import { useAuth } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const App = () => {
  const { isLoaded, userId } = useAuth();

  // Show loading spinner or skeleton while Clerk is loading
  if (!isLoaded) {
    return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="risk-navigator-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public auth routes */}
              <Route path="/signin" element={!userId ? <SignInPage /> : <Navigate to="/" replace />} />
              <Route path="/signup" element={!userId ? <SignUpPage /> : <Navigate to="/" replace />} />
              
              {/* Protected routes - wrapped in AuthLayout */}
              <Route path="/" element={<AuthLayout><Index /></AuthLayout>} />
              <Route path="/market-analysis" element={<AuthLayout><MarketAnalysis /></AuthLayout>} />
              <Route path="/risk-scoring" element={<AuthLayout><RiskScoring /></AuthLayout>} />
              <Route path="/project-status" element={<AuthLayout><ProjectStatus /></AuthLayout>} />
              <Route path="/reports" element={<AuthLayout><Reports /></AuthLayout>} />
              <Route path="/chat-assistant" element={<AuthLayout><ChatAssistant /></AuthLayout>} />
              <Route path="/profile" element={<AuthLayout><Profile /></AuthLayout>} />
              <Route path="/settings" element={<AuthLayout><Settings /></AuthLayout>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
