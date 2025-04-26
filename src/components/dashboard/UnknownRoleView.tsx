
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const UnknownRoleView: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 max-w-2xl mx-auto py-8">
      <Alert>
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Role Not Recognized</AlertTitle>
        <AlertDescription>
          We couldn't determine your user role ({user?.role || "unknown"}). 
          This might be due to an incomplete account setup or a system error.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-center gap-4">
        <Button onClick={() => navigate("/select-role")}>
          Set Your Role
        </Button>
        <Button variant="outline" onClick={() => navigate("/profile")}>
          View Your Profile
        </Button>
      </div>
    </div>
  );
};
