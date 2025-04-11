
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Flights from "./pages/Flights";
import Deals from "./pages/Deals";
import PrivateJets from "./pages/PrivateJets";
import PreviousWebsites from "./pages/PreviousWebsites";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/private-jets" element={<PrivateJets />} />
          <Route path="/previous-websites" element={<PreviousWebsites />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
