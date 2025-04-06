
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

import Index from "@/pages/Index";
import MarketAnalysis from "@/pages/MarketAnalysis";
import RiskScoring from "@/pages/RiskScoring";
import ProjectStatus from "@/pages/ProjectStatus";
import Reports from "@/pages/Reports";
import ChatAssistant from "@/pages/ChatAssistant";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/Auth/SignIn";
import SignUp from "@/pages/Auth/SignUp";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { ProjectProvider } from "@/context/ProjectContext";

// Use the publishable key provided by the user
const CLERK_PUBLISHABLE_KEY = "pk_test_bmF0aW9uYWwtbG9jdXN0LTU3LmNsZXJrLmFjY291bnRzLmRldiQ";

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ProjectProvider>
          <Toaster position="top-center" />
          <Routes>
            {/* Auth Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Index />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/market-analysis"
              element={
                <>
                  <SignedIn>
                    <MarketAnalysis />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/risk-scoring"
              element={
                <>
                  <SignedIn>
                    <RiskScoring />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/project-status"
              element={
                <>
                  <SignedIn>
                    <ProjectStatus />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/reports"
              element={
                <>
                  <SignedIn>
                    <Reports />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/chat-assistant"
              element={
                <>
                  <SignedIn>
                    <ChatAssistant />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <SignedIn>
                    <Settings />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <SignedIn>
                    <Profile />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProjectProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;
