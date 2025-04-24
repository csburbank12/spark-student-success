
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface AuditResult {
  status: 'success' | 'warning' | 'error';
  summary: string;
  details: any;
}

interface AlertsListProps {
  auditResults: AuditResult | null;
}

export function AlertsList({ auditResults }: AlertsListProps) {
  return (
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
    </div>
  );
}
