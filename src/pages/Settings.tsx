
import { UserProfile } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell, Shield, Eye, EyeOff, User, Smartphone } from "lucide-react";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [showRiskScore, setShowRiskScore] = useState(true);
  
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };
  
  const handleSavePreferences = () => {
    toast.success("Display preferences saved successfully");
  };
  
  const handleSaveSecurity = () => {
    toast.success("Security settings saved successfully");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </TabsTrigger>
            <TabsTrigger value="account">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Eye className="h-4 w-4 mr-2" />
              Display Preferences
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <UserProfile 
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-none",
                      navbar: "hidden",
                      pageScrollBox: "p-0",
                    }
                  }}
                  routing="path"
                  path="/"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and alerts about projects and risks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your devices
                      </p>
                    </div>
                    <Switch 
                      id="push-notifications" 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications} 
                    />
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Notification Types</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="risk-alerts">Risk Alerts</Label>
                        <Switch 
                          id="risk-alerts" 
                          checked={riskAlerts} 
                          onCheckedChange={setRiskAlerts} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="weekly-reports">Weekly Reports</Label>
                        <Switch 
                          id="weekly-reports" 
                          checked={weeklyReports} 
                          onCheckedChange={setWeeklyReports} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="project-updates">Project Updates</Label>
                        <Switch 
                          id="project-updates" 
                          checked={projectUpdates} 
                          onCheckedChange={setProjectUpdates} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>
                  Customize how the Risk Navigator dashboard appears to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark mode
                      </p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view">Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Display more data with less spacing
                      </p>
                    </div>
                    <Switch 
                      id="compact-view" 
                      checked={compactView} 
                      onCheckedChange={setCompactView} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-risk-score">Show Risk Scores</Label>
                      <p className="text-sm text-muted-foreground">
                        Display risk scores on dashboard
                      </p>
                    </div>
                    <Switch 
                      id="show-risk-score" 
                      checked={showRiskScore} 
                      onCheckedChange={setShowRiskScore} 
                    />
                  </div>
                </div>
                <Button onClick={handleSavePreferences}>Save Display Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your security settings and two-factor authentication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch 
                    id="two-factor-auth" 
                    checked={twoFactorAuth} 
                    onCheckedChange={setTwoFactorAuth} 
                  />
                </div>
                
                <div className="space-y-4 border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Device Management</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Windows PC - Chrome</p>
                          <p className="text-xs text-muted-foreground">Current device • Last active now</p>
                        </div>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">iPhone 13 - Safari</p>
                          <p className="text-xs text-muted-foreground">Last active 2 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSaveSecurity}>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
