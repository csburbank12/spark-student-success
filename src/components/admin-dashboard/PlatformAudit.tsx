
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlatformAuditService } from "@/services/PlatformAuditService";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, AlertTriangle, Loader } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function PlatformAudit() {
  const { user } = useAuth();
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResults, setAuditResults] = useState<any>(null);
  const [auditError, setAuditError] = useState<string | null>(null);

  const runAudit = async () => {
    if (!user?.id) {
      toast.error("You must be logged in to run an audit");
      return;
    }

    setIsAuditing(true);
    setAuditError(null);
    
    try {
      const results = await PlatformAuditService.performAudit({
        checkAllRoles: true,
        checkRoutes: true,
        checkComponents: true,
        logErrors: true,
        currentUserOnly: false
      });
      
      setAuditResults(results);
      
      if (results.success) {
        toast.success("✅ Audit complete: No critical errors detected");
      } else {
        toast.error("❌ Issues found: See admin panel > Error Logs", {
          description: `${results.errorCount} issues detected`
        });
      }
    } catch (error) {
      setAuditError(error instanceof Error ? error.message : "Unknown error occurred during audit");
      toast.error("Audit failed to complete", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Platform Functionality Audit</CardTitle>
        <CardDescription>
          Run a comprehensive scan across all user profiles, pages, and components
        </CardDescription>
      </CardHeader>
      <CardContent>
        {auditError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{auditError}</AlertDescription>
          </Alert>
        )}

        {auditResults && (
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
        )}

        <div className="flex items-center justify-center py-8">
          <Button 
            onClick={runAudit} 
            disabled={isAuditing}
            size="lg"
            className="gap-2"
          >
            {isAuditing ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Auditing Platform...
              </>
            ) : (
              'Run Platform Audit'
            )}
          </Button>
        </div>
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
