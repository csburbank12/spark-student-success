
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const StaffAssistAccessDenied: React.FC = () => (
  <div className="max-w-lg mx-auto mt-8 md:mt-20 px-4">
    <Card className="border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-500" />
          <CardTitle className="text-xl md:text-2xl font-semibold">
            Access Denied
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base text-muted-foreground">
          You do not have permission to access Staff Assist Mode. This feature is available to staff and administrators only.
        </p>
        <p className="mt-4 text-sm">
          If you believe you should have access to this feature, please contact your system administrator.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default StaffAssistAccessDenied;
