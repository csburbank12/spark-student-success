
import React from "react";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle } from "lucide-react";

interface AuditResultsProps {
  auditResults: any;
}

export function AuditResults({ auditResults }: AuditResultsProps) {
  if (!auditResults) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {auditResults.success ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <span className="font-medium">
            {auditResults.success ? "Audit passed" : "Audit failed"}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          {auditResults.totalChecked} checks performed, {auditResults.errorCount} issues found
        </div>
      </div>

      <Separator />
      
      {auditResults.errorCount > 0 && (
        <>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Issues Found:</h3>
            <ul className="space-y-1 text-sm">
              {auditResults.details.roleChecks
                .filter(check => check.status === 'error')
                .map((check, i) => (
                  <li key={`role-${i}`} className="text-red-500 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    <span>Role: {check.role} - {check.message}</span>
                  </li>
                ))}
                
              {auditResults.details.routeChecks
                .filter(check => check.status === 'error')
                .map((check, i) => (
                  <li key={`route-${i}`} className="text-red-500 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    <span>Route: {check.route} - {check.message}</span>
                  </li>
                ))}
                
              {auditResults.details.componentChecks
                .filter(check => check.status === 'error')
                .map((check, i) => (
                  <li key={`component-${i}`} className="text-red-500 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    <span>Component: {check.component} - {check.message}</span>
                  </li>
                ))}
            </ul>
          </div>
          <Separator />
        </>
      )}
    </div>
  );
}
