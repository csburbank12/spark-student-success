
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface AuditHeaderProps {
  isAuditing: boolean;
  onRunAudit: () => void;
}

export function AuditHeader({ isAuditing, onRunAudit }: AuditHeaderProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <Button 
        onClick={onRunAudit} 
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
  );
}
