
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlatformAuditButton } from "./alerts/PlatformAuditButton";
import { AlertsList } from "./alerts/AlertsList";

const SystemAlertsCard = () => {
  const [auditResults, setAuditResults] = useState<{
    status: 'success' | 'warning' | 'error';
    summary: string;
    details: any;
  } | null>(null);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>System-wide Alerts</CardTitle>
        <PlatformAuditButton />
      </CardHeader>
      <CardContent>
        <AlertsList auditResults={auditResults} />
      </CardContent>
    </Card>
  );
};

export default SystemAlertsCard;
