
import { SignIn } from '@clerk/clerk-react';
import { Card, CardContent } from '@/components/ui/card';

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold">Risk Navigator</h1>
            <p className="text-muted-foreground">Sign in to access your dashboard</p>
          </div>
          <SignIn 
            appearance={{
              elements: {
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formButtonPrimary: "bg-primary hover:bg-primary/90",
                footerAction: "text-primary",
              }
            }}
            routing="path"
            path="/"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
