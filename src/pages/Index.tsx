
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { RiskOverview } from "@/components/Dashboard/RiskOverview";
import { ProjectRisks } from "@/components/Dashboard/ProjectRisks";
import { ConversationalBot } from "@/components/Dashboard/ConversationalBot";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import { EditProjectDialog } from "@/components/Dashboard/EditProjectDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { 
    projects,
    setAddProjectDialogOpen, 
    isEditProjectDialogOpen, 
    setEditProjectDialogOpen, 
    selectedProject, 
    setSelectedProject,
    editProject 
  } = useProjects();

  const handleEditProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setEditProjectDialogOpen(true);
    }
  };

  function getStatusBadgeClass(status) {
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
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">AI-Powered Project Risk Management</h1>
            <p className="text-muted-foreground">Monitor, analyze, and mitigate project risks in real-time</p>
          </div>
          <Button onClick={() => setAddProjectDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </header>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <RiskOverview />
            
            {/* Project Overview Section with Edit Buttons */}
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
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Actions</TableHead>
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
                        <TableCell>{project.riskScore}/100</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditProject(project.id)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Project
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <ProjectRisks />
          </div>
          
          <div className="xl:col-span-1">
            <ConversationalBot />
          </div>
        </div>
        
        {/* Include the EditProjectDialog here as well to ensure it's available globally */}
        <EditProjectDialog 
          open={isEditProjectDialogOpen}
          onOpenChange={setEditProjectDialogOpen}
          project={selectedProject}
          onEditProject={editProject}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
