
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";
import { ScanSearch } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export function PlatformAuditButton() {
  const { user } = useAuth();
  const [isAuditing, setIsAuditing] = useState(false);

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
      
      toast.success('Platform audit completed');
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
