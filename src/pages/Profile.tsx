
import { UserProfile } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects } from "@/utils/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  const { user } = useUser();
  
  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.firstName 
      ? user.firstName[0].toUpperCase()
      : "U";

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        
        <div className="grid gap-4 md:grid-cols-3">
          {/* User Info Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="text-3xl">{userInitials}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{user?.fullName || "User"}</h2>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <dl className="w-full divide-y divide-border">
                  <div className="flex justify-between py-2">
                    <dt className="font-medium">Member since</dt>
                    <dd className="text-muted-foreground">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="font-medium">Last sign in</dt>
                    <dd className="text-muted-foreground">{user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : "N/A"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          
          {/* Clerk Profile Management - Without Card background */}
          <div className="md:col-span-2">
            <UserProfile 
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-none bg-transparent",
                  navbar: "hidden",
                  pageScrollBox: "p-0",
                }
              }}
              routing="path"
              path="/"
            />
          </div>
        </div>
        
        {/* User's Projects */}
        <h2 className="text-xl font-bold mt-6 mb-3">Your Projects</h2>
        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        project.status === 'On Track' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                        project.status === 'At Risk' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                        project.status === 'Delayed' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                        'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-20" />
                        <span className="text-xs">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={
                        project.riskScore > 70 ? "px-2 py-1 rounded-md text-xs font-medium inline-block bg-red-100 text-red-800" :
                        project.riskScore > 50 ? "px-2 py-1 rounded-md text-xs font-medium inline-block bg-orange-100 text-orange-800" :
                        project.riskScore > 30 ? "px-2 py-1 rounded-md text-xs font-medium inline-block bg-yellow-100 text-yellow-800" : 
                        "px-2 py-1 rounded-md text-xs font-medium inline-block bg-green-100 text-green-800"
                      }>
                        {project.riskScore}/100
                      </div>
                    </TableCell>
                    <TableCell>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
