
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/color-picker";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { SchoolDataStepProps } from '../types';

export const Step2Configuration: React.FC<SchoolDataStepProps> = ({ 
  schoolData, 
  updateSchoolData, 
  onComplete 
}) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(schoolData.logoUrl || '');

  useEffect(() => {
    // Mark step as complete if primary color is set
    const isComplete = !!schoolData.primaryColor;
    onComplete(isComplete);
  }, [schoolData, onComplete]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      updateSchoolData({ logoUrl: url }); // In a real app, we'd upload this to storage
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">School Configuration</h3>
      <p className="text-muted-foreground">Customize your school branding and appearance.</p>
      
      <div className="grid gap-6">
        <div className="space-y-3">
          <Label htmlFor="logo-upload">School Logo</Label>
          <div className="flex items-start gap-4">
            <div className={`border rounded-md w-24 h-24 flex items-center justify-center ${previewUrl ? '' : 'bg-muted'}`}>
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="School logo" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-muted-foreground text-sm text-center">No logo</span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full text-left"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {logoFile ? logoFile.name : 'Choose logo file...'}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended size: 400x400px, PNG or JPG format
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <ColorPicker
            id="primary-color"
            label="Primary Color"
            value={schoolData.primaryColor || '#0f766e'}
            onChange={(e) => updateSchoolData({ primaryColor: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            This color will be used for primary buttons and accents throughout the app.
          </p>
        </div>
        
        <div className="space-y-3">
          <ColorPicker
            id="secondary-color"
            label="Secondary Color"
            value={schoolData.secondaryColor || '#6366f1'}
            onChange={(e) => updateSchoolData({ secondaryColor: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            This color will be used for secondary elements and highlights.
          </p>
        </div>
      </div>
    </div>
  );
};
