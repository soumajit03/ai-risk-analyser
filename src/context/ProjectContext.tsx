
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { 
  Project, 
  projects as initialProjects, 
  addProject as addProjectToMock,
  updateProject as updateProjectInMock,
  getAllProjects
} from "@/utils/mockData";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  editProject: (projectId: string, updatedProject: Partial<Project>) => void;
  isAddProjectDialogOpen: boolean;
  setAddProjectDialogOpen: (open: boolean) => void;
  isEditProjectDialogOpen: boolean;
  setEditProjectDialogOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  refreshProjects: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAddProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Function to refresh projects from mockData
  const refreshProjects = () => {
    setProjects(getAllProjects());
  };

  const addProject = (project: Project) => {
    // Update both the context state and the mock data
    addProjectToMock(project); // This will add the project to the mockData directly
    refreshProjects(); // Refresh the projects from mockData to ensure consistency
  };

  const editProject = (projectId: string, updatedProject: Partial<Project>) => {
    // Update the mock data
    updateProjectInMock(projectId, updatedProject);
    refreshProjects(); // Refresh the projects from mockData to ensure consistency
  };

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      addProject,
      editProject,
      isAddProjectDialogOpen, 
      setAddProjectDialogOpen,
      isEditProjectDialogOpen,
      setEditProjectDialogOpen,
      selectedProject,
      setSelectedProject,
      refreshProjects
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}
