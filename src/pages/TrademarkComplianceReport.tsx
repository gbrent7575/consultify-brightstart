import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Clock, FileText } from "lucide-react";

/**
 * ISNetworld Trademark Compliance Report
 * 
 * Internal checklist page for tracking trademark compliance across the site.
 * Reference: https://www.isnetworld.com/en/trademark-logo-policy
 */

type ComplianceStatus = "Updated" | "To Do" | "Needs review";
type IssueCategory = "missing ®" | "improper grammar use" | "implied affiliation" | "logo usage" | "missing disclaimer";

interface ComplianceItem {
  url: string;
  location: string;
  currentText: string;
  issueCategory: IssueCategory;
  recommendedAction: string;
  status: ComplianceStatus;
}

const complianceData: ComplianceItem[] = [
  {
    url: "/",
    location: "Hero Section",
    currentText: "Struggling with ISNetworld or Avetta?",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'Struggling with ISNetworld® or Avetta® compliance?'",
    status: "Updated"
  },
  {
    url: "/",
    location: "Hero - Platforms List",
    currentText: "ISNetworld®",
    issueCategory: "missing ®",
    recommendedAction: "Already includes ® - Verified",
    status: "Updated"
  },
  {
    url: "/",
    location: "Footer",
    currentText: "ISNetworld®",
    issueCategory: "missing disclaimer",
    recommendedAction: "Add trademark disclaimer section",
    status: "Updated"
  },
  {
    url: "/",
    location: "Page Title (SEO)",
    currentText: "ISNetworld & Avetta Compliance Management",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'ISNetworld® & Avetta® Compliance Support Services'",
    status: "Updated"
  },
  {
    url: "/",
    location: "Meta Description",
    currentText: "Struggling with ISNetworld or Avetta?",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'Need help with ISNetworld® or Avetta® compliance?'",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Page Title",
    currentText: "ISNetworld® / Veriforce® / Avetta® Compliance",
    issueCategory: "missing ®",
    recommendedAction: "Already includes ® - Verified",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Hero Section",
    currentText: "ISNetworld® / Veriforce® / Avetta® Compliance Management",
    issueCategory: "missing ®",
    recommendedAction: "Already includes ® - Verified",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Platforms Section",
    currentText: "ISNetworld®",
    issueCategory: "missing disclaimer",
    recommendedAction: "Add TrademarkNotice component below platforms section",
    status: "Updated"
  },
  {
    url: "/services/compliance-platforms",
    location: "Hero Image Alt Text",
    currentText: "ISNetworld Veriforce Avetta compliance management",
    issueCategory: "missing ®",
    recommendedAction: "Change to: 'ISNetworld® Veriforce® Avetta® compliance support services'",
    status: "Updated"
  },
  {
    url: "Global Footer",
    location: "Platforms We Manage List",
    currentText: "ISNetworld®",
    issueCategory: "missing disclaimer",
    recommendedAction: "Add Trademarks section with disclaimer and attribution",
    status: "Updated"
  }
];

const getStatusBadge = (status: ComplianceStatus) => {
  switch (status) {
    case "Updated":
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Updated</Badge>;
    case "To Do":
      return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">To Do</Badge>;
    case "Needs review":
      return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Needs review</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const getCategoryBadge = (category: IssueCategory) => {
  switch (category) {
    case "missing ®":
      return <Badge variant="outline" className="text-xs">Missing ®</Badge>;
    case "improper grammar use":
      return <Badge variant="outline" className="text-xs">Grammar</Badge>;
    case "implied affiliation":
      return <Badge variant="outline" className="text-xs">Affiliation</Badge>;
    case "logo usage":
      return <Badge variant="outline" className="text-xs">Logo</Badge>;
    case "missing disclaimer":
      return <Badge variant="outline" className="text-xs">Disclaimer</Badge>;
    default:
      return <Badge variant="outline" className="text-xs">{category}</Badge>;
  }
};

const TrademarkComplianceReport = () => {
  const updatedCount = complianceData.filter(item => item.status === "Updated").length;
  const todoCount = complianceData.filter(item => item.status === "To Do").length;
  const reviewCount = complianceData.filter(item => item.status === "Needs review").length;

  return (
    <>
      <Helmet>
        <title>ISNetworld® Trademark Compliance Report | Internal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavigationNew />
        
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-serif font-bold text-primary">
                  ISNetworld® Trademark Compliance Report
                </h1>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                Internal checklist for tracking trademark compliance across the Cornerstone Risk Management website. 
                Reference: <a href="https://www.isnetworld.com/en/trademark-logo-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ISNetworld Trademark & Logo Policy</a>
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{updatedCount}</p>
                      <p className="text-sm text-muted-foreground">Updated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{todoCount}</p>
                      <p className="text-sm text-muted-foreground">To Do</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{reviewCount}</p>
                      <p className="text-sm text-muted-foreground">Needs Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Rules Reference */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Quick Reference: Trademark Usage Rules</CardTitle>
                <CardDescription>From the official ISNetworld Trademark & Logo Policy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">✓ Correct Usage</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Use "ISNetworld®" with ® on first mention per page</li>
                      <li>• Use as adjective: "ISNetworld® compliance support services"</li>
                      <li>• Include disclaimer where services are marketed</li>
                      <li>• Text-only references (no logos without permission)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">✗ Incorrect Usage</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• "We handle ISNetworld" (used as noun)</li>
                      <li>• "ISNetworld setup" (used as noun/verb)</li>
                      <li>• Implying endorsement or partnership</li>
                      <li>• Using logos without written permission</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Audit Details</CardTitle>
                <CardDescription>All instances requiring review or update</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">URL / Page</TableHead>
                        <TableHead className="w-[120px]">Location</TableHead>
                        <TableHead>Current Text / Asset</TableHead>
                        <TableHead className="w-[100px]">Issue</TableHead>
                        <TableHead>Recommended Action</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complianceData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs">{item.url}</TableCell>
                          <TableCell className="text-sm">{item.location}</TableCell>
                          <TableCell className="text-sm">{item.currentText}</TableCell>
                          <TableCell>{getCategoryBadge(item.issueCategory)}</TableCell>
                          <TableCell className="text-sm">{item.recommendedAction}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Required Disclaimer Text */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Required Disclaimer Text</CardTitle>
                <CardDescription>Copy these exact phrases for compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium text-sm mb-1">Disclaimer:</p>
                    <p className="text-sm text-muted-foreground">
                      "Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with ISNetworld® or ISN Software Corporation."
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium text-sm mb-1">Attribution:</p>
                    <p className="text-sm text-muted-foreground">
                      "ISNetworld® is a registered trademark of ISN Software Corporation."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default TrademarkComplianceReport;
