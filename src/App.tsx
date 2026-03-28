import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Horpadasjavitas from "./pages/Horpadasjavitas";
import Polirozas from "./pages/Polirozas";
import FenysziroFelujitas from "./pages/FenysziroFelujitas";
import Ajanlat from "./pages/Ajanlat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/horpadasjavitas" element={<Horpadasjavitas />} />
          <Route path="/polirozas" element={<Polirozas />} />
          <Route path="/fenyszoro-felujitas" element={<FenysziroFelujitas />} />
          <Route path="/ajanlat" element={<Ajanlat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
