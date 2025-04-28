
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Download, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImportSummary } from "@/types/roles";

interface StepFinishProps {
  importSummary: ImportSummary;
  onReset: () => void;
}

export const StepFinish: React.FC<StepFinishProps> = ({
  importSummary,
  onReset,
}) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();
  
  // Calculate success percentage
  const successPercentage = Math.round(
    (importSummary.successfulImports / importSummary.totalRecords) * 100
  );

  // Determine if there were any errors
  const hasErrors = importSummary.errors && importSummary.errors.length > 0;

  // Stop confetti after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-700 rounded-full">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold">Import Complete!</h2>
        <p className="text-muted-foreground">
          Your student data has been successfully imported into the system.
        </p>
      </div>

      <Card className="border-green-200">
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Import Success Rate</span>
            <span className="text-sm font-bold">{successPercentage}%</span>
          </div>
          <Progress value={successPercentage} className="h-2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-700">
                {importSummary.totalRecords}
              </div>
              <div className="text-sm text-blue-600">Total Records</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">
                {importSummary.successfulImports}
              </div>
              <div className="text-sm text-green-600">Successfully Imported</div>
            </div>
            <div className={`${hasErrors ? 'bg-red-50' : 'bg-slate-50'} p-4 rounded-lg text-center`}>
              <div className={`text-2xl font-bold ${hasErrors ? 'text-red-700' : 'text-slate-700'}`}>
                {importSummary.failedImports}
              </div>
              <div className={`text-sm ${hasErrors ? 'text-red-600' : 'text-slate-600'}`}>
                Failed Records
              </div>
            </div>
          </div>
          
          {hasErrors && (
            <div className="mt-4 p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-medium text-red-700 mb-2">Import Errors</h3>
              <p className="text-sm text-red-600 mb-3">
                The following records could not be imported:
              </p>
              <div className="max-h-40 overflow-y-auto">
                <ul className="text-sm space-y-1">
                  {importSummary.errors.slice(0, 5).map((error, index) => (
                    <li key={index} className="text-red-800">
                      Row {error.row}: {error.error}
                    </li>
                  ))}
                  {importSummary.errors.length > 5 && (
                    <li className="text-red-800 font-medium">
                      ... and {importSummary.errors.length - 5} more errors
                    </li>
                  )}
                </ul>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  // Download error report logic would go here
                  console.log("Downloading error report");
                }}
              >
                <Download className="mr-1 h-4 w-4" />
                Download Error Report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            if (typeof onReset === 'function') {
              onReset();
            }
          }}
        >
          Import More Data
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/students")}>
            View Students
          </Button>
          <Button onClick={() => navigate("/admin-dashboard")}>
            <Home className="mr-1 h-4 w-4" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepFinish;
