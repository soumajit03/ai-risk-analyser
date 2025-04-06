
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useProjects } from "@/context/ProjectContext";
import { AddProjectDialog } from "@/components/Dashboard/AddProjectDialog";
import { EditProjectDialog } from "@/components/Dashboard/EditProjectDialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";

// Map project status to class names
const statusColorMap = {
  "On Track": "text-blue-600 bg-blue-100",
  "Completed": "text-green-600 bg-green-100",
  "Delayed": "text-amber-600 bg-amber-100",
  "At Risk": "text-red-600 bg-red-100",
};

const ProjectStatus = () => {
  const { 
    projects, 
    isAddProjectDialogOpen, 
    setAddProjectDialogOpen, 
    addProject,
    isEditProjectDialogOpen,
    setEditProjectDialogOpen,
    selectedProject,
    setSelectedProject,
    editProject
  } = useProjects();
  
  const [projectToView, setProjectToView] = useState(projects.length > 0 ? projects[0] : null);

  // Create simple milestones based on project progress
  const getMilestones = (project) => {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const range = endDate.getTime() - startDate.getTime();
    
    return [
      { 
        name: "Project Start", 
        date: project.startDate, 
        completed: true 
      },
      { 
        name: "25% Completion", 
        date: new Date(startDate.getTime() + (range * 0.25)).toISOString().split('T')[0], 
        completed: project.progress >= 25 
      },
      { 
        name: "50% Completion", 
        date: new Date(startDate.getTime() + (range * 0.5)).toISOString().split('T')[0], 
        completed: project.progress >= 50 
      },
      { 
        name: "75% Completion", 
        date: new Date(startDate.getTime() + (range * 0.75)).toISOString().split('T')[0], 
        completed: project.progress >= 75 
      },
      { 
        name: "Project Completion", 
        date: project.endDate, 
        completed: project.progress === 100 
      },
    ];
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setEditProjectDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Project Status</h1>
            <p className="text-muted-foreground">Monitor current project progress and tasks</p>
          </div>
          <Button onClick={() => setAddProjectDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Overview of all ongoing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <TableCell 
                          className="font-medium"
                          onClick={() => setProjectToView(project)}
                        >
                          {project.name}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColorMap[project.status] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {project.progress}%
                          </span>
                        </TableCell>
                        <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProject(project);
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {projectToView ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>{projectToView.name}</CardTitle>
                  <CardDescription>Project details and milestones</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEditProject(projectToView)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Project
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="risks">Risks</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                        <p className="mt-1">{projectToView.status}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Completion</h4>
                        <p className="mt-1">{projectToView.progress}%</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Start Date</h4>
                        <p className="mt-1">
                          {new Date(projectToView.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                        <p className="mt-1">
                          {new Date(projectToView.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Budget</h4>
                        <p className="mt-1">${projectToView.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Spent</h4>
                        <p className="mt-1">${projectToView.spent.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                      <p className="text-sm">{projectToView.description}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="risks" className="mt-4">
                    {projectToView.risks.length > 0 ? (
                      <ul className="space-y-3">
                        {projectToView.risks.map((risk) => (
                          <li key={risk.id} className="border-b border-muted pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium flex items-center">
                                  <span
                                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                      risk.level === "Low" ? "bg-green-500" :
                                      risk.level === "Medium" ? "bg-yellow-500" :
                                      risk.level === "High" ? "bg-orange-500" : "bg-red-500"
                                    }`}
                                  />
                                  {risk.name}
                                </h4>
                                <p className="text-sm mt-1">{risk.description}</p>
                              </div>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                                {risk.level}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Category: {risk.category}</span>
                              <span>Status: {risk.status}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No risks identified for this project.</p>
                    )}
                  </TabsContent>
                  <TabsContent value="milestones" className="mt-4">
                    <ul className="space-y-3">
                      {getMilestones(projectToView).map((milestone, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between border-b border-muted pb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                milestone.completed ? "bg-green-500" : "bg-amber-500"
                              }`}
                            ></div>
                            <span>{milestone.name}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(milestone.date).toLocaleDateString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Select a project to view details</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
                No project selected
              </CardContent>
            </Card>
          )}
        </div>

        <AddProjectDialog 
          open={isAddProjectDialogOpen} 
          onOpenChange={setAddProjectDialogOpen}
          onAddProject={addProject}
        />
        
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

export default ProjectStatus;
