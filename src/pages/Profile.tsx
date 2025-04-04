
import { UserProfile } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
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
      </div>
    </DashboardLayout>
  );
};

export default Profile;
