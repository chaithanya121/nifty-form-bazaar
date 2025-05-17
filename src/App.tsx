
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import FormBuilder from "./components/FormBuilder";
import Dashboard from "@/components/Dashboard";
import FormSubmission from "@/components/FormSubmission";
import { AuthProvider, useAuth } from "./hooks/use-auth";
import { useState } from "react";
import GetStarted from "./components/GetStarted";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [showGetStarted, setShowGetStarted] = useState(false);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="relative min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70">
            <TooltipProvider delayDuration={0}>
              <Header />
              <main className="container mx-auto px-4 py-6 md:py-8">
                {showGetStarted && (
                  <GetStarted 
                    onClose={() => setShowGetStarted(false)} 
                    onSignUp={() => {
                      // User will be redirected to sign-up form
                      setShowGetStarted(false);
                    }} 
                  />
                )}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route 
                    path="/forms" 
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/create" 
                    element={
                      <ProtectedRoute>
                        <FormBuilder />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/form-builder/:id" 
                    element={
                      <ProtectedRoute>
                        <FormBuilder />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/form/:id" element={<FormSubmission />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
