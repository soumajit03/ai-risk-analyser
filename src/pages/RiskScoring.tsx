
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/utils/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const RiskScoring = () => {
  function getRiskClass(score: number) {
    if (score > 70) return "bg-red-100 text-red-800";
    if (score > 50) return "bg-orange-100 text-orange-800";
    if (score > 30) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  }

  function getRiskLabel(score: number) {
    if (score > 70) return "Critical";
    if (score > 50) return "High";
    if (score > 30) return "Medium";
    return "Low";
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Risk Scoring</h1>
          <p className="text-muted-foreground">Detailed risk assessment and scoring metrics</p>
        </header>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Risk Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Risk Factors</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.riskScore}/100</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getRiskClass(project.riskScore)}>
                          {getRiskLabel(project.riskScore)}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.risks.length} factors</TableCell>
                      <TableCell>{project.riskScore > 50 ? "↑" : "↓"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Scoring Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Our risk scoring methodology considers multiple factors:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Budget variance</li>
                    <li>Schedule adherence</li>
                    <li>Resource availability</li>
                    <li>Stakeholder alignment</li>
                    <li>Technical complexity</li>
                    <li>External market factors</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Risk Threshold Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Critical Risk: &gt; 70</p>
                    <p className="text-sm text-muted-foreground">Immediate action required</p>
                  </div>
                  <div>
                    <p className="font-medium">High Risk: 50-70</p>
                    <p className="text-sm text-muted-foreground">Mitigation plan required</p>
                  </div>
                  <div>
                    <p className="font-medium">Medium Risk: 30-50</p>
                    <p className="text-sm text-muted-foreground">Monitoring required</p>
                  </div>
                  <div>
                    <p className="font-medium">Low Risk: &lt; 30</p>
                    <p className="text-sm text-muted-foreground">Standard monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiskScoring;
