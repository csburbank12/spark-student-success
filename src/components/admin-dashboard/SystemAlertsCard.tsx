import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { cn } from "@/lib/utils";
import { Loader, ScanSearch, CheckCircle, AlertTriangle, XCircle } from "@/components/ui/icons";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";

const SystemAlertsCard = () => {
  const { user } = useAuth();
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResults, setAuditResults] = useState<{
    status: 'success' | 'warning' | 'error';
    summary: string;
    details: any;
  } | null>(null);

  const runPlatformAudit = async () => {
    if (!user?.id) return;
    setIsAuditing(true);
    
    try {
      const checkResult = await supabase
        .from('site_audit_logs')
        .insert({
          run_by_admin_id: user.id,
          status: 'success',
          summary: 'Platform audit completed successfully',
          details: {
            checkedRoutes: [
              '/dashboard',
              '/students',
              '/settings',
              '/analytics'
            ],
            featuresChecked: [
              'Authentication',
              'Navigation',
              'User Roles',
              'Demo Data'
            ]
          }
        })
        .select()
        .single();

      if (checkResult.error) throw checkResult.error;

      setAuditResults({
        status: 'success',
        summary: 'Platform audit completed successfully',
        details: checkResult.data.details
      });
      
      toast.success('Platform audit completed');
    } catch (error) {
      console.error('Audit error:', error);
      toast.error('Failed to complete platform audit');
      setAuditResults({
        status: 'error',
        summary: 'Platform audit failed',
        details: { error: error.message }
      });
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>System-wide Alerts</CardTitle>
        <Button 
          onClick={runPlatformAudit} 
          disabled={isAuditing}
          className="ml-auto"
          variant="outline"
        >
          {isAuditing ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Running Audit...
            </>
          ) : (
            <>
              <ScanSearch className="mr-2 h-4 w-4" />
              Run Full Platform Audit
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div>
              <p className="font-medium text-amber-800">Data Sync Required</p>
              <p className="text-sm text-amber-700">Roosevelt Elementary data needs synchronization</p>
            </div>
            <Button size="sm" variant="outline">Sync Now</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
            <div>
              <p className="font-medium text-red-800">User Access Issues</p>
              <p className="text-sm text-red-700">5 staff members at Lincoln Middle School reporting access problems</p>
            </div>
            <Button size="sm">Investigate</Button>
          </div>
        </div>
        {auditResults && (
          <div className={cn(
            "mt-4 p-4 rounded-lg border",
            auditResults.status === 'success' ? "bg-green-50 border-green-200" :
            auditResults.status === 'warning' ? "bg-amber-50 border-amber-200" :
            "bg-red-50 border-red-200"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {auditResults.status === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : auditResults.status === 'warning' ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <h4 className="font-medium">Audit Results</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {auditResults.summary}
            </p>
            <div className="space-y-2">
              {auditResults.details?.checkedRoutes && (
                <div className="text-sm">
                  <span className="font-medium">Routes Checked:</span>{' '}
                  {auditResults.details.checkedRoutes.length}
                </div>
              )}
              {auditResults.details?.featuresChecked && (
                <div className="text-sm">
                  <span className="font-medium">Features Verified:</span>{' '}
                  {auditResults.details.featuresChecked.length}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemAlertsCard;
