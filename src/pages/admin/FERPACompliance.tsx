import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FERPAAuditLogs } from "@/components/admin/FERPAAuditLogs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { UserRole } from "@/types/roles";
import { AlertCircle, CheckCircle, Clock, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const FERPACompliance = () => {
  return (
    <ProtectedRoute requiredRole={[UserRole.admin]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-heading font-bold">FERPA Compliance Management</h2>
          <Button variant="outline" asChild>
            <Link to="/privacy-policy">
              <FileText className="mr-2 h-4 w-4" />
              View Privacy Policy
            </Link>
          </Button>
        </div>
        
        {/* Compliance Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="mr-2 h-5 w-5 text-green-600" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">FERPA Compliant</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Last compliance review: Apr 15, 2023
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <AlertCircle className="mr-2 h-5 w-5 text-amber-600" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-medium">2 pending record access requests</div>
              <p className="text-sm text-muted-foreground mt-2">
                Oldest request: 3 days ago (due in 42 days)
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                Next Scheduled Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-medium">May 30, 2023</div>
              <p className="text-sm text-muted-foreground mt-2">
                Scheduled quarterly compliance audit
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="audit-logs">
          <TabsList>
            <TabsTrigger value="audit-logs">Access Audit Logs</TabsTrigger>
            <TabsTrigger value="access-requests">Record Access Requests</TabsTrigger>
            <TabsTrigger value="consent-management">Consent Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="audit-logs" className="mt-6">
            <FERPAAuditLogs />
          </TabsContent>
          
          <TabsContent value="access-requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>FERPA Record Access Requests</CardTitle>
                <CardDescription>
                  Manage and respond to student and parent requests for educational records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left align-middle font-medium">Request Date</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Requester</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Request Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Due Date</th>
                        <th className="h-10 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Apr 21, 2023</td>
                        <td className="p-4 align-middle font-medium">Sarah Johnson (Parent)</td>
                        <td className="p-4 align-middle">Access</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                            Pending
                          </span>
                        </td>
                        <td className="p-4 align-middle">Jun 05, 2023</td>
                        <td className="p-4 align-middle text-right">
                          <Button size="sm">Process</Button>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Apr 19, 2023</td>
                        <td className="p-4 align-middle font-medium">Alex Johnson (Student)</td>
                        <td className="p-4 align-middle">Amendment</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                            Pending
                          </span>
                        </td>
                        <td className="p-4 align-middle">Jun 03, 2023</td>
                        <td className="p-4 align-middle text-right">
                          <Button size="sm">Process</Button>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Mar 15, 2023</td>
                        <td className="p-4 align-middle font-medium">Michael Davis (Parent)</td>
                        <td className="p-4 align-middle">Access</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            Completed
                          </span>
                        </td>
                        <td className="p-4 align-middle">Apr 29, 2023</td>
                        <td className="p-4 align-middle text-right">
                          <Button size="sm" variant="outline">View Details</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consent-management" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>School-Wide Consent Management</CardTitle>
                <CardDescription>
                  Configure default consent settings and monitor consent statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="text-2xl font-bold">98%</div>
                    <p className="text-sm text-muted-foreground">Students with active consent</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-sm text-muted-foreground">Consent withdrawals this month</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="text-2xl font-bold">45%</div>
                    <p className="text-sm text-muted-foreground">Optional consent participation</p>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">Annual Consent Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Last bulk consent refresh: August 15, 2022
                  </p>
                  <Button>Schedule Annual Consent Refresh</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default FERPACompliance;
