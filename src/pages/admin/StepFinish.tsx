
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, FileText, Users } from 'lucide-react';

interface ImportSummary {
  totalRecords: number;
  successfulImports: number;
  failedImports: number;
  errors: string[];
}

interface StepFinishProps {
  importSummary: ImportSummary;
  onFinish: () => void;
  onViewStudents: () => void;
  onReset: () => void;
}

export const StepFinish: React.FC<StepFinishProps> = ({
  importSummary,
  onFinish,
  onViewStudents,
  onReset
}) => {
  const successRate = importSummary.totalRecords > 0
    ? Math.round((importSummary.successfulImports / importSummary.totalRecords) * 100)
    : 0;
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          Import Complete
        </CardTitle>
        <CardDescription>
          Your data has been imported to the system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-3xl font-bold">{importSummary.totalRecords}</p>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {importSummary.successfulImports}
            </p>
            <p className="text-sm text-muted-foreground">Successful</p>
          </div>
          <div className={`p-4 ${importSummary.failedImports > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-muted/50'} rounded-lg`}>
            <p className={`text-3xl font-bold ${importSummary.failedImports > 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
              {importSummary.failedImports}
            </p>
            <p className="text-sm text-muted-foreground">Failed</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Success Rate</span>
            <span className="text-sm font-medium">{successRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${successRate}%` }}
            ></div>
          </div>
        </div>

        {importSummary.failedImports > 0 && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <h3 className="font-medium">Import Errors</h3>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {importSummary.errors.map((error, index) => (
                <li key={index} className="text-muted-foreground">{error}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between">
        <div className="w-full sm:w-auto">
          <Button onClick={onReset} variant="outline" className="w-full">
            Start New Import
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={onViewStudents} className="flex items-center gap-2 w-full">
            <Users className="h-4 w-4" />
            View Students
          </Button>
          <Button onClick={onFinish} variant="secondary" className="flex items-center gap-2 w-full">
            <FileText className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
