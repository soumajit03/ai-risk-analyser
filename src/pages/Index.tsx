
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { RiskOverview } from "@/components/Dashboard/RiskOverview";
import { ProjectRisks } from "@/components/Dashboard/ProjectRisks";
import { ConversationalBot } from "@/components/Dashboard/ConversationalBot";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">AI-Powered Project Risk Management</h1>
          <p className="text-muted-foreground">Monitor, analyze, and mitigate project risks in real-time</p>
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
      </div>
    </DashboardLayout>
  );
};

export default Index;
