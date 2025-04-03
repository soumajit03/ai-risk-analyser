
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
      let botReply = "I'm not sure how to respond to that. Try asking about project status, risk overview, or market trends.";
      
      // Check for keywords in user message
      const userText = input.toLowerCase();
      
      if (userText.includes('project') && (userText.includes('status') || userText.includes('update'))) {
        const projectName = extractProjectName(userText);
        if (projectName) {
          botReply = botResponses.projectStatus(projectName);
        } else {
          botReply = "Which project would you like to know about? Please specify a project name.";
        }
      } else if (
        (userText.includes('risk') && userText.includes('overview')) || 
        userText.includes('overall risk') ||
        userText.includes('summary')
      ) {
        botReply = botResponses.overallRisk();
      } else if (
        userText.includes('market') || 
        userText.includes('trend') || 
        userText.includes('external')
      ) {
        botReply = botResponses.marketTrends();
      }
      
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
