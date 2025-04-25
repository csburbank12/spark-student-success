import React from "react";
import { DataAccessRequestForm } from "@/components/privacy/DataAccessRequestForm";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const DataAccessRequests = () => {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <PageHeader title="Data Access Requests" />
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>FERPA Rights Information</AlertTitle>
          <AlertDescription>
            Under the Family Educational Rights and Privacy Act (FERPA), you have the right to inspect and review your education records,
            request amendments, and have control over the disclosure of personally identifiable information from your records.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="new-request">
          <TabsList>
            <TabsTrigger value="new-request">New Request</TabsTrigger>
            <TabsTrigger value="request-history">Request History</TabsTrigger>
          </TabsList>
          <TabsContent value="new-request" className="mt-6">
            <DataAccessRequestForm />
          </TabsContent>
          <TabsContent value="request-history" className="mt-6">
            <div className="text-center p-12 border rounded-lg">
              <p className="text-muted-foreground">No previous requests found.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default DataAccessRequests;
