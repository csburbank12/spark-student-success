
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';
import { ReviewStepProps } from '../types';

export const Step5Review: React.FC<ReviewStepProps> = ({ schoolData, stepStatus }) => {
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
