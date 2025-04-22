
import React from "react";
import TrustedAdultSelector from "@/components/student-relationships/TrustedAdultSelector";
import { useAuth } from "@/contexts/AuthContext";

const TrustedAdultSelection: React.FC = () => {
  const { user } = useAuth();
  
  // In a real app, you would persist these selections to a database
  const handleSelectionsChange = (selections: any[]) => {
    console.log("Trusted adult selections changed:", selections);
    // Here you would save to database
  };

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
      
      <div className="rounded-lg border border-muted p-4 bg-muted/30">
        <h3 className="font-medium mb-2">Why choose trusted adults?</h3>
        <p className="text-sm text-muted-foreground">
          Having trusted adults at school creates a safety net when you're feeling stressed, upset, or need someone to talk to.
          Your selections are private and only visible to you and the school counseling team.
        </p>
      </div>
    </div>
  );
};

export default TrustedAdultSelection;
