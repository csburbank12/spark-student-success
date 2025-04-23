
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import TrustedAdultSelector from "@/components/student-relationships/TrustedAdultSelector";
import { Loader } from "@/components/ui/loader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const TrustedAdultSelection: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is loaded
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  // Show feedback when selections are saved
  const handleSelectionsChange = async (selections: any[]) => {
    console.log("Trusted adult selections changed:", selections);
    // This is handled in the TrustedAdultSelector component via useTrustedAdults hook
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-bold">Your Support Network</h2>
        <p className="text-muted-foreground">Choose trusted adults you feel comfortable talking to when you need help</p>
      </div>
      
      <TrustedAdultSelector 
        studentId={user?.id || ""}
        onSelectionsChange={handleSelectionsChange}
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Trusted Adults?</CardTitle>
            <CardDescription>Creating your support network at school</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Having trusted adults at school creates a safety net when you're feeling stressed, upset, or need someone to talk to.
              Your selections are private and only visible to you and the school counseling team.
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5">
              <li>Teachers, counselors, and staff who know you well</li>
              <li>People you feel comfortable talking to in difficult situations</li>
              <li>Adults who can help you navigate challenges</li>
              <li>Supportive figures for both academic and personal issues</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Building your support network</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 list-decimal pl-5">
              <li>
                <strong>Select Your Trusted Adults</strong>
                <p className="text-muted-foreground mt-1">Choose up to 3 staff members you trust and feel comfortable with.</p>
              </li>
              <li>
                <strong>Access Support When Needed</strong>
                <p className="text-muted-foreground mt-1">Your trusted adults will be notified that you've selected them, making it easier to reach out.</p>
              </li>
              <li>
                <strong>Update Anytime</strong>
                <p className="text-muted-foreground mt-1">You can change your trusted adults selection at any time as relationships develop.</p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrustedAdultSelection;
