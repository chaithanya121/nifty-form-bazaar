import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import FormBuilder from "./components/FormBuilder";
import Dashboard from "@/components/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="relative">
          <TooltipProvider delayDuration={0}>
            {/* <Header /> */}
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/forms" element={<Index />} />
                <Route path="/create" element={<FormBuilder />} />
                <Route path="/form-builder/:id" element={<FormBuilder />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
