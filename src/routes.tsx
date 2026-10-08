import { Navigate } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import App from "./App";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompliancePlatforms from "./pages/CompliancePlatforms";

import Avetta from "./pages/Avetta";
import Veriforce from "./pages/Veriforce";
import IsnHelp from "./pages/IsnHelp";
import TrademarkComplianceReport from "./pages/TrademarkComplianceReport";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import OwnerPage from "./pages/OwnerPage";
import OwnersIndex from "./pages/OwnersIndex";
import { fetchOwnerPage, fetchOwnerPages } from "./lib/owners";
import GuidesIndex from "./pages/GuidesIndex";
import GuidePage from "./pages/GuidePage";
import { fetchGuide, fetchGuides } from "./lib/guides";

const redirectHome = <Navigate to="/" replace />;
const redirectIsnHelp = <Navigate to="/isn/help" replace />;

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
      
      { path: "isn/help", element: <IsnHelp />, entry: "src/pages/IsnHelp.tsx" },
      { path: "isnetworld-help", element: <IsnHelp />, entry: "src/pages/IsnHelp.tsx" },
      { path: "isnetworld", element: <IsnHelp />, entry: "src/pages/IsnHelp.tsx" },
      { path: "isn", element: <IsnHelp />, entry: "src/pages/IsnHelp.tsx" },
      { path: "avetta-help", element: <Avetta />, entry: "src/pages/Avetta.tsx" },
      { path: "avetta", element: <Avetta />, entry: "src/pages/Avetta.tsx" },
      { path: "avetta/help", element: <Avetta />, entry: "src/pages/Avetta.tsx" },
      { path: "services/avetta", element: <Avetta />, entry: "src/pages/Avetta.tsx" },
      { path: "veriforce-help", element: <Veriforce />, entry: "src/pages/Veriforce.tsx" },
      { path: "veriforce", element: <Veriforce />, entry: "src/pages/Veriforce.tsx" },
      { path: "veriforce/help", element: <Veriforce />, entry: "src/pages/Veriforce.tsx" },
      { path: "services/veriforce", element: <Veriforce />, entry: "src/pages/Veriforce.tsx" },
      { path: "services/isnetworld", element: redirectIsnHelp },
      // Retired service pages — redirect to home
      { path: "services/safety-program-development", element: redirectHome },
      { path: "services/regulatory-compliance", element: redirectHome },
      { path: "services/onsite-audits-training", element: redirectHome },
      { path: "services/risk-consulting", element: redirectHome },
      { path: "services/safety-management-system", element: redirectHome },
      { path: "services/monthly-training", element: redirectHome },
      { path: "internal/trademark-compliance", element: <TrademarkComplianceReport />, entry: "src/pages/TrademarkComplianceReport.tsx" },
      {
        path: "owners",
        element: <OwnersIndex />,
        entry: "src/pages/OwnersIndex.tsx",
        loader: async () => {
          try { return await fetchOwnerPages(); } catch { return null; }
        },
      },
      {
        path: "owners/:slug",
        element: <OwnerPage />,
        entry: "src/pages/OwnerPage.tsx",
        getStaticPaths: async () => {
          try {
            const pages = await fetchOwnerPages();
            return pages.map((p) => `owners/${p.slug}`);
          } catch {
            return [];
          }
        },
        loader: async ({ params }) => {
          try { return await fetchOwnerPage(params.slug ?? ""); } catch { return null; }
        },
      },
      {
        path: "guides",
        element: <GuidesIndex />,
        entry: "src/pages/GuidesIndex.tsx",
        loader: async () => {
          try { return await fetchGuides(); } catch { return null; }
        },
      },
      {
        path: "guides/:slug",
        element: <GuidePage />,
        entry: "src/pages/GuidePage.tsx",
        getStaticPaths: async () => {
          try {
            const guides = await fetchGuides();
            return guides.map((g) => `guides/${g.slug}`);
          } catch {
            return [];
          }
        },
        loader: async ({ params }) => {
          try { return await fetchGuide(params.slug ?? ""); } catch { return null; }
        },
      },
      { path: "*", element: <NotFound />, entry: "src/pages/NotFound.tsx" },
    ],
  },
];
