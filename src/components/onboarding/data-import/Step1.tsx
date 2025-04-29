
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Step1Props {
  onNext: () => void;
}

export const Step1: React.FC<Step1Props> = ({ onNext }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Data Source</CardTitle>
        <CardDescription>
          Choose the source of your data for import
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <h3 className="font-medium text-lg">Import from SIS</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Connect to your Student Information System
            </p>
          </div>
          <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <h3 className="font-medium text-lg">Upload CSV File</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Upload a CSV file with your data
            </p>
          </div>
          <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <h3 className="font-medium text-lg">Manual Entry</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enter data manually in the system
            </p>
          </div>
          <div className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors">
            <h3 className="font-medium text-lg">API Connection</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Connect via API to your existing systems
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};
