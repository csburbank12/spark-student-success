
import React from "react";
import { useErrorLogs } from "@/hooks/useErrorLogs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformAudit } from "@/components/admin-dashboard/platform-audit/PlatformAudit";
import { PlatformAuditButton } from "@/components/admin-dashboard/alerts/PlatformAuditButton";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";

const AuditDashboard = () => {
  const { logs, isLoading, refreshLogs } = useErrorLogs(false, 50, 0);

  return (
    <GlobalErrorBoundary component="AuditDashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading font-bold">Platform Audit Dashboard</h2>
          <PlatformAuditButton />
        </div>

        <Tabs defaultValue="audit">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="audit">Platform Audit</TabsTrigger>
            <TabsTrigger value="error-logs">Error Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="audit" className="space-y-6">
            <PlatformAudit />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Audit History</CardTitle>
                <CardDescription>
                  View historical platform audits and their results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-6">
                  Run your first platform audit to see history.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="error-logs">
            <Card>
              <CardHeader>
                <CardTitle>Latest Error Logs</CardTitle>
                <CardDescription>
                  View recent error logs from across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-6">Loading error logs...</div>
                ) : logs.length > 0 ? (
                  <div className="space-y-4">
                    {logs.map((log) => (
                      <div key={log.id} className="border rounded-md p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{log.action}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{log.error_message}</p>
                        <div className="mt-2 flex gap-2 text-xs">
                          <span className="bg-muted px-2 py-1 rounded-md">
                            Profile: {log.profile_type || "unknown"}
                          </span>
                          {log.status_code && (
                            <span className="bg-muted px-2 py-1 rounded-md">
                              Status: {log.status_code}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No error logs found. Your platform is running smoothly!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </GlobalErrorBoundary>
  );
};

export default AuditDashboard;
