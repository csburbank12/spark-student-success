
import React from 'react';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { PersonalInfoStep } from '@/components/onboarding/PersonalInfoStep';
import { NotificationPreferencesStep } from '@/components/onboarding/NotificationPreferencesStep';
import { UserRole } from '@/types/roles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ChildLinkStepProps {
  onSave: (data: any) => void;
}

const ParentChildLinkStep: React.FC<ChildLinkStepProps> = ({ onSave }) => {
  // Mock data for children - in a real app would come from the database
  const [children, setChildren] = React.useState([
    { id: '1', name: 'Alex Johnson', grade: '5th Grade', selected: false },
    { id: '2', name: 'Sam Johnson', grade: '3rd Grade', selected: false },
  ]);
  
  const handleToggle = (id: string) => {
    setChildren(children.map(child => {
      if (child.id === id) {
        return { ...child, selected: !child.selected };
      }
      return child;
    }));
  };
  
  const handleSave = () => {
    const selectedChildren = children.filter(child => child.selected);
    onSave({ children: selectedChildren });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Link Your Children</h3>
      <p className="text-muted-foreground">
        These are the children associated with your account. Please confirm they are correct.
      </p>
      
      <div className="space-y-3">
        {children.map((child) => (
          <Card key={child.id} className="overflow-hidden">
            <div
              className={`flex items-center space-x-3 p-4 cursor-pointer transition-colors ${
                child.selected ? 'bg-primary/10' : ''
              }`}
              onClick={() => handleToggle(child.id)}
            >
              <Checkbox 
                checked={child.selected}
                onCheckedChange={() => handleToggle(child.id)}
                id={`child-${child.id}`}
              />
              <div className="flex-1">
                <Label htmlFor={`child-${child.id}`} className="text-base font-medium cursor-pointer">
                  {child.name}
                </Label>
                <p className="text-sm text-muted-foreground">{child.grade}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="pt-2">
        <Button onClick={handleSave} className="w-full">
          Confirm Child Accounts
        </Button>
      </div>
    </div>
  );
};

const ParentPrivacyPreferencesStep = ({ onSave }: { onSave: (data: any) => void }) => {
  const [settings, setSettings] = React.useState({
    viewWellLensAlerts: true,
    viewMoodData: true,
    viewProgressData: true,
    viewTeacherNotes: true,
  });
  
  const handleChange = (setting: string, value: boolean) => {
    setSettings({ ...settings, [setting]: value });
  };
  
  const handleSave = () => {
    onSave({ privacySettings: settings });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Privacy Preferences</h3>
      <p className="text-muted-foreground">
        Select which types of data you'd like to view about your child. 
        You can change these settings anytime.
      </p>
      
      <div className="space-y-4 pt-2">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="wellLensAlerts" 
            checked={settings.viewWellLensAlerts}
            onCheckedChange={(checked) => 
              handleChange('viewWellLensAlerts', checked as boolean)
            }
          />
          <div>
            <Label htmlFor="wellLensAlerts" className="text-base font-medium">
              WellLens Alert Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications when our system detects potential concerns
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="moodData" 
            checked={settings.viewMoodData}
            onCheckedChange={(checked) => 
              handleChange('viewMoodData', checked as boolean)
            }
          />
          <div>
            <Label htmlFor="moodData" className="text-base font-medium">
              Mood Check-in Data
            </Label>
            <p className="text-sm text-muted-foreground">
              View your child's self-reported emotional wellbeing
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="progressData" 
            checked={settings.viewProgressData}
            onCheckedChange={(checked) => 
              handleChange('viewProgressData', checked as boolean)
            }
          />
          <div>
            <Label htmlFor="progressData" className="text-base font-medium">
              SEL Progress Data
            </Label>
            <p className="text-sm text-muted-foreground">
              View your child's progress in social-emotional learning activities
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="teacherNotes" 
            checked={settings.viewTeacherNotes}
            onCheckedChange={(checked) => 
              handleChange('viewTeacherNotes', checked as boolean)
            }
          />
          <div>
            <Label htmlFor="teacherNotes" className="text-base font-medium">
              Teacher Notes
            </Label>
            <p className="text-sm text-muted-foreground">
              View notes and observations shared by teachers
            </p>
          </div>
        </div>
      </div>
      
      <Button onClick={handleSave} className="w-full">
        Save Privacy Settings
      </Button>
    </div>
  );
};

const ParentOnboarding: React.FC = () => {
  const navigate = useNavigate();
  
  const handleComplete = async () => {
    toast.success("Onboarding complete! Welcome to the Parent Dashboard.");
    navigate("/parent-dashboard-enhanced");
  };

  const onboardingSteps = [
    {
      title: "Verify Your Information",
      description: "Please confirm or update your personal information below.",
      component: <PersonalInfoStep onSave={() => {}} />,
    },
    {
      title: "Link Your Children",
      description: "Confirm which children are associated with your account.",
      component: <ParentChildLinkStep onSave={() => {}} />,
    },
    {
      title: "Privacy Preferences",
      description: "Choose what types of information you'd like access to.",
      component: <ParentPrivacyPreferencesStep onSave={() => {}} />,
    },
    {
      title: "Notification Preferences",
      description: "Choose how you'd like to receive updates about your child.",
      component: <NotificationPreferencesStep onSave={() => {}} />,
    },
  ];

  return (
    <OnboardingFlow 
      steps={onboardingSteps}
      onComplete={handleComplete}
      userRole={UserRole.parent}
    />
  );
};

export default ParentOnboarding;
