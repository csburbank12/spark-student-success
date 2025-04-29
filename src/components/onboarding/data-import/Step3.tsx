
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { MappedField } from '@/types/roles';

interface Step3Props {
  onNext: () => void;
}

export const Step3: React.FC<Step3Props> = ({ onNext }) => {
  // Example field mappings
  const fieldMappings: MappedField[] = [
    { sourceField: 'student_id', targetField: 'studentId', required: true, valid: true },
    { sourceField: 'first_name', targetField: 'firstName', required: true, valid: true },
    { sourceField: 'last_name', targetField: 'lastName', required: true, valid: true },
    { sourceField: 'email', targetField: 'email', required: false, valid: true },
    { sourceField: 'grade_level', targetField: 'gradeLevel', required: true, valid: true },
    { sourceField: 'dob', targetField: 'dateOfBirth', required: false, valid: true },
    { sourceField: 'homeroom', targetField: 'homeroom', required: false, valid: false, errorMessage: 'Invalid format' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Map Data Fields</CardTitle>
        <CardDescription>
          Match your source data fields to the system fields
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source Field</TableHead>
              <TableHead>Target Field</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fieldMappings.map((mapping, index) => (
              <TableRow key={index}>
                <TableCell>{mapping.sourceField}</TableCell>
                <TableCell>
                  <Input 
                    value={mapping.targetField}
                    className="h-8"
                  />
                </TableCell>
                <TableCell>{mapping.required ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {mapping.valid ? (
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                    <span className="text-xs">{mapping.valid ? 'Valid' : mapping.errorMessage}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="bg-muted/50 rounded-md p-3">
          <h4 className="text-sm font-medium mb-1">Field Mapping Issues</h4>
          <p className="text-xs text-muted-foreground">1 field has mapping issues. Please correct before proceeding.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};
