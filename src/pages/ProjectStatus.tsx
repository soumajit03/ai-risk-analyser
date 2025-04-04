
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Define the Project type
interface Project {
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "On Hold" | "Planning";
  completion: number;
  dueDate: string;
  leadName: string;
  team: string[];
  milestones: {
    name: string;
    date: string;
    completed: boolean;
  }[];
}

const projects: Project[] = [
  {
    id: "1",
    name: "Market Entry Strategy - Asia",
    status: "In Progress",
    completion: 65,
    dueDate: "2023-06-15",
    leadName: "Sarah Chen",
    team: ["Alex Johnson", "Maria Lopez", "David Kim"],
    milestones: [
      { name: "Market Assessment", date: "2023-03-15", completed: true },
      { name: "Competitor Analysis", date: "2023-04-10", completed: true },
      { name: "Partnership Strategy", date: "2023-05-20", completed: false },
      { name: "Final Recommendations", date: "2023-06-10", completed: false },
    ],
  },
  {
    id: "2",
    name: "Product Launch - QZ Series",
    status: "Planning",
    completion: 25,
    dueDate: "2023-08-30",
    leadName: "Carlos Rodriguez",
    team: ["Emma Wilson", "James Park", "Lisa Chen"],
    milestones: [
      { name: "Product Specifications", date: "2023-05-15", completed: true },
      { name: "Prototype Development", date: "2023-06-30", completed: false },
      { name: "Market Testing", date: "2023-07-30", completed: false },
      { name: "Launch Plan", date: "2023-08-15", completed: false },
    ],
  },
  {
    id: "3",
    name: "Operational Efficiency Review",
    status: "Completed",
    completion: 100,
    dueDate: "2023-04-30",
    leadName: "Michelle Thompson",
    team: ["Robert Zhang", "Daniel Adams", "Sophia Lee"],
    milestones: [
      { name: "Data Collection", date: "2023-02-15", completed: true },
      { name: "Process Analysis", date: "2023-03-10", completed: true },
      { name: "Recommendations", date: "2023-04-05", completed: true },
      { name: "Implementation Plan", date: "2023-04-25", completed: true },
    ],
  },
  {
    id: "4",
    name: "Regulatory Compliance Update",
    status: "On Hold",
    completion: 40,
    dueDate: "2023-07-15",
    leadName: "Thomas Anderson",
    team: ["Jennifer Wilson", "Michael Brown", "Amanda Chen"],
    milestones: [
      { name: "Regulation Review", date: "2023-04-20", completed: true },
      { name: "Gap Analysis", date: "2023-05-15", completed: true },
      { name: "Implementation Strategy", date: "2023-06-20", completed: false },
      { name: "Compliance Report", date: "2023-07-10", completed: false },
    ],
  }
];

const statusColorMap = {
  "In Progress": "text-blue-600 bg-blue-100",
  Completed: "text-green-600 bg-green-100",
  "On Hold": "text-amber-600 bg-amber-100",
  Planning: "text-purple-600 bg-purple-100",
};

const ProjectStatus = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Project Status</h1>
          <p className="text-muted-foreground">Monitor current project progress and tasks</p>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedProject(project)}
                      >
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColorMap[project.status]
                            }`}
                          >
                            {project.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${project.completion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {project.completion}%
                          </span>
                        </TableCell>
                        <TableCell>{new Date(project.dueDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedProject ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedProject.name}</CardTitle>
                <CardDescription>Project details and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                        <p className="mt-1">{selectedProject.status}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Completion</h4>
                        <p className="mt-1">{selectedProject.completion}%</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                        <p className="mt-1">
                          {new Date(selectedProject.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Project Lead</h4>
                        <p className="mt-1">{selectedProject.leadName}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="team" className="mt-4">
                    <ul className="space-y-2">
                      <li className="font-medium">Project Lead: {selectedProject.leadName}</li>
                      {selectedProject.team.map((member, i) => (
                        <li key={i} className="ml-4">• {member}</li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="milestones" className="mt-4">
                    <ul className="space-y-3">
                      {selectedProject.milestones.map((milestone, i) => (
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
      </div>
    </DashboardLayout>
  );
};

export default ProjectStatus;
