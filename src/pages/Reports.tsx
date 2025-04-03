
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, PieChart, Share2, X } from "lucide-react";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: number;
  title: string;
  date: string;
  type: string;
  content?: string;
  status?: "Draft" | "Published" | "Review";
  author?: string;
  lastUpdated?: string;
}

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileDialog, setIsMobileDialog] = useState(false);
  const { toast } = useToast();
  
  const reports: Report[] = [
    { 
      id: 1, 
      title: "Risk Analysis Q2 2023", 
      date: "June 15, 2023", 
      type: "Risk Analysis",
      content: "This report identifies key risk factors in our current project portfolio with recommendations for mitigation strategies. Several high-priority risks have been identified in the technology stack implementation, requiring immediate attention.",
      status: "Published",
      author: "Jane Smith",
      lastUpdated: "June 16, 2023"
    },
    { 
      id: 2, 
      title: "Project Portfolio Overview", 
      date: "July 10, 2023", 
      type: "Portfolio",
      content: "A comprehensive overview of all active projects, their current status, resource allocation, and expected completion dates. Projects are generally on track with minor delays in the Phoenix implementation.",
      status: "Review",
      author: "John Davis",
      lastUpdated: "July 12, 2023"
    },
    { 
      id: 3, 
      title: "Budget Variance Report", 
      date: "July 22, 2023", 
      type: "Budget",
      content: "Analysis of budget performance across all projects, highlighting areas of concern and recommendations for cost-saving measures. Current expenditures are 12% above projections for Q2.",
      status: "Draft",
      author: "Michael Johnson",
      lastUpdated: "July 23, 2023"
    },
    { 
      id: 4, 
      title: "Scheduled Risks Assessment", 
      date: "August 5, 2023", 
      type: "Risk Analysis",
      content: "Detailed analysis of schedule risks across all active projects with impact assessment and mitigation strategies. Schedule risks have increased by 15% since last quarter.",
      status: "Published",
      author: "Emily Wilson",
      lastUpdated: "August 6, 2023"
    },
    { 
      id: 5, 
      title: "Market Impact Report", 
      date: "August 15, 2023", 
      type: "Market",
      content: "Assessment of current market conditions and their potential impact on ongoing and planned projects. Market volatility has increased, suggesting the need for more conservative planning approaches.",
      status: "Review",
      author: "Robert Chen",
      lastUpdated: "August 16, 2023"
    },
    { 
      id: 6, 
      title: "Quarterly Project Status", 
      date: "September 1, 2023", 
      type: "Status",
      content: "Comprehensive status update for all projects in the current quarter, including milestone achievements, blockers, and next steps. Overall portfolio health score: 72/100.",
      status: "Published",
      author: "Sarah Johnson",
      lastUpdated: "September 2, 2023"
    },
  ];

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    
    // Check window width to determine if we should use dialog or drawer
    if (window.innerWidth < 768) {
      setIsMobileDialog(true);
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleDownload = (report: Report) => {
    toast({
      title: "Download started",
      description: `${report.title} is being prepared for download.`,
    });
  };

  const handleShare = (report: Report) => {
    toast({
      title: "Share options",
      description: `Share options for ${report.title} opened.`,
    });
  };

  const renderReportCard = (report: Report) => (
    <Card key={report.id} className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{report.title}</CardTitle>
            <CardDescription>{report.date}</CardDescription>
          </div>
          {report.status && (
            <Badge variant={
              report.status === "Published" ? "default" : 
              report.status === "Review" ? "secondary" : 
              "outline"
            }>
              {report.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{report.type}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => handleViewReport(report)}>
          <PieChart className="h-4 w-4 mr-2" />
          View
        </Button>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => handleDownload(report)}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleShare(report)}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Access and generate project reports</p>
        </header>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="status">Status Reports</TabsTrigger>
            <TabsTrigger value="budget">Budget Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map(report => renderReportCard(report))}
            </div>
          </TabsContent>
          
          <TabsContent value="risk" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(r => r.type === "Risk Analysis").map(report => renderReportCard(report))}
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(r => r.type === "Status").map(report => renderReportCard(report))}
            </div>
          </TabsContent>
          
          <TabsContent value="budget" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(r => r.type === "Budget").map(report => renderReportCard(report))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Drawer for larger screens */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="flex justify-between items-start">
            <div>
              <DrawerTitle className="text-xl pr-8">{selectedReport?.title}</DrawerTitle>
              <DrawerDescription>
                {selectedReport?.date} • {selectedReport?.type}
              </DrawerDescription>
            </div>
            <DrawerClose className="absolute right-4 top-4" asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          
          {selectedReport && (
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <Badge variant={
                  selectedReport.status === "Published" ? "default" : 
                  selectedReport.status === "Review" ? "secondary" : 
                  "outline"
                }>
                  {selectedReport.status}
                </Badge>
                <span className="text-sm text-muted-foreground">Last updated: {selectedReport.lastUpdated}</span>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Author</h3>
                  <p>{selectedReport.author}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                  <p className="whitespace-pre-wrap">{selectedReport.content}</p>
                </div>
              </div>
            </div>
          )}
          
          <DrawerFooter>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => handleDownload(selectedReport!)}>Download</Button>
              <Button onClick={() => handleShare(selectedReport!)}>Share</Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Dialog for mobile screens */}
      <Dialog open={isMobileDialog} onOpenChange={setIsMobileDialog}>
        {selectedReport && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedReport.title}</DialogTitle>
              <DialogDescription>
                {selectedReport.date} • {selectedReport.type}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={
                  selectedReport.status === "Published" ? "default" : 
                  selectedReport.status === "Review" ? "secondary" : 
                  "outline"
                }>
                  {selectedReport.status}
                </Badge>
                <span className="text-sm text-muted-foreground">Last updated: {selectedReport.lastUpdated}</span>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Author</h3>
                <p>{selectedReport.author}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                <p className="whitespace-pre-wrap">{selectedReport.content}</p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => handleDownload(selectedReport)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={() => handleShare(selectedReport)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </DashboardLayout>
  );
};

export default Reports;
