
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, Check, AlertCircle } from 'lucide-react';
import { ImportStepProps } from '../types';

export const Step4StudentImport: React.FC<ImportStepProps> = ({ schoolCode, onComplete }) => {
  const [isImported, setIsImported] = useState(false);
  
  const handleImport = () => {
    // Simulate file upload and import process
    setTimeout(() => {
      setIsImported(true);
      onComplete(true);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Student Import</h3>
      <p className="text-muted-foreground">Import students for {schoolCode}.</p>
      
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
        {!isImported ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium">Upload Student CSV</h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Upload a CSV file containing student data. The file should include 
                first name, last name, grade level, and student ID for each student.
              </p>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => window.open('/templates/student_import_template.csv')}
              >
                Download Template
              </Button>
              <Button onClick={handleImport}>
                <FileUp className="mr-2 h-4 w-4" />
                Upload Student CSV
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-medium">Student Import Complete</h4>
              <p className="text-sm text-muted-foreground">
                1,250 students have been successfully imported.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded border p-3 text-left">
                <div className="text-sm flex items-center justify-between font-medium">
                  <span>Import Summary</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">Total Records:</span>
                    <span>1,253</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">Successfully Imported:</span>
                    <span>1,250</span>
                  </div>
                  <div className="flex justify-between text-sm py-1 text-amber-600">
                    <span>Errors:</span>
                    <span>3</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-left">
                <div className="rounded-md bg-amber-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Import Warnings</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <ul className="list-disc space-y-1 pl-5">
                          <li>3 records had duplicate student IDs and were skipped</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
