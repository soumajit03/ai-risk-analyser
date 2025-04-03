
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, PieChart, Share2 } from "lucide-react";

const Reports = () => {
  const reports = [
    { id: 1, title: "Risk Analysis Q2 2023", date: "June 15, 2023", type: "Risk Analysis" },
    { id: 2, title: "Project Portfolio Overview", date: "July 10, 2023", type: "Portfolio" },
    { id: 3, title: "Budget Variance Report", date: "July 22, 2023", type: "Budget" },
    { id: 4, title: "Scheduled Risks Assessment", date: "August 5, 2023", type: "Risk Analysis" },
    { id: 5, title: "Market Impact Report", date: "August 15, 2023", type: "Market" },
    { id: 6, title: "Quarterly Project Status", date: "September 1, 2023", type: "Status" },
  ];

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
              {reports.map(report => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{report.type}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <PieChart className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="risk" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(r => r.type === "Risk Analysis").map(report => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{report.type}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <PieChart className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(r => r.type === "Status").map(report => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{report.type}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <PieChart className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="budget" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(r => r.type === "Budget").map(report => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{report.type}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <PieChart className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
