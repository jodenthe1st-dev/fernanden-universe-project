import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Placeholder pages - will be implemented
import About from "./pages/About";
import Contact from "./pages/Contact";
import SHE from "./pages/SHE";
import DENSEN from "./pages/DENSEN";
import CaFEE from "./pages/CaFEE";
import Portfolio from "./pages/Portfolio";
import Podcasts from "./pages/Podcasts";
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/she" element={<SHE />} />
          <Route path="/densen" element={<DENSEN />} />
          <Route path="/cafee" element={<CaFEE />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/resources" element={<Resources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
