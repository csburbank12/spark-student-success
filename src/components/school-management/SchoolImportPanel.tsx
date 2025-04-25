
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileUp, Download, UploadCloud } from "lucide-react";
import { processCsvImport } from "@/utils/school-utils";

const SchoolImportPanel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewData, setPreviewData] = useState<any[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Read the file to preview the data
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          try {
            const csvData = event.target.result as string;
            const processedData = processCsvImport(csvData);
            setPreviewData(processedData.slice(0, 5)); // Preview first 5 rows
          } catch (error) {
            toast.error("Error parsing file: Invalid format");
            setPreviewData(null);
          }
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }

    setUploading(true);
    try {
      // In a real implementation, you would send the file to an API endpoint
      // that would parse the CSV and insert the schools into the database
      
      // Simulate a successful import
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(`Successfully imported schools from ${file.name}`);
      setFile(null);
      setPreviewData(null);
    } catch (error: any) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // In a real app, this would generate and download a CSV template
    toast.info("Template downloading...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import Schools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="csv-file">Upload CSV File</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>
          <div className="grid gap-4">
            <div className="border rounded-md p-6 bg-muted/50 text-center">
              {file ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected File:</p>
                  <div className="flex items-center justify-center">
                    <FileUp className="h-6 w-6 text-muted-foreground mr-2" />
                    <span>{file.name}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto" />
                  <div className="text-sm text-muted-foreground">
                    <p>Drag and drop your CSV file here, or click to browse</p>
                    <p className="text-xs">
                      Supported formats: CSV. Max file size: 10MB.
                    </p>
                  </div>
                </div>
              )}
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
              <Label htmlFor="csv-file" className="mt-4 inline-block">
                <Button variant="outline" type="button" disabled={uploading}>
                  Choose File
                </Button>
              </Label>
            </div>

            {previewData && previewData.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Preview:</p>
                <div className="border rounded-md p-4 bg-card max-h-60 overflow-y-auto">
                  <p className="text-sm text-muted-foreground">
                    Preview would display here in a real implementation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex justify-end">
          <Button
            onClick={handleImport}
            disabled={!file || uploading}
            className="w-full md:w-auto"
          >
            {uploading ? "Importing..." : "Import Schools"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolImportPanel;
