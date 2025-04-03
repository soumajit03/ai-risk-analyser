
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { botResponses } from "@/utils/mockData";

type Message = {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

export function ConversationalBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I am your Project Risk AI Assistant. You can ask me about project risks, status updates, or market trends. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      let botReply = generateResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: botReply,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const userText = userInput.toLowerCase();
    
    // Check for project status queries
    if (userText.includes('project') && (userText.includes('status') || userText.includes('update'))) {
      const projectName = extractProjectName(userText);
      if (projectName) {
        return botResponses.projectStatus(projectName);
      } else {
        return "Which project would you like to know about? We're currently tracking Cloud Migration, CRM Implementation, and E-Commerce Platform.";
      }
    } 
    
    // Check for risk overview queries
    else if (
      (userText.includes('risk') && (userText.includes('overview') || userText.includes('summary'))) || 
      userText.includes('overall risk') ||
      userText.match(/risk.{0,10}summary/)
    ) {
      return botResponses.overallRisk();
    } 
    
    // Check for market trend queries
    else if (
      userText.includes('market') || 
      userText.includes('trend') || 
      userText.includes('external') || 
      userText.includes('economy') || 
      userText.includes('indicator')
    ) {
      return botResponses.marketTrends();
    }
    
    // Check for high risk inquiries
    else if (
      (userText.includes('high') || userText.includes('critical')) && 
      userText.includes('risk')
    ) {
      return "The highest risk currently identified is the Payment Gateway Integration Failure in the E-Commerce Platform project, with a 75% probability and 95% impact rating. This critical risk requires immediate attention.";
    }
    
    // Check for mitigation strategy inquiries
    else if (
      userText.includes('mitigate') || 
      userText.includes('mitigation') || 
      userText.includes('fix') || 
      userText.includes('resolve') || 
      userText.includes('solution')
    ) {
      if (userText.includes('security') || userText.includes('breach')) {
        return "For data security risks, we recommend implementing advanced encryption protocols, conducting regular security audits, and implementing a zero-trust architecture. Would you like me to provide more specific recommendations?";
      } else if (userText.includes('payment') || userText.includes('gateway')) {
        return "For the payment gateway integration issue, we recommend engaging directly with the payment gateway vendor's support team, implementing a fallback payment processor, and extending the testing period by two weeks.";
      } else {
        return "I can suggest mitigation strategies for specific risks. Could you specify which risk area you're concerned about? Common categories include security, technical, operational, or people-related risks.";
      }
    }
    
    // Check for budget inquiries
    else if (userText.includes('budget') || userText.includes('cost') || userText.includes('spending')) {
      if (userText.includes('cloud') || userText.includes('migration')) {
        return "The Cloud Migration project has spent $275,000 of its $500,000 budget (55%), with 45% progress completed. This suggests the project is slightly over budget relative to completion.";
      } else if (userText.includes('crm')) {
        return "The CRM Implementation project has spent $150,000 of its $300,000 budget (50%), with 60% progress completed. This project is currently under budget relative to completion.";
      } else if (userText.includes('ecommerce') || userText.includes('e-commerce')) {
        return "The E-Commerce Platform project has spent $600,000 of its $750,000 budget (80%), with 70% progress completed. This project is currently over budget and requires financial review.";
      } else {
        return "Across all projects, the current spending is $1,025,000 out of a total budget of $1,550,000 (66%). Would you like details on a specific project's budget?";
      }
    }
    
    // Check for timeline/schedule inquiries
    else if (
      userText.includes('timeline') || 
      userText.includes('schedule') || 
      userText.includes('deadline') || 
      userText.includes('delay')
    ) {
      if (userText.includes('cloud') || userText.includes('migration')) {
        return "The Cloud Migration project started on June 1, 2023 and is scheduled to complete by December 31, 2023. It's currently at 45% completion and flagged as At Risk due to security concerns.";
      } else if (userText.includes('crm')) {
        return "The CRM Implementation project started on April 1, 2023 and is scheduled to complete by October 31, 2023. It's currently at 60% completion and On Track.";
      } else if (userText.includes('ecommerce') || userText.includes('e-commerce')) {
        return "The E-Commerce Platform project started on January 15, 2023 and was scheduled to complete by September 30, 2023. It's currently Delayed with 70% completion due to technical integration issues.";
      } else {
        return "Two of our three active projects are behind their ideal progress timelines. The E-Commerce Platform is officially delayed, while Cloud Migration is at risk of delay. Would you like specific timeline information for any project?";
      }
    }
    
    // Help or example queries
    else if (userText.includes('help') || userText.includes('example') || userText.includes('what can you do')) {
      return "I can help you with information about project risks, status updates, market trends, budget information, and timelines. Try asking me questions like:\n\n- 'What's the status of the Cloud Migration project?'\n- 'Give me an overall risk summary'\n- 'What are the current market trends affecting our projects?'\n- 'What's our highest risk right now?'\n- 'How is the E-Commerce Platform budget looking?'";
    }
    
    // Greeting responses
    else if (userText.match(/^(hi|hello|hey|greetings).{0,10}$/)) {
      return "Hello! I'm your Project Risk AI Assistant. How can I help you analyze your project risks today?";
    }
    
    // Fallback response
    else {
      return "I'm here to help with project risk assessment and management. Could you clarify what you'd like to know? You can ask about project status, risk overviews, market trends, budgets, or timelines.";
    }
  };

  const extractProjectName = (text: string): string | null => {
    // Simple extraction - assumes project name follows "project" keyword
    const projectKeywords = ["project", "status of", "update on"];
    
    for (const keyword of projectKeywords) {
      const index = text.toLowerCase().indexOf(keyword);
      if (index >= 0) {
        const afterKeyword = text.slice(index + keyword.length).trim();
        // Take the next 1-3 words as potential project name
        const words = afterKeyword.split(' ');
        if (words.length > 0) {
          // Try to match with one, two, or three words
          for (let i = 1; i <= 3; i++) {
            if (i <= words.length) {
              const potentialName = words.slice(0, i).join(' ');
              // Check if this matches any project name (simplified for demo)
              if (potentialName.length > 2) {
                return potentialName;
              }
            }
          }
        }
      }
    }
    
    // Match common project names directly
    const projectNames = ["cloud migration", "cloud", "migration", "crm", "crm implementation", "ecommerce", "e-commerce", "e commerce", "ecommerce platform", "e-commerce platform"];
    for (const name of projectNames) {
      if (text.toLowerCase().includes(name)) {
        return name;
      }
    }
    
    return null;
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Risk Management AI Assistant
        </CardTitle>
        <CardDescription>
          Ask questions about project risks, status updates, and market trends
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden px-4">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.type === 'user'
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <div className="flex items-center gap-2">
                  {message.type === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="font-medium">
                    {message.type === 'bot' ? 'AI Assistant' : 'You'}
                  </span>
                </div>
                <div>{message.text}</div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span className="font-medium">AI Assistant</span>
                </div>
                <div>Thinking...</div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask about project risks, status, or market trends..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
