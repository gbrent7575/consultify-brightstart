import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SafetyProgramDevelopment from "./pages/SafetyProgramDevelopment";
import RegulatoryCompliance from "./pages/RegulatoryCompliance";
import OnsiteAuditsTraining from "./pages/OnsiteAuditsTraining";
import RiskConsulting from "./pages/RiskConsulting";
import CompliancePlatforms from "./pages/CompliancePlatforms";
import Isnetworld from "./pages/Isnetworld";
import Avetta from "./pages/Avetta";
import Veriforce from "./pages/Veriforce";
import SafetyManagementSystem from "./pages/SafetyManagementSystem";
import MonthlyTraining from "./pages/MonthlyTraining";
import TrademarkComplianceReport from "./pages/TrademarkComplianceReport";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
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
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/safety-program-development" element={<SafetyProgramDevelopment />} />
          <Route path="/services/regulatory-compliance" element={<RegulatoryCompliance />} />
          <Route path="/services/onsite-audits-training" element={<OnsiteAuditsTraining />} />
          <Route path="/services/risk-consulting" element={<RiskConsulting />} />
          <Route path="/services/compliance-platforms" element={<CompliancePlatforms />} />
          <Route path="/services/isnetworld" element={<Isnetworld />} />
          <Route path="/isnetworld-help" element={<Isnetworld />} />
          <Route path="/isnetworld" element={<Isnetworld />} />
          <Route path="/avetta-help" element={<Avetta />} />
          <Route path="/avetta" element={<Avetta />} />
          <Route path="/services/avetta" element={<Avetta />} />
          <Route path="/services/safety-management-system" element={<SafetyManagementSystem />} />
          <Route path="/services/monthly-training" element={<MonthlyTraining />} />
          <Route path="/internal/trademark-compliance" element={<TrademarkComplianceReport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
