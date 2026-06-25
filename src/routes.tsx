import { Navigate } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import App from "./App";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompliancePlatforms from "./pages/CompliancePlatforms";
import Isnetworld from "./pages/Isnetworld";
import Avetta from "./pages/Avetta";
import Veriforce from "./pages/Veriforce";
import IsnHelp from "./pages/IsnHelp";
import TrademarkComplianceReport from "./pages/TrademarkComplianceReport";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

const redirectHome = <Navigate to="/" replace />;

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index />, entry: "src/pages/Index.tsx" },
      { path: "about", element: <About />, entry: "src/pages/About.tsx" },
      { path: "pricing", element: <Pricing />, entry: "src/pages/Pricing.tsx" },
      { path: "contact", element: <Contact />, entry: "src/pages/Contact.tsx" },
      { path: "services/compliance-platforms", element: <CompliancePlatforms />, entry: "src/pages/CompliancePlatforms.tsx" },
      { path: "services/isnetworld", element: <Isnetworld />, entry: "src/pages/Isnetworld.tsx" },
      { path: "isnetworld-help", element: <Isnetworld />, entry: "src/pages/Isnetworld.tsx" },
      { path: "isn/help", element: <IsnHelp />, entry: "src/pages/IsnHelp.tsx" },
      { path: "isnetworld", element: <Isnetworld />, entry: "src/pages/Isnetworld.tsx" },
      { path: "avetta-help", element: <Avetta />, entry: "src/pages/Avetta.tsx" },
      { path: "avetta", element: <Avetta />, entry: "src/pages/Avetta.tsx" },
      { path: "services/avetta", element: <Avetta />, entry: "src/pages/Avetta.tsx" },
      { path: "veriforce-help", element: <Veriforce />, entry: "src/pages/Veriforce.tsx" },
      { path: "veriforce", element: <Veriforce />, entry: "src/pages/Veriforce.tsx" },
      { path: "services/veriforce", element: <Veriforce />, entry: "src/pages/Veriforce.tsx" },
      // Retired service pages — redirect to home
      { path: "services/safety-program-development", element: redirectHome },
      { path: "services/regulatory-compliance", element: redirectHome },
      { path: "services/onsite-audits-training", element: redirectHome },
      { path: "services/risk-consulting", element: redirectHome },
      { path: "services/safety-management-system", element: redirectHome },
      { path: "services/monthly-training", element: redirectHome },
      { path: "internal/trademark-compliance", element: <TrademarkComplianceReport />, entry: "src/pages/TrademarkComplianceReport.tsx" },
      { path: "*", element: <NotFound />, entry: "src/pages/NotFound.tsx" },
    ],
  },
];
