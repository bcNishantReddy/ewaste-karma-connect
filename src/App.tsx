
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userType');
    
    setIsLoggedIn(!!userName);
    setUserType(userRole);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/login" 
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/dashboard" 
              element={
                !isLoggedIn ? <Navigate to="/login" /> :
                <Dashboard />
              } 
            />
            <Route path="/about" element={<Navigate to="/#about" />} />
            <Route path="/how-it-works" element={<Navigate to="/#how-it-works" />} />
            <Route path="/contact" element={<Navigate to="/#contact" />} />
            <Route path="/redeem-store" element={<Navigate to="/#redeem-store" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
