
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Database, FileText } from 'lucide-react';

interface Step1Props {
  onNext: () => void;
}

export const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [dataSource, setDataSource] = useState<string>('');
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1500);
  };

  const handleFileChange = () => {
    setFileUploaded(true);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Import Student Data</CardTitle>
        <CardDescription>
          Select your data source and upload your student information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Data Source</label>
          <Select value={dataSource} onValueChange={setDataSource}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV File</SelectItem>
              <SelectItem value="excel">Excel File</SelectItem>
              <SelectItem value="skyward">Skyward SIS</SelectItem>
              <SelectItem value="powerschool">PowerSchool</SelectItem>
              <SelectItem value="classlink">ClassLink</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {dataSource && (
          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
            {['csv', 'excel'].includes(dataSource) ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Upload your {dataSource.toUpperCase()} file</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {dataSource === 'csv' ? 'CSV file with student data' : 'Excel spreadsheet with student data'}
                  </p>
                </div>
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <div className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/80">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept={dataSource === 'csv' ? '.csv' : '.xlsx,.xls'}
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {fileUploaded && (
                  <p className="text-sm text-center text-green-600 dark:text-green-500">
                    File uploaded successfully
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Database className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Connect to {dataSource}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your API credentials to connect
                  </p>
                </div>
                <div className="space-y-2 max-w-sm mx-auto">
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md mt-1"
                      placeholder="Enter API key"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">API Secret</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md mt-1"
                      placeholder="Enter API secret"
                    />
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setFileUploaded(true)}>
                    Connect
                  </Button>
                  {fileUploaded && (
                    <p className="text-sm text-center text-green-600 dark:text-green-500">
                      Connected to {dataSource} successfully
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button
          onClick={handleContinue}
          disabled={!dataSource || !fileUploaded || isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Processing
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
