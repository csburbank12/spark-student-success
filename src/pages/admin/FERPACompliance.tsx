
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageHeader from "@/components/layout/PageHeader";
import { FERPAAuditLogs } from "@/components/admin/FERPAAuditLogs";
import { Shield, FileText, CheckCircle2, Users2 } from "lucide-react";

const FERPACompliance = () => {
  const [activeTab, setActiveTab] = useState("audit-logs");

  return (
    <div className="space-y-6">
      <PageHeader 
        title="FERPA Compliance Dashboard" 
        description="Monitor and manage educational privacy compliance" 
        icon={<Shield className="h-6 w-6 text-primary" />}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="audit-logs">Access Audit Logs</TabsTrigger>
          <TabsTrigger value="policies">Compliance Policies</TabsTrigger>
          <TabsTrigger value="consent">Consent Management</TabsTrigger>
          <TabsTrigger value="training">Staff Training</TabsTrigger>
        </TabsList>
        
        <TabsContent value="audit-logs" className="space-y-4">
          <FERPAAuditLogs />
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>FERPA Compliance Policies</CardTitle>
              </div>
              <CardDescription>Review and manage compliance documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-lg">Data Access Policy</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Last updated: April 15, 2024
                    </p>
                    <p className="mt-4 text-sm">
                      Defines who can access student information and under what circumstances.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-lg">Record Retention Policy</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Last updated: March 22, 2024
                    </p>
                    <p className="mt-4 text-sm">
                      Guidelines for how long different types of records must be maintained.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-lg">Parent/Student Rights</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Last updated: February 10, 2024
                    </p>
                    <p className="mt-4 text-sm">
                      Documentation of rights to inspect, review, and amend educational records.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-lg">Directory Information</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Last updated: January 5, 2024
                    </p>
                    <p className="mt-4 text-sm">
                      Policy on what information can be released without explicit consent.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="consent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Consent Management</CardTitle>
              </div>
              <CardDescription>Manage parental consents and authorizations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Coming soon: Tools to manage and track parental consent for student data access.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users2 className="h-5 w-5 text-primary" />
                <CardTitle>Staff FERPA Training</CardTitle>
              </div>
              <CardDescription>Track and manage staff compliance training</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Coming soon: Staff training modules and completion tracking.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FERPACompliance;
