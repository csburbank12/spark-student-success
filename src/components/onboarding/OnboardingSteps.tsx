
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, Upload, FileUp, AlertCircle } from 'lucide-react';

// Types
export interface StepStatus {
  step1Complete: boolean;
  step2Complete: boolean;
  step3Complete: boolean;
  step4Complete: boolean;
}

interface SchoolData {
  name: string;
  code: string;
  address: string;
  email?: string;
  phone?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
}

interface Step1Props {
  schoolData: SchoolData;
  updateSchoolData: (data: Partial<SchoolData>) => void;
  onComplete: (isComplete: boolean) => void;
}

interface Step2Props {
  schoolData: SchoolData;
  updateSchoolData: (data: Partial<SchoolData>) => void;
  onComplete: (isComplete: boolean) => void;
}

interface Step3Props {
  schoolCode: string;
  onComplete: (isComplete: boolean) => void;
}

interface Step4Props {
  schoolCode: string;
  onComplete: (isComplete: boolean) => void;
}

interface Step5Props {
  schoolData: SchoolData;
  stepStatus: StepStatus;
}

// Step 1: Basic School Information
export const Step1BasicInfo: React.FC<Step1Props> = ({ schoolData, updateSchoolData, onComplete }) => {
  useEffect(() => {
    const isComplete = schoolData.name.trim() !== '' && 
                       schoolData.code.trim() !== '' && 
                       schoolData.address.trim() !== '';
    onComplete(isComplete);
  }, [schoolData, onComplete]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">School Basic Information</h3>
      <p className="text-muted-foreground">Enter the basic information for the school.</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="school-name">School Name *</Label>
          <Input 
            id="school-name" 
            value={schoolData.name} 
            onChange={(e) => updateSchoolData({ name: e.target.value })}
            placeholder="Washington High School"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="school-code">School Code *</Label>
          <Input 
            id="school-code" 
            value={schoolData.code} 
            onChange={(e) => updateSchoolData({ code: e.target.value })}
            placeholder="WHS001"
          />
          <p className="text-xs text-muted-foreground">A unique identifier for the school</p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="school-address">Address *</Label>
          <Input 
            id="school-address" 
            value={schoolData.address} 
            onChange={(e) => updateSchoolData({ address: e.target.value })}
            placeholder="123 Education Blvd, Springfield, IL 62701"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="school-email">Contact Email</Label>
          <Input 
            id="school-email" 
            type="email" 
            value={schoolData.email || ''} 
            onChange={(e) => updateSchoolData({ email: e.target.value })}
            placeholder="admin@washingtonhs.edu"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="school-phone">Contact Phone</Label>
          <Input 
            id="school-phone" 
            type="tel" 
            value={schoolData.phone || ''} 
            onChange={(e) => updateSchoolData({ phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
    </div>
  );
};

// Step 2: School Configuration
export const Step2Configuration: React.FC<Step2Props> = ({ schoolData, updateSchoolData, onComplete }) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  useEffect(() => {
    // This step is always considered complete
    onComplete(true);
  }, [onComplete]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      // In a real implementation, you would upload the file and get a URL
      updateSchoolData({ logoUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">School Configuration</h3>
      <p className="text-muted-foreground">Configure branding and settings for the school.</p>
      
      <div className="grid gap-6">
        <div>
          <h4 className="font-medium mb-3">School Branding</h4>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>School Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 border flex items-center justify-center rounded">
                  {schoolData.logoUrl ? (
                    <img 
                      src={schoolData.logoUrl} 
                      alt="School logo" 
                      className="max-w-full max-h-full object-contain" 
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">Logo</span>
                  )}
                </div>
                <div>
                  <Label 
                    htmlFor="logo-upload" 
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded hover:bg-primary-100"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Label>
                  <input 
                    id="logo-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleLogoChange} 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended: Square PNG, 400×400px
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    id="primary-color" 
                    value={schoolData.primaryColor || "#9b87f5"} 
                    onChange={(e) => updateSchoolData({ primaryColor: e.target.value })}
                    className="w-10 h-10 p-1 border rounded"
                  />
                  <Input 
                    value={schoolData.primaryColor || "#9b87f5"} 
                    onChange={(e) => updateSchoolData({ primaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    id="secondary-color" 
                    value={schoolData.secondaryColor || "#d6bcfa"} 
                    onChange={(e) => updateSchoolData({ secondaryColor: e.target.value })}
                    className="w-10 h-10 p-1 border rounded"
                  />
                  <Input 
                    value={schoolData.secondaryColor || "#d6bcfa"} 
                    onChange={(e) => updateSchoolData({ secondaryColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-3">System Features</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mood-tracking">Mood Tracking</Label>
                <p className="text-sm text-muted-foreground">Enable mood tracking and check-ins for students</p>
              </div>
              <Switch id="mood-tracking" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sel-pathways">SEL Pathways</Label>
                <p className="text-sm text-muted-foreground">Enable social-emotional learning pathways</p>
              </div>
              <Switch id="sel-pathways" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="parent-portal">Parent Portal</Label>
                <p className="text-sm text-muted-foreground">Enable parent access to student information</p>
              </div>
              <Switch id="parent-portal" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 3: Staff Import
export const Step3StaffImport: React.FC<Step3Props> = ({ schoolCode, onComplete }) => {
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
      <h3 className="text-xl font-medium">Staff Import</h3>
      <p className="text-muted-foreground">Import staff members for {schoolCode}.</p>
      
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md p-8 text-center">
        {!isImported ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium">Upload Staff CSV</h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Upload a CSV file containing staff member data. The file should include 
                first name, last name, email, position, and department for each staff member.
              </p>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => window.open('/templates/staff_import_template.csv')}
              >
                Download Template
              </Button>
              <Button onClick={handleImport}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Staff CSV
              </Button>
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
          </div>
        )}
      </div>
    </div>
  );
};

// Step 4: Student Import
export const Step4StudentImport: React.FC<Step4Props> = ({ schoolCode, onComplete }) => {
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
                <Upload className="mr-2 h-4 w-4" />
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

// Step 5: Review
export const Step5Review: React.FC<Step5Props> = ({ schoolData, stepStatus }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Review & Finalize</h3>
      <p className="text-muted-foreground">Review the school information and complete the onboarding process.</p>
      
      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {schoolData.logoUrl && (
                <div className="w-16 h-16 bg-gray-100 border flex items-center justify-center rounded">
                  <img 
                    src={schoolData.logoUrl} 
                    alt="School logo" 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
              )}
              <div>
                <h4 className="text-lg font-medium">{schoolData.name}</h4>
                <p className="text-sm text-muted-foreground">{schoolData.code} • {schoolData.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  {schoolData.primaryColor && (
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: schoolData.primaryColor }}
                      title="Primary color"
                    />
                  )}
                  {schoolData.secondaryColor && (
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: schoolData.secondaryColor }}
                      title="Secondary color"
                    />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4">
          <div className="bg-white border rounded p-4">
            <h4 className="font-medium mb-3">Onboarding Summary</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>School information completed</span>
              </div>
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>School configuration completed</span>
              </div>
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>35 staff members imported</span>
              </div>
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <span>1,250 students imported</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h4 className="font-medium text-blue-800 mb-3">Next Steps</h4>
            <ul className="space-y-2 text-sm text-blue-700 list-disc list-inside">
              <li>Send welcome emails to staff members</li>
              <li>Set up administrative access and permissions</li>
              <li>Schedule training sessions for staff</li>
              <li>Configure school-specific settings and branding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
