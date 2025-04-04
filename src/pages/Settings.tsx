
import { UserProfile } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="account">Account Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
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
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Account Preferences</h3>
                <p className="text-muted-foreground">
                  Manage your account preferences, notifications, and other settings.
                </p>
                {/* More account settings would go here */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                <p className="text-muted-foreground">
                  Manage your security settings, password, and two-factor authentication.
                </p>
                {/* More security settings would go here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
