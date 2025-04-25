
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";
import { ScanSearch } from "lucide-react";
import { toast } from "sonner";
import { PlatformAuditService } from "@/services/PlatformAuditService";

export function PlatformAuditButton() {
  const { user } = useAuth();
  const [isAuditing, setIsAuditing] = useState(false);

  const runPlatformAudit = async () => {
    if (!user?.id) return;
    setIsAuditing(true);
    
    try {
      const auditResult = await PlatformAuditService.performAudit({
        checkAllRoles: true,
        checkRoutes: true,
        checkComponents: true,
        logErrors: true,
        currentUserOnly: false
      });
      
      if (auditResult.success) {
        toast.success("✅ Audit complete: No critical errors detected");
      } else {
        toast.error(`❌ Issues found: ${auditResult.errorCount} issues detected`, {
          description: "See admin panel > Error Logs for details"
        });
      }
    } catch (error) {
      console.error('Audit error:', error);
      toast.error('Failed to complete platform audit');
    } finally {
      setIsAuditing(false);
    }
  };

  return (
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
  );
}
