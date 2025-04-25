
import React, { useState } from 'react';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { PersonalInfoStep } from '@/components/onboarding/PersonalInfoStep';
import { NotificationPreferencesStep } from '@/components/onboarding/NotificationPreferencesStep';
import { UserRole } from '@/types/roles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const TeacherSetupClassesStep = ({ onSave }: { onSave: (data: any) => void }) => {
  const [classes, setClasses] = useState([
    { name: '', gradeLevel: '', subject: '' }
  ]);

  const addClass = () => {
    setClasses([...classes, { name: '', gradeLevel: '', subject: '' }]);
  };

  const removeClass = (index: number) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const updateClass = (index: number, field: string, value: string) => {
    const updatedClasses = [...classes];
    updatedClasses[index] = { ...updatedClasses[index], [field]: value };
    setClasses(updatedClasses);
  };

  const handleSave = () => {
    onSave({ classes });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Set Up Your Classes</h3>
      <p className="text-muted-foreground mb-4">
        Add the classes you'll be teaching this year. You can add more or edit them later.
      </p>
      
      {classes.map((cls, index) => (
        <div key={index} className="p-4 border rounded-md space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Class {index + 1}</h4>
            {classes.length > 1 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeClass(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class Name</label>
              <Input 
                value={cls.name} 
                onChange={(e) => updateClass(index, 'name', e.target.value)}
                placeholder="e.g. Homeroom 101"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade Level</label>
                <Select 
                  value={cls.gradeLevel}
                  onValueChange={(value) => updateClass(index, 'gradeLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="K">Kindergarten</SelectItem>
                    <SelectItem value="1">1st Grade</SelectItem>
                    <SelectItem value="2">2nd Grade</SelectItem>
                    <SelectItem value="3">3rd Grade</SelectItem>
                    <SelectItem value="4">4th Grade</SelectItem>
                    <SelectItem value="5">5th Grade</SelectItem>
                    <SelectItem value="6">6th Grade</SelectItem>
                    <SelectItem value="7">7th Grade</SelectItem>
                    <SelectItem value="8">8th Grade</SelectItem>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Select 
                  value={cls.subject}
                  onValueChange={(value) => updateClass(index, 'subject', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="social_studies">Social Studies</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="pe">Physical Education</SelectItem>
                    <SelectItem value="homeroom">Homeroom</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <Button type="button" variant="outline" onClick={addClass} className="w-full">
        Add Another Class
      </Button>
      
      <Button onClick={handleSave} className="w-full">Save Classes</Button>
    </div>
  );
};

const TeacherOnboarding: React.FC = () => {
  const navigate = useNavigate();
  
  const handleComplete = async () => {
    // In a real implementation, this would save the onboarding completion status
    // to the user's profile in the database
    toast.success("Onboarding complete! Welcome to the Teacher Dashboard.");
    navigate("/teacher-dashboard-enhanced");
  };

  const onboardingSteps = [
    {
      title: "Verify Your Information",
      description: "Please confirm or update your personal information below.",
      component: <PersonalInfoStep onSave={() => {}} />,
    },
    {
      title: "Set Up Your Classes",
      description: "Add the classes you'll be teaching to get started.",
      component: <TeacherSetupClassesStep onSave={() => {}} />,
    },
    {
      title: "Notification Preferences",
      description: "Choose how you'd like to receive updates and alerts.",
      component: <NotificationPreferencesStep onSave={() => {}} />,
    },
  ];

  return (
    <OnboardingFlow 
      steps={onboardingSteps}
      onComplete={handleComplete}
      userRole={UserRole.teacher}
    />
  );
};

export default TeacherOnboarding;
