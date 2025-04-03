
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { ConversationalBot } from "@/components/Dashboard/ConversationalBot";

const ChatAssistant = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Chat Assistant</h1>
          <p className="text-muted-foreground">Get answers about project risks and recommendations</p>
        </header>
        
        <div className="h-[calc(100vh-12rem)]">
          <ConversationalBot />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatAssistant;
