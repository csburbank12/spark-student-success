
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Upload, Info, Search } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { toast } from "sonner";

const DataAccess = () => {
  const handleDownload = (type: string) => {
    toast.success(`Preparing ${type} for download. You'll be notified when it's ready.`);
  };
  
  const handleUpload = () => {
    toast.info("This feature is coming soon!");
  };
  
  const handleDataRequest = () => {
    toast.success("Your data access request has been submitted. We'll process it within 45 days as required by FERPA.");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Data Access & Management" />
      
      <Card>
        <CardHeader>
          <CardTitle>FERPA Data Access Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground space-y-2 mb-6">
            <p>
              Under the Family Educational Rights and Privacy Act (FERPA), you have the right to:
            </p>
            <ul className="list-disc pl-6">
              <li>Inspect and review your child's educational records</li>
              <li>Request corrections to inaccurate or misleading information</li>
              <li>Control disclosure of personally identifiable information</li>
              <li>File a complaint with the Department of Education regarding FERPA compliance</li>
            </ul>
          </div>

          <Tabs defaultValue="download">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="download">Download Data</TabsTrigger>
              <TabsTrigger value="upload">Upload Documents</TabsTrigger>
              <TabsTrigger value="request">Special Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="download" className="pt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Download className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Academic Records</h3>
                        <p className="text-sm text-muted-foreground">
                          Download grades, attendance, and test scores
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload('academic records')}
                        >
                          Export (.xlsx)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Download className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Wellness Data</h3>
                        <p className="text-sm text-muted-foreground">
                          Download mood tracking and wellness information
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload('wellness data')}
                        >
                          Export (.xlsx)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Download className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Communication Logs</h3>
                        <p className="text-sm text-muted-foreground">
                          Download history of messages and communications
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload('communication logs')}
                        >
                          Export (.pdf)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Download className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Complete Data Archive</h3>
                        <p className="text-sm text-muted-foreground">
                          Download all data associated with your child
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload('complete data archive')}
                        >
                          Export (.zip)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-lg">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">Upload Documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload medical records, consent forms, or other documentation
                    </p>
                    <Button onClick={handleUpload}>Select Files</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="request" className="pt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="rounded-lg bg-amber-100 p-3">
                      <Info className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Request Specific Records</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Can't find what you're looking for? Submit a request for specific records.
                      </p>
                      <Button onClick={handleDataRequest}>Submit Data Request</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="rounded-lg bg-blue-100 p-3">
                      <Search className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Record Amendment Request</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        If you believe your child's records contain inaccurate information, submit a request to amend them.
                      </p>
                      <Button variant="outline" onClick={handleDataRequest}>Request Amendment</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAccess;
