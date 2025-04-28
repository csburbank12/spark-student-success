
import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface StepPreviewImportProps {
  previewData: Array<Record<string, any>>;
  mappedFields: Record<string, string>;
}

interface ValidationIssue {
  rowIndex: number;
  field: string;
  value: any;
  issue: string;
  severity: 'error' | 'warning';
}

const StepPreviewImport: React.FC<StepPreviewImportProps> = ({ 
  previewData, 
  mappedFields 
}) => {
  const [processedData, setProcessedData] = useState<Array<Record<string, any>>>([]);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [validationStats, setValidationStats] = useState({
    total: 0,
    valid: 0,
    warnings: 0,
    errors: 0
  });
  
  // Process data and validate it
  useEffect(() => {
    if (previewData.length === 0 || Object.keys(mappedFields).length === 0) return;
    
    // Transform data according to field mappings
    const transformed = previewData.map(row => {
      const newRow: Record<string, any> = {};
      Object.entries(mappedFields).forEach(([targetField, sourceField]) => {
        if (sourceField) {
          newRow[targetField] = row[sourceField];
        }
      });
      return newRow;
    });
    
    setProcessedData(transformed);
    
    // Validate the transformed data
    const issues: ValidationIssue[] = [];
    
    transformed.forEach((row, rowIndex) => {
      // Check for missing required fields
      ['student_id', 'first_name', 'last_name', 'grade'].forEach(requiredField => {
        if (!row[requiredField]) {
          issues.push({
            rowIndex,
            field: requiredField,
            value: null,
            issue: `Missing required field`,
            severity: 'error'
          });
        }
      });
      
      // Validate student ID format (should be alphanumeric)
      if (row.student_id && !/^[A-Za-z0-9]+$/.test(row.student_id)) {
        issues.push({
          rowIndex,
          field: 'student_id',
          value: row.student_id,
          issue: `Invalid student ID format`,
          severity: 'error'
        });
      }
      
      // Validate grade (should be a valid grade level)
      if (row.grade) {
        const grade = String(row.grade).trim();
        const validGrades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        if (!validGrades.includes(grade) && !/^[0-9]+$/.test(grade)) {
          issues.push({
            rowIndex,
            field: 'grade',
            value: grade,
            issue: `Unusual grade format`,
            severity: 'warning'
          });
        }
      }
      
      // Check for potentially invalid email format
      if (row.email && !/\S+@\S+\.\S+/.test(row.email)) {
        issues.push({
          rowIndex,
          field: 'email',
          value: row.email,
          issue: `Invalid email format`,
          severity: 'warning'
        });
      }
      
      // Check for potentially duplicate student IDs
      const studentIdCount = transformed.filter(r => r.student_id === row.student_id).length;
      if (studentIdCount > 1) {
        issues.push({
          rowIndex,
          field: 'student_id',
          value: row.student_id,
          issue: `Duplicate student ID`,
          severity: 'error'
        });
      }
    });
    
    setValidationIssues(issues);
    
    // Calculate validation statistics
    const warnings = issues.filter(i => i.severity === 'warning').length;
    const errors = issues.filter(i => i.severity === 'error').length;
    
    setValidationStats({
      total: transformed.length,
      valid: transformed.length - Math.min(transformed.length, new Set(issues.filter(i => i.severity === 'error').map(i => i.rowIndex)).size),
      warnings,
      errors
    });
    
  }, [previewData, mappedFields]);
  
  // Get issues for a specific row
  const getRowIssues = (rowIndex: number) => {
    return validationIssues.filter(issue => issue.rowIndex === rowIndex);
  };
  
  // Check if a row has errors
  const rowHasErrors = (rowIndex: number) => {
    return getRowIssues(rowIndex).some(issue => issue.severity === 'error');
  };
  
  // Check if a row has warnings
  const rowHasWarnings = (rowIndex: number) => {
    return getRowIssues(rowIndex).some(issue => issue.severity === 'warning');
  };
  
  const getRowClass = (rowIndex: number) => {
    if (rowHasErrors(rowIndex)) return "bg-red-50";
    if (rowHasWarnings(rowIndex)) return "bg-amber-50";
    return "";
  };
  
  const renderValidationStatus = () => {
    if (validationStats.errors > 0) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Failed</AlertTitle>
          <AlertDescription>
            Found {validationStats.errors} errors and {validationStats.warnings} warnings in your data.
            Please review and correct the issues before proceeding.
          </AlertDescription>
        </Alert>
      );
    } else if (validationStats.warnings > 0) {
      return (
        <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Some Warnings Found</AlertTitle>
          <AlertDescription className="text-amber-700">
            Found {validationStats.warnings} warnings in your data.
            You can proceed, but we recommend reviewing the highlighted rows.
          </AlertDescription>
        </Alert>
      );
    } else if (validationStats.valid > 0) {
      return (
        <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Validation Passed</AlertTitle>
          <AlertDescription className="text-green-700">
            All {validationStats.valid} records passed validation and are ready to import.
          </AlertDescription>
        </Alert>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-6">
      {renderValidationStatus()}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validationStats.total}</div>
          </CardContent>
        </Card>
        <Card className={validationStats.errors > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Records with Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${validationStats.errors > 0 ? "text-red-600" : ""}`}>
              {validationStats.errors}
            </div>
          </CardContent>
        </Card>
        <Card className={validationStats.warnings > 0 ? "border-amber-200 bg-amber-50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Records with Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${validationStats.warnings > 0 ? "text-amber-600" : ""}`}>
              {validationStats.warnings}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Mapped Data Preview</h3>
      <p className="text-muted-foreground mb-4">
        Review how your data will be imported into our system. Rows with errors or warnings are highlighted.
      </p>
      
      {processedData.length > 0 ? (
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Row</TableHead>
                <TableHead className="w-[80px]">Status</TableHead>
                {Object.keys(processedData[0]).map(key => (
                  <TableHead key={key}>{key.replace('_', ' ')}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.slice(0, 10).map((row, i) => (
                <TableRow key={i} className={getRowClass(i)}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>
                    {rowHasErrors(i) ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> Error
                      </Badge>
                    ) : rowHasWarnings(i) ? (
                      <Badge variant="default" className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
                        <Info className="h-3 w-3" /> Warning
                      </Badge>
                    ) : (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Valid
                      </Badge>
                    )}
                  </TableCell>
                  {Object.keys(processedData[0]).map((key) => (
                    <TableCell key={key}>
                      {String(row[key] || '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md bg-muted/10">
          <p className="text-muted-foreground">No preview data available</p>
        </div>
      )}
      
      {processedData.length > 10 && (
        <p className="text-center text-sm text-muted-foreground mt-2">
          Showing 10 of {processedData.length} records
        </p>
      )}
      
      {validationIssues.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Validation Issues</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Row</TableHead>
                  <TableHead className="w-[100px]">Severity</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Issue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {validationIssues.map((issue, i) => (
                  <TableRow key={i} className={issue.severity === 'error' ? 'bg-red-50' : 'bg-amber-50'}>
                    <TableCell>{issue.rowIndex + 1}</TableCell>
                    <TableCell>
                      {issue.severity === 'error' ? (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Error
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1">
                          <Info className="h-3 w-3" /> Warning
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{issue.field.replace('_', ' ')}</TableCell>
                    <TableCell>{String(issue.value || '<empty>')}</TableCell>
                    <TableCell>{issue.issue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepPreviewImport;
