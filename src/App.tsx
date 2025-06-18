
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Typography from "./pages/Typography";
import Colors from "./pages/Colors";
import Elements from "./pages/Elements";
import Readme from "./pages/Readme";
import DBTest from "./pages/DBTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ErrorBoundary><Index /></ErrorBoundary>} />
            <Route path="/typography" element={<ErrorBoundary><Typography /></ErrorBoundary>} />
            <Route path="/colors" element={<ErrorBoundary><Colors /></ErrorBoundary>} />
            <Route path="/elements" element={<ErrorBoundary><Elements /></ErrorBoundary>} />
            <Route path="/readme" element={<ErrorBoundary><Readme /></ErrorBoundary>} />
            <Route path="/dbtest" element={<ErrorBoundary><DBTest /></ErrorBoundary>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
