
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditHeader } from "./AuditHeader";
import { AuditResults } from "./AuditResults";
import { AuditError } from "./AuditError";
import { useAuditPlatform } from "@/hooks/useAuditPlatform";

export function PlatformAudit() {
  const { isAuditing, auditResults, auditError, runAudit } = useAuditPlatform();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Platform Functionality Audit</CardTitle>
        <CardDescription>
          Run a comprehensive scan across all user profiles, pages, and components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuditError error={auditError} />
        <AuditResults auditResults={auditResults} />
        <AuditHeader isAuditing={isAuditing} onRunAudit={runAudit} />
      </CardContent>
      <CardFooter className="bg-muted/50 border-t px-6 py-3">
        <div className="text-xs text-muted-foreground">
          This feature checks all user profiles, routes, pages and critical components across the ThriveTrackED platform.
          Detailed log entries are stored in the error_logs table for review.
        </div>
      </CardFooter>
    </Card>
  );
}
