
import React, { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { EducationSystem } from "@/types/roles";
import { AlertCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface StepMapFieldsProps {
  system: EducationSystem;
  connectionConfig: Record<string, any>;
  onFieldMapping: (mappings: Record<string, string>) => void;
  onDataPreview: (data: Array<any>) => void;
}

// Sample source fields based on the system
const getSystemSourceFields = (system: EducationSystem): string[] => {
  switch (system) {
    case 'skyward':
      return ['student_id', 'first_name', 'last_name', 'grade', 'home_room', 'dob', 'gender', 'address', 'phone'];
    case 'powerschool':
      return ['id', 'firstname', 'lastname', 'grade_level', 'home_room', 'birthdate', 'gender', 'studentaddress', 'studentphone'];
    case 'infinite_campus':
      return ['studentID', 'firstName', 'lastName', 'gradeLevel', 'homeroom', 'birthDate', 'gender', 'studentAddress', 'studentPhone'];
    case 'aeries':
      return ['PermID', 'FirstName', 'LastName', 'Grade', 'HomeRoom', 'DOB', 'Gender', 'Address', 'HomePhone'];
    case 'csv':
      return ['Student ID', 'First Name', 'Last Name', 'Grade', 'Homeroom', 'Date of Birth', 'Gender', 'Address', 'Phone Number'];
    default:
      return [];
  }
};

// Target fields in our system
const targetFields = [
  { id: 'student_id', name: 'Student ID', required: true },
  { id: 'first_name', name: 'First Name', required: true },
  { id: 'last_name', name: 'Last Name', required: true },
  { id: 'grade', name: 'Grade Level', required: true },
  { id: 'homeroom', name: 'Homeroom', required: false },
  { id: 'birth_date', name: 'Birth Date', required: false },
  { id: 'gender', name: 'Gender', required: false },
  { id: 'address', name: 'Address', required: false },
  { id: 'phone', name: 'Phone', required: false },
  { id: 'email', name: 'Email', required: false },
  { id: 'parent_name', name: 'Parent/Guardian Name', required: false },
  { id: 'parent_email', name: 'Parent/Guardian Email', required: false }
];

// Generate sample data for preview
const generateSampleData = (sourceFields: string[], count: number = 5) => {
  // Helper function to generate random data by field name
  const generateValueForField = (field: string) => {
    if (field.toLowerCase().includes('id')) return Math.floor(10000 + Math.random() * 90000).toString();
    if (field.toLowerCase().includes('first') || field.toLowerCase().includes('firstname')) {
      const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
      return firstNames[Math.floor(Math.random() * firstNames.length)];
    }
    if (field.toLowerCase().includes('last') || field.toLowerCase().includes('lastname')) {
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
      return lastNames[Math.floor(Math.random() * lastNames.length)];
    }
    if (field.toLowerCase().includes('grade')) return Math.floor(1 + Math.random() * 12).toString();
    if (field.toLowerCase().includes('room')) return String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(Math.random() * 100);
    if (field.toLowerCase().includes('birth') || field.toLowerCase().includes('dob')) {
      const year = 2000 + Math.floor(Math.random() * 15);
      const month = 1 + Math.floor(Math.random() * 12);
      const day = 1 + Math.floor(Math.random() * 28);
      return `${month}/${day}/${year}`;
    }
    if (field.toLowerCase().includes('gender')) {
      return Math.random() > 0.5 ? 'Male' : 'Female';
    }
    if (field.toLowerCase().includes('address')) {
      return `${Math.floor(100 + Math.random() * 9900)} Main St, City`;
    }
    if (field.toLowerCase().includes('phone')) {
      return `(${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    return `Value for ${field}`;
  };

  return Array.from({ length: count }, () => {
    const record: Record<string, any> = {};
    sourceFields.forEach(field => {
      record[field] = generateValueForField(field);
    });
    return record;
  });
};

// Suggest mappings based on field names
const suggestMappings = (sourceFields: string[], targetFields: Array<{id: string, name: string}>) => {
  const mappings: Record<string, string> = {};
  
  // Helper function to normalize field names for matching
  const normalize = (name: string) => name.toLowerCase().replace(/[_\s-]/g, '');
  
  // For each target field, find a matching source field
  targetFields.forEach(target => {
    const normalizedTarget = normalize(target.id);
    const match = sourceFields.find(source => {
      const normalizedSource = normalize(source);
      return normalizedSource.includes(normalizedTarget) || normalizedTarget.includes(normalizedSource);
    });
    
    if (match) {
      mappings[target.id] = match;
    }
  });
  
  return mappings;
};

const StepMapFields: React.FC<StepMapFieldsProps> = ({ 
  system, 
  connectionConfig,
  onFieldMapping,
  onDataPreview
}) => {
  const sourceFields = getSystemSourceFields(system);
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [sampleData, setSampleData] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldSuggestionApplied, setFieldSuggestionApplied] = useState(false);
  
  // Effect to suggest mappings on component mount
  useEffect(() => {
    // Only apply suggestions if we haven't already and we have no mapped fields yet
    if (!fieldSuggestionApplied && Object.keys(mappedFields).length === 0) {
      const suggestions = suggestMappings(sourceFields, targetFields);
      setMappedFields(suggestions);
      setFieldSuggestionApplied(true);
      validateMappings(suggestions);
    }
  }, [sourceFields, fieldSuggestionApplied, mappedFields]);
  
  // Effect to load sample data on component mount
  useEffect(() => {
    loadSampleData();
  }, [system, connectionConfig]);
  
  const loadSampleData = () => {
    setIsLoading(true);
    
    // Simulate API call to get sample data
    setTimeout(() => {
      const data = generateSampleData(sourceFields, 10);
      setSampleData(data);
      onDataPreview(data);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleFieldMapping = (targetFieldId: string, sourceField: string) => {
    const newMappings = { ...mappedFields, [targetFieldId]: sourceField };
    setMappedFields(newMappings);
    onFieldMapping(newMappings);
    validateMapping(targetFieldId, sourceField, newMappings);
  };
  
  const validateMapping = (targetFieldId: string, sourceField: string, allMappings: Record<string, string>) => {
    const errors = { ...validationErrors };
    
    // Check if required field is mapped
    const field = targetFields.find(f => f.id === targetFieldId);
    if (field?.required && !sourceField) {
      errors[targetFieldId] = `${field.name} is required`;
    } else {
      delete errors[targetFieldId];
    }
    
    // Check for duplicate mappings
    const mappedFields = Object.values(allMappings);
    const isDuplicate = mappedFields.filter(f => f === sourceField).length > 1;
    if (isDuplicate) {
      errors[targetFieldId] = `${sourceField} is already mapped to another field`;
    }
    
    setValidationErrors(errors);
  };
  
  const validateMappings = (mappings: Record<string, string>) => {
    const errors: Record<string, string> = {};
    
    // Check required fields
    targetFields.forEach(field => {
      if (field.required && !mappings[field.id]) {
        errors[field.id] = `${field.name} is required`;
      }
    });
    
    // Check for duplicates
    const mappedFields = Object.values(mappings);
    mappedFields.forEach((sourceField, index) => {
      if (sourceField && mappedFields.indexOf(sourceField) !== index) {
        const targetFieldId = Object.keys(mappings).find(key => mappings[key] === sourceField && key !== Object.keys(mappings)[index]);
        if (targetFieldId) {
          errors[targetFieldId] = `${sourceField} is already mapped to another field`;
        }
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const applyAutoSuggestions = () => {
    const suggestions = suggestMappings(sourceFields, targetFields);
    setMappedFields(suggestions);
    onFieldMapping(suggestions);
    validateMappings(suggestions);
    toast.success("Auto-mapping applied successfully");
  };
  
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const mappedRequiredFields = targetFields
    .filter(field => field.required)
    .every(field => mappedFields[field.id] && !validationErrors[field.id]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Map Your Fields</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={applyAutoSuggestions}
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          Auto-Map Fields
        </Button>
      </div>

      {hasValidationErrors && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            Please fix the following errors before continuing:
            <ul className="mt-2 list-disc list-inside">
              {Object.values(validationErrors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {mappedRequiredFields && (
        <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Ready to proceed</AlertTitle>
          <AlertDescription className="text-green-700">
            All required fields have been mapped successfully.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Target Field</TableHead>
              <TableHead>Source Field</TableHead>
              <TableHead className="w-[120px]">Required</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {targetFields.map(field => (
              <TableRow key={field.id} className={validationErrors[field.id] ? "bg-red-50" : ""}>
                <TableCell className="font-medium">
                  {field.name}
                </TableCell>
                <TableCell>
                  <Select 
                    value={mappedFields[field.id] || ""} 
                    onValueChange={value => handleFieldMapping(field.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Do not import</SelectItem>
                      {sourceFields.map(sourceField => (
                        <SelectItem key={sourceField} value={sourceField}>
                          {sourceField}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors[field.id] && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors[field.id]}</p>
                  )}
                </TableCell>
                <TableCell>
                  {field.required ? (
                    <Badge variant="default" className="bg-red-100 text-red-800 hover:bg-red-100">Required</Badge>
                  ) : (
                    <Badge variant="outline">Optional</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {mappedFields[field.id] && !validationErrors[field.id] ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Mapped</Badge>
                  ) : field.required ? (
                    <Badge variant="default" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Mapping</Badge>
                  ) : (
                    <Badge variant="outline">Not Mapped</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Sample Data Preview</h3>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading sample data...</p>
          </div>
        ) : sampleData.length > 0 ? (
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(sampleData[0]).map(key => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.slice(0, 5).map((row, i) => (
                  <TableRow key={i}>
                    {Object.values(row).map((value, j) => (
                      <TableCell key={j}>{String(value)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center py-4 text-muted-foreground">No sample data available</p>
        )}
        
        {sampleData.length > 5 && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            Showing 5 of {sampleData.length} records
          </p>
        )}
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={loadSampleData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Sample Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepMapFields;
