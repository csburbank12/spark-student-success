
import React from "react";
import { ConsentManagement } from "@/components/privacy/ConsentManagement";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const ConsentSettings = () => {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <PageHeader title="Privacy & Consent Settings" />
        <div className="flex justify-end">
          <Button variant="outline" asChild>
            <Link to="/privacy-policy">
              <FileText className="mr-2 h-4 w-4" />
              View Full Privacy Policy
            </Link>
          </Button>
        </div>
        
        <p className="text-muted-foreground">
          Manage your FERPA privacy settings and consent preferences. These settings control how your 
          educational data is collected, used, and shared.
        </p>
        
        <ConsentManagement />
      </div>
    </ProtectedRoute>
  );
};

export default ConsentSettings;
