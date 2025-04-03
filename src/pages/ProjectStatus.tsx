
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/utils/mockData";
import { cn } from "@/lib/utils";

const ProjectStatus = () => {
  function getStatusBadgeClass(status: string) {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Delayed': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default: return '';
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Project Status</h1>
          <p className="text-muted-foreground">Current status of all active projects</p>
        </header>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Timeline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeClass(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-20" />
                        <span className="text-xs">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</TableCell>
                    <TableCell>{project.timeline || "Not specified"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{project.name}</CardTitle>
                  <Badge variant="outline" className={getStatusBadgeClass(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-medium">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className={cn(
                        "font-medium",
                        project.riskScore > 70 ? "text-red-600" :
                        project.riskScore > 50 ? "text-orange-600" :
                        project.riskScore > 30 ? "text-yellow-600" : "text-green-600"
                      )}>
                        {project.riskScore}/100
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectStatus;
