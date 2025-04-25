
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, RefreshCw } from 'lucide-react';
import { PlatformAudit } from '@/components/admin-dashboard/platform-audit/PlatformAudit';

const AuditDashboard = () => {
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
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Check system compliance with educational privacy regulations.
            </p>
            <Button variant="outline" className="w-full">
              Run FERPA Audit
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Security Audit</h3>
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Complete security analysis of platform configurations.
            </p>
            <Button variant="outline" className="w-full">
              Run Security Scan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Permission Review</h3>
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Verify role-based permissions across the application.
            </p>
            <Button variant="outline" className="w-full">
              Check Permissions
            </Button>
          </CardContent>
        </Card>
      </div>

      <PlatformAudit />

      <div className="text-center mt-4">
        <Button className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" /> 
          Run Full System Audit
        </Button>
      </div>
    </div>
  );
};

export default AuditDashboard;
