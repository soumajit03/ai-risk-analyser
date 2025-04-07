
import { createContext, useState, useContext, ReactNode } from "react";
import { 
  Project, 
  projects as initialProjects, 
  addProject as addProjectToMock,
  updateProject as updateProjectInMock
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
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAddProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const addProject = (project: Project) => {
    // Update both the context state and the mock data
    setProjects((prev) => [...prev, project]);
    addProjectToMock(project); // This will add the project to the mockData directly
  };

  const editProject = (projectId: string, updatedProject: Partial<Project>) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, ...updatedProject } 
        : project
    ));
    
    // Update the mock data as well
    updateProjectInMock(projectId, updatedProject);
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
      setSelectedProject
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
