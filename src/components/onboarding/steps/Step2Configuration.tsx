
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { SchoolDataStepProps } from '../types';

export const Step2Configuration: React.FC<SchoolDataStepProps> = ({ schoolData, updateSchoolData, onComplete }) => {
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
