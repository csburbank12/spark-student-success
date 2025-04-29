
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, DownloadCloud, Eye } from "lucide-react";
import { useWindowSize } from '@/hooks/use-window-size';
import { Progress } from '@/components/ui/progress';

export interface StepFinishProps {
  importSummary: {
    totalRecords: number;
    successfulImports: number;
    failedImports: number;
    errors: Array<any>;
  };
  onReset: () => void;
  onFinish: () => void;
  onViewStudents: () => void;
}

const StepFinish: React.FC<StepFinishProps> = ({
  importSummary,
  onReset,
  onFinish,
  onViewStudents
}) => {
  const { width } = useWindowSize();
  const isSmallScreen = width ? width < 640 : false;
  
  const successPercentage = 
    importSummary.totalRecords > 0 
      ? Math.round((importSummary.successfulImports / importSummary.totalRecords) * 100)
      : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center py-6">
        <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Import Completed!</h3>
        <p className="text-muted-foreground">
          {importSummary.successfulImports} of {importSummary.totalRecords} records successfully imported
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Success Rate</span>
          <span className="font-medium">{successPercentage}%</span>
        </div>
        <Progress value={successPercentage} />
      </div>
      
      {importSummary.failedImports > 0 && (
        <div className="border p-4 rounded-md bg-amber-50/50 dark:bg-amber-950/20">
          <h4 className="font-medium mb-2">Attention Required</h4>
          <p className="text-sm text-muted-foreground mb-2">
            {importSummary.failedImports} records could not be imported due to errors.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <DownloadCloud className="h-4 w-4 mr-2" />
            Download Error Report
          </Button>
        </div>
      )}
      
      <div className="pt-6 flex flex-col md:flex-row gap-3 justify-center">
        <Button variant="outline" onClick={onReset}>
          Import More Students
        </Button>
        <Button onClick={onViewStudents}>
          <Eye className="h-4 w-4 mr-2" />
          View Student List
        </Button>
        <Button variant="default" onClick={onFinish}>
          Finish Setup
        </Button>
      </div>
    </div>
  );
};

export default StepFinish;
