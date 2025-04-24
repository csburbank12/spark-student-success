
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import TrustedAdultSelector from "@/components/student-relationships/TrustedAdultSelector";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TrustedAdults: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h2 className="text-3xl font-heading font-bold">Trusted Adults</h2>
        </div>
      </div>
      <p className="text-muted-foreground mt-1">
        Choose school staff members you feel comfortable talking with when you need help.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <TrustedAdultSelector 
          studentId={user?.id || ''} 
          maxSelections={3}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Trusted Adults?</CardTitle>
            <CardDescription>
              Having trusted adults at school provides support when you need it most.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Someone to Talk To</h4>
              <p className="text-sm text-muted-foreground mt-1">
                When you're feeling stressed, anxious, or overwhelmed, talking to a trusted adult can help.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Support During Challenges</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Trusted adults can provide guidance, advice, and assistance with academic or personal issues.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium">Building Connections</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Creating relationships with caring adults at school helps you feel more connected to your school community.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrustedAdults;
