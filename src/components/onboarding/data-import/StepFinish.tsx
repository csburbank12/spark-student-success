
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, X, Download, Users } from 'lucide-react';
import { useWindowSize } from '@/hooks/use-window-size';
import { ImportSummary } from '@/types/roles';

export interface StepFinishProps {
  importSummary: ImportSummary;
  onFinish: () => void;
  onViewStudents: () => void;
}

const StepFinish: React.FC<StepFinishProps> = ({ importSummary, onFinish, onViewStudents }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-4 pb-8">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold">Import Complete!</h2>
        <p className="text-muted-foreground max-w-md">
          Your student data has been successfully imported into the system.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-medium mb-4">Import Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Records</p>
              <p className="text-2xl font-semibold">{importSummary.totalRecords}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-green-600">Successfully Imported</p>
              <p className="text-2xl font-semibold text-green-600">{importSummary.successfulImports}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-sm text-red-600">Failed Records</p>
              <p className="text-2xl font-semibold text-red-600">{importSummary.failedImports}</p>
            </div>
          </div>

          {importSummary.failedImports > 0 && (
            <div className="bg-muted p-4 rounded-lg mt-4 max-h-[200px] overflow-y-auto">
              <h4 className="font-medium mb-2 flex items-center">
                <X className="h-4 w-4 text-red-500 mr-1" />
                Error Details
              </h4>
              <ul className="space-y-2">
                {importSummary.errors.map((error, index) => (
                  <li key={index} className="text-sm border-l-2 border-red-300 pl-3">
                    <strong>Row {error.row}:</strong> {error.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
        {importSummary.failedImports > 0 && (
          <Button variant="outline" className="w-full md:w-auto flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Error Report
          </Button>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Button 
            onClick={onViewStudents} 
            variant="outline" 
            className="w-full md:w-auto flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            View Students
          </Button>
          
          <Button 
            onClick={onFinish}
            className="w-full md:w-auto"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepFinish;
