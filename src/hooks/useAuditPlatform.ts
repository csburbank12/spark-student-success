
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PlatformAuditService } from "@/services/PlatformAuditService";
import { toast } from "sonner";

export function useAuditPlatform() {
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

  return {
    isAuditing,
    auditResults,
    auditError,
    runAudit
  };
}
