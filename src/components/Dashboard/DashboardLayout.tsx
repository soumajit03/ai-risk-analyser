
import { useState } from "react";
import { Activity, AlertTriangle, BarChart, Bot, ChevronLeft, ChevronRight, Clock, FileText, Home, LineChart, Menu, Newspaper, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Market Analysis",
    icon: LineChart,
    href: "/market-analysis",
  },
  {
    title: "Risk Scoring",
    icon: AlertTriangle,
    href: "/risk-scoring",
  },
  {
    title: "Project Status",
    icon: Activity,
    href: "/project-status",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    title: "Chat Assistant",
    icon: Bot,
    href: "/chat-assistant",
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r bg-background transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed && (
            <h2 className="text-lg font-semibold">Risk Navigator</h2>
          )}
          <Button
            variant="outline"
            size="icon"
            className={cn("h-8 w-8", collapsed && "mx-auto")}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <TooltipProvider key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "justify-start",
                          collapsed ? "w-10 h-10 p-0 mx-auto" : "w-full"
                        )}
                        asChild
                      >
                        <Link to={item.href} onClick={() => setMobileMenuOpen(false)}>
                          <item.icon className={cn("h-5 w-5", !collapsed && "mr-2")} />
                          {!collapsed && <span>{item.title}</span>}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {item.title}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "justify-start",
                    collapsed ? "w-10 h-10 p-0" : ""
                  )}
                >
                  <Settings className={cn("h-5 w-5", !collapsed && "mr-2")} />
                  {!collapsed && <span>Settings</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  Settings
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          
          <ThemeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="font-semibold flex-1">Risk Navigator</div>
          <ThemeToggle />
        </header>

        {/* Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
