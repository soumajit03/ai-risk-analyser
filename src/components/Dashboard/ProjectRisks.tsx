
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, ChevronDown, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project, Risk } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/context/ProjectContext";
import { AddProjectDialog } from "./AddProjectDialog";

export function ProjectRisks() {
  const { projects, isAddProjectDialogOpen, setAddProjectDialogOpen, addProject } = useProjects();
  
  function getRiskBadgeClass(level: string) {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return '';
    }
  }
  
  function getStatusBadgeClass(status: Project['status']) {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Delayed': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default: return '';
    }
  }

  // All risks across all projects
  const allRisks = projects.flatMap(project => 
    project.risks.map(risk => ({ ...risk, projectName: project.name }))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Project Risks</h2>
        <Button onClick={() => setAddProjectDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Project Status</CardTitle>
              <CardDescription>Overview of all projects and their risk levels</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Budget</TableHead>
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
                  <TableCell>
                    <div className={cn(
                      "px-2 py-1 rounded-md text-xs font-medium inline-block",
                      project.riskScore > 70 ? "bg-red-100 text-red-800" :
                      project.riskScore > 50 ? "bg-orange-100 text-orange-800" :
                      project.riskScore > 30 ? "bg-yellow-100 text-yellow-800" : 
                      "bg-green-100 text-green-800"
                    )}>
                      {project.riskScore}/100
                    </div>
                  </TableCell>
                  <TableCell>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Risk Register</CardTitle>
              <CardDescription>All identified risks across projects</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk Name</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allRisks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.name}</TableCell>
                  <TableCell>{risk.projectName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskBadgeClass(risk.level)}>
                      {risk.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{risk.category}</TableCell>
                  <TableCell>{risk.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AddProjectDialog 
        open={isAddProjectDialogOpen} 
        onOpenChange={setAddProjectDialogOpen}
        onAddProject={addProject}
      />
    </div>
  );
}
