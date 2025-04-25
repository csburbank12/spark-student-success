
import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { PlatformAudit } from '@/components/admin-dashboard/platform-audit/PlatformAudit';
import { useAuditPlatform } from '@/hooks/useAuditPlatform';
import { Loader } from '@/components/ui/loader';
import { SystemHealthCheckService } from '@/services/SystemHealthCheckService';
import { ErrorMonitoringService } from '@/services/ErrorMonitoringService';

const AuditDashboard = () => {
  const { isAuditing, auditResults, auditError, runAudit } = useAuditPlatform();
  const [isRunningSecurityAudit, setIsRunningSecurityAudit] = useState(false);
  const [isRunningFerpaAudit, setIsRunningFerpaAudit] = useState(false);
  const [isRunningPermissionAudit, setIsRunningPermissionAudit] = useState(false);
  const [securityResults, setSecurityResults] = useState<any>(null);
  const [ferpaResults, setFerpaResults] = useState<any>(null);
  const [permissionResults, setPermissionResults] = useState<any>(null);

  const runSecurityAudit = async () => {
    setIsRunningSecurityAudit(true);
    try {
      const result = await SystemHealthCheckService.checkSecurity();
      setSecurityResults(result);
      if (result.success) {
        toast.success("✅ Security audit passed");
      } else {
        toast.error("❌ Security vulnerabilities detected", {
          description: `${result.errorCount} issues found`
        });
      }
    } catch (error) {
      console.error("Security audit failed:", error);
    } finally {
      setIsRunningSecurityAudit(false);
    }
  };

  const runFerpaAudit = async () => {
    setIsRunningFerpaAudit(true);
    try {
      const result = await SystemHealthCheckService.checkFerpaCompliance();
      setFerpaResults(result);
      if (result.success) {
        toast.success("✅ FERPA compliance verified");
      } else {
        toast.error("❌ FERPA compliance issues detected", {
          description: `${result.errorCount} compliance issues found`
        });
      }
    } catch (error) {
      console.error("FERPA audit failed:", error);
    } finally {
      setIsRunningFerpaAudit(false);
    }
  };

  const runPermissionAudit = async () => {
    setIsRunningPermissionAudit(true);
    try {
      const result = await SystemHealthCheckService.checkPermissions();
      setPermissionResults(result);
      if (result.success) {
        toast.success("✅ Permission configuration valid");
      } else {
        toast.error("❌ Permission configuration issues detected", {
          description: `${result.errorCount} permission issues found`
        });
      }
    } catch (error) {
      console.error("Permission audit failed:", error);
    } finally {
      setIsRunningPermissionAudit(false);
    }
  };

  useEffect(() => {
    // Auto-run basic health check on mount
    SystemHealthCheckService.runQuickHealthCheck();
  }, []);

  const renderCardStatus = (results: any) => {
    if (!results) return null;
    return results.success ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-500" />
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Platform Audit Dashboard" 
        description="Comprehensive security and compliance analysis tools"
        showBackButton
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">FERPA Compliance</h3>
              <div className="flex items-center gap-2">
                {isRunningFerpaAudit ? (
                  <Loader size="sm" />
                ) : (
                  renderCardStatus(ferpaResults)
                )}
                <Shield className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Check system compliance with educational privacy regulations.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={runFerpaAudit}
              disabled={isRunningFerpaAudit}
            >
              {isRunningFerpaAudit ? "Running FERPA Audit..." : "Run FERPA Audit"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Security Audit</h3>
              <div className="flex items-center gap-2">
                {isRunningSecurityAudit ? (
                  <Loader size="sm" />
                ) : (
                  renderCardStatus(securityResults)
                )}
                <Shield className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Complete security analysis of platform configurations.
            </p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={runSecurityAudit}
              disabled={isRunningSecurityAudit}
            >
              {isRunningSecurityAudit ? "Running Security Scan..." : "Run Security Scan"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Permission Review</h3>
              <div className="flex items-center gap-2">
                {isRunningPermissionAudit ? (
                  <Loader size="sm" />
                ) : (
                  renderCardStatus(permissionResults)
                )}
                <Shield className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Verify role-based permissions across the application.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={runPermissionAudit}
              disabled={isRunningPermissionAudit}
            >
              {isRunningPermissionAudit ? "Checking Permissions..." : "Check Permissions"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <PlatformAudit />

      <div className="text-center mt-4">
        <Button 
          className="flex items-center gap-2"
          onClick={runAudit}
          disabled={isAuditing}
        >
          <RefreshCw className={`h-4 w-4 ${isAuditing ? 'animate-spin' : ''}`} /> 
          {isAuditing ? "Running Full Audit..." : "Run Full System Audit"}
        </Button>
      </div>
    </div>
  );
};

export default AuditDashboard;
