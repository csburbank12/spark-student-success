
import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SchoolDataStepProps } from '../types';

export const Step1BasicInfo: React.FC<SchoolDataStepProps> = ({ schoolData, updateSchoolData, onComplete }) => {
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
