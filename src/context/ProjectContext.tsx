
import { createContext, useState, useContext, ReactNode } from "react";
import { Project, projects as initialProjects, addProject as addProjectToMock } from "@/utils/mockData";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  isAddProjectDialogOpen: boolean;
  setAddProjectDialogOpen: (open: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAddProjectDialogOpen, setAddProjectDialogOpen] = useState(false);

  const addProject = (project: Project) => {
    // Update both the context state and the mock data
    setProjects((prev) => [...prev, project]);
    addProjectToMock(project);
  };

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      addProject, 
      isAddProjectDialogOpen, 
      setAddProjectDialogOpen 
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
