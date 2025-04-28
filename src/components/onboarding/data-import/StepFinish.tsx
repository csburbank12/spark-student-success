
import React from "react";
import { 
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  Users,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import confetti from 'react-confetti';

interface StepFinishProps {
  importSummary: {
    totalRecords: number;
    successfulImports: number;
    failedImports: number;
    errors: Array<{
      row: number;
      error: string;
      data?: Record<string, any>;
    }>;
  };
  onFinish: () => void;
  onViewStudents: () => void;
}

const StepFinish: React.FC<StepFinishProps> = ({ 
  importSummary, 
  onFinish,
  onViewStudents
}) => {
  const { totalRecords, successfulImports, failedImports, errors } = importSummary;
  const successRate = totalRecords > 0 ? Math.round((successfulImports / totalRecords) * 100) : 0;
  
  // Simple confetti effect
  React.useEffect(() => {
    if (successRate >= 90) {
      const confettiInstance = confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        confettiInstance.reset();
      }, 3000);
    }
  }, [successRate]);
  
  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg border ${
        failedImports === 0 ? 'bg-green-50 border-green-100' : 
        successRate >= 90 ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'
      }`}>
        <div className="flex flex-col items-center text-center">
          {failedImports === 0 ? (
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
          )}
          
          <h3 className={`text-xl font-bold mb-2 ${
            failedImports === 0 ? 'text-green-800' : 'text-amber-800'
          }`}>
            {failedImports === 0 
              ? 'Import Completed Successfully!' 
              : 'Import Completed with Some Issues'}
          </h3>
          
          <p className={
            failedImports === 0 ? 'text-green-700' : 'text-amber-700'
          }>
            {successfulImports} out of {totalRecords} records were successfully imported.
          </p>
          
          <div className="mt-6 w-full max-w-sm">
            <div className="w-full bg-white rounded-full h-4 mb-2 shadow-inner overflow-hidden">
              <div 
                className={`h-full ${
                  successRate === 100 ? 'bg-green-500' : 
                  successRate >= 90 ? 'bg-green-400' : 'bg-amber-400'
                }`}
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium">
              {successRate}% success rate
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
          </CardContent>
        </Card>
        
        <Card className={successfulImports > 0 ? "border-green-200 bg-green-50" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Successfully Imported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${successfulImports > 0 ? "text-green-600" : ""}`}>
              {successfulImports}
            </div>
          </CardContent>
        </Card>
        
        <Card className={failedImports > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Failed Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${failedImports > 0 ? "text-red-600" : ""}`}>
              {failedImports}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" /> 
              Error Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errors.map((error, i) => (
                    <TableRow key={i}>
                      <TableCell>{error.row}</TableCell>
                      <TableCell>{error.error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <Button variant="outline" className="mt-4" onClick={() => {}}>
              <Download className="mr-2 h-4 w-4" />
              Download Error Report
            </Button>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                1
              </div>
              <div>
                <h4 className="text-base font-medium mb-1">View Imported Students</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Review the student records that were successfully imported into the system.
                </p>
                <Button onClick={onViewStudents} variant="outline" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  View Students
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start">
              <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                2
              </div>
              <div>
                <h4 className="text-base font-medium mb-1">Complete Setup</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Finish the setup process and return to your dashboard.
                </p>
                <Button onClick={onFinish} className="flex items-center">
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepFinish;
