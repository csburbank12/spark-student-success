
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, Check, AlertCircle, Download } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ImportStepProps } from '../types';

export const Step3StaffImport: React.FC<ImportStepProps> = ({ schoolCode, onComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [isImported, setIsImported] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast.error("Please select a CSV file");
        return;
      }
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected`);
    }
  };
  
  const handleImport = () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file first");
      return;
    }
    
    setIsImporting(true);
    
    // Simulate file upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 8;
      setUploadProgress(progress > 100 ? 100 : progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate processing delay
        setTimeout(() => {
          setIsImporting(false);
          setIsImported(true);
          onComplete(true);
          toast.success("Staff import completed successfully");
        }, 500);
      }
    }, 100);
  };
  
  const handleDownloadTemplate = () => {
    // In a real application, this would download an actual CSV template
    // For demo purposes, we'll just show a toast
    toast.success("Template download started", {
      description: "The CSV template would download in a real application"
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Staff Import</h3>
      <p className="text-muted-foreground">Import staff members for {schoolCode}.</p>
      
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
        {isImporting ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium">Uploading Staff</h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Please wait while we process your staff data...
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : !isImported ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium">Upload Staff CSV</h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Upload a CSV file containing staff member data. The file should include 
                first name, last name, email, position, and department for each staff member.
              </p>
            </div>
            
            <div className="space-y-4">
              <input 
                type="file" 
                id="staff-csv" 
                accept=".csv" 
                className="hidden" 
                onChange={handleFileSelect}
              />
              
              <div className="flex flex-col items-center">
                <Button 
                  variant="outline" 
                  className="mb-2"
                  onClick={() => document.getElementById('staff-csv')?.click()}
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  {selectedFile ? selectedFile.name : "Select CSV File"}
                </Button>
                
                {selectedFile && (
                  <p className="text-sm text-green-600 flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    File selected ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              
              <div className="flex justify-center flex-wrap gap-2">
                <Button 
                  variant="outline"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <Button 
                  onClick={handleImport}
                  disabled={!selectedFile}
                >
                  Import Staff
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-2">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-xs text-muted-foreground">
                  For this demo, any CSV file will work
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-medium">Staff Import Complete</h4>
              <p className="text-sm text-muted-foreground">
                35 staff members have been successfully imported.
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
                    <span>35</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">Successfully Imported:</span>
                    <span>35</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">Errors:</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-2">
              <Button 
                variant="outline"
                onClick={() => {
                  setIsImported(false);
                  setSelectedFile(null);
                }}
              >
                Import Another File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
