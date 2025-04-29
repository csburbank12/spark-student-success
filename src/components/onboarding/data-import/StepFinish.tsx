
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Users, RefreshCw } from "lucide-react";
import useWindowSize from '@/hooks/use-window-size';

interface ImportSummary {
  totalRecords: number;
  successfulImports: number;
  failedImports: number;
  errors: any[];
}

export interface StepFinishProps {
  importSummary: ImportSummary;
  onFinish: () => void;
  onViewStudents: () => void;
  onReset: () => void;
}

const StepFinish: React.FC<StepFinishProps> = ({ importSummary, onFinish, onViewStudents, onReset }) => {
  const { width } = useWindowSize();
  const isMobile = width ? width < 640 : false;

  const isSuccess = importSummary.failedImports === 0;
  const successPercentage = importSummary.totalRecords > 0 
    ? Math.round((importSummary.successfulImports / importSummary.totalRecords) * 100)
    : 0;
    
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col items-center text-center space-y-2">
          {isSuccess ? (
            <CheckCircle className="h-12 w-12 text-green-500" />
          ) : (
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          )}
          <CardTitle className="text-2xl">
            {isSuccess ? "Import Complete!" : "Import Completed with Warnings"}
          </CardTitle>
          <CardDescription>
            {isSuccess
              ? "All records were successfully imported."
              : `${importSummary.successfulImports} of ${importSummary.totalRecords} records were imported successfully.`}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-2xl font-bold">{importSummary.totalRecords}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Records</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {importSummary.successfulImports}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Successful</p>
            </div>
            <div className={`${importSummary.failedImports > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-muted/30'} p-4 rounded-lg`}>
              <p className={`text-2xl font-bold ${importSummary.failedImports > 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                {importSummary.failedImports}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Failed</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-4 border rounded-lg">
            <div className="text-4xl font-bold text-primary">{successPercentage}%</div>
            <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
          </div>

          {importSummary.errors.length > 0 && (
            <div className="border border-red-200 rounded-lg p-4 bg-red-50 dark:bg-red-900/10">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Error Summary</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {importSummary.errors.slice(0, 5).map((error, index) => (
                  <li key={index} className="text-muted-foreground">
                    {error.message || 'Unknown error'}
                  </li>
                ))}
                {importSummary.errors.length > 5 && (
                  <li className="text-muted-foreground">
                    ... and {importSummary.errors.length - 5} more errors
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className={`flex ${isMobile ? 'flex-col' : 'justify-between'} gap-4`}>
        <div className={isMobile ? 'w-full' : ''}>
          <Button 
            onClick={onReset} 
            variant="outline" 
            className="flex items-center gap-2"
            size={isMobile ? 'lg' : 'default'}
            className={isMobile ? 'w-full' : ''}
          >
            <RefreshCw className="h-4 w-4" />
            Import More
          </Button>
        </div>
        <div className={`flex gap-3 ${isMobile ? 'w-full' : ''}`}>
          <Button 
            onClick={onViewStudents}
            variant="secondary"
            size={isMobile ? 'lg' : 'default'}
            className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}
          >
            <Users className="h-4 w-4" />
            View Students
          </Button>
          <Button 
            onClick={onFinish}
            size={isMobile ? 'lg' : 'default'}
            className={isMobile ? 'w-full' : ''}
          >
            Complete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StepFinish;
