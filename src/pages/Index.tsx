
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { RiskOverview } from "@/components/Dashboard/RiskOverview";
import { ProjectRisks } from "@/components/Dashboard/ProjectRisks";
import { ConversationalBot } from "@/components/Dashboard/ConversationalBot";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import { EditProjectDialog } from "@/components/Dashboard/EditProjectDialog";

const Index = () => {
  const { 
    setAddProjectDialogOpen, 
    isEditProjectDialogOpen, 
    setEditProjectDialogOpen, 
    selectedProject, 
    editProject 
  } = useProjects();

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
