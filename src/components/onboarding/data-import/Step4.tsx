
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface Step4Props {
  onNext: () => void;
}

export const Step4: React.FC<Step4Props> = ({ onNext }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Confirm and Import</CardTitle>
        <CardDescription>
          Review your data before importing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Data Source</h4>
              <p className="text-sm text-muted-foreground">PowerSchool API</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Records Detected</h4>
              <p className="text-sm text-muted-foreground">1,245 records</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Data Types</h4>
              <p className="text-sm text-muted-foreground">Students, Staff, Classes</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Connection Status</h4>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Connected</span>
              </div>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Field Mapping Warning</AlertTitle>
            <AlertDescription>
              There is 1 field with mapping issues. You can still proceed with the import, but some data may be skipped.
            </AlertDescription>
          </Alert>

          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted/40 px-4 py-2 border-b">
              <h4 className="font-medium">Data Preview</h4>
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground italic">
                First 5 records preview:
              </div>
              <div className="mt-2 text-xs overflow-x-auto">
                <pre className="bg-muted/30 p-2 rounded-md">
{`[
  {
    "studentId": "S1001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.edu",
    "gradeLevel": "9"
  },
  {
    "studentId": "S1002",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.edu", 
    "gradeLevel": "10"
  },
  ...
]`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Run Test Import</Button>
        <Button onClick={onNext}>Start Import</Button>
      </CardFooter>
    </Card>
  );
};
