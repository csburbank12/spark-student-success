
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle } from 'lucide-react';

interface Step2Props {
  onNext: () => void;
}

export const Step2: React.FC<Step2Props> = ({ onNext }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>(['name', 'email', 'grade', 'id']);
  const [mapping, setMapping] = useState<Record<string, string>>({
    column1: 'name',
    column2: 'email',
    column3: 'grade',
    column4: 'id',
    column5: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1500);
  };

  const toggleFieldSelection = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const updateMapping = (column: string, value: string) => {
    setMapping({
      ...mapping,
      [column]: value
    });
  };

  const availableFields = [
    { id: 'name', label: 'Student Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'grade', label: 'Grade Level' },
    { id: 'id', label: 'Student ID' },
    { id: 'dob', label: 'Date of Birth' },
    { id: 'address', label: 'Address' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'guardian', label: 'Guardian Name' },
  ];

  // Mock data preview
  const previewData = [
    { col1: 'John Smith', col2: 'john.smith@example.com', col3: '9', col4: 'ST-1001', col5: '123 Main St' },
    { col1: 'Emily Johnson', col2: 'emily.j@example.com', col3: '10', col4: 'ST-1002', col5: '456 Oak Ave' },
    { col1: 'Michael Brown', col2: 'michael.b@example.com', col3: '9', col4: 'ST-1003', col5: '789 Pine Rd' },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Map Data Fields</CardTitle>
        <CardDescription>
          Map your data fields to our system fields
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Select Fields to Import</h3>
            <p className="text-xs text-muted-foreground">
              {selectedFields.length} of {availableFields.length} fields selected
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableFields.map(field => (
              <div 
                key={field.id} 
                className={`flex items-center space-x-2 rounded-md border p-2 cursor-pointer ${
                  selectedFields.includes(field.id) ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => toggleFieldSelection(field.id)}
              >
                <Checkbox 
                  checked={selectedFields.includes(field.id)}
                  onCheckedChange={() => {}}
                  className="pointer-events-none"
                  id={`field-${field.id}`}
                />
                <label 
                  htmlFor={`field-${field.id}`}
                  className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {field.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Data Preview & Mapping</h3>
          <div className="border rounded-lg overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(previewData[0]).map((col, index) => (
                    <TableHead key={col} className="text-center">
                      <div className="space-y-1">
                        <p className="text-xs font-normal text-muted-foreground">Column {index + 1}</p>
                        <Select 
                          value={mapping[`column${index + 1}`] || ''} 
                          onValueChange={(value) => updateMapping(`column${index + 1}`, value)}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Don't Import</SelectItem>
                            {availableFields.map(field => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex justify-center">
                          {mapping[`column${index + 1}`] ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                          )}
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button onClick={handleContinue} disabled={isLoading}>
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
