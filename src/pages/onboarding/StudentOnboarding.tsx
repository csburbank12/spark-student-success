
import React from 'react';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { PersonalInfoStep } from '@/components/onboarding/PersonalInfoStep';
import { NotificationPreferencesStep } from '@/components/onboarding/NotificationPreferencesStep';
import { UserRole } from '@/types/roles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const StudentMoodCheckStep = ({ onSave }: { onSave: (data: any) => void }) => {
  const [mood, setMood] = React.useState<string | null>(null);
  
  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
  };
  
  const handleSave = () => {
    if (mood) {
      onSave({ initialMood: mood });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-center">How are you feeling today?</h3>
      <p className="text-center text-muted-foreground">This helps us understand how to better support you.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
        <Card
          className={`hover:bg-muted cursor-pointer ${mood === 'great' ? 'bg-primary/20 border-primary' : ''}`}
          onClick={() => handleMoodSelect('great')}
        >
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <span className="text-4xl">😃</span>
            <span className="text-sm font-medium">Great</span>
          </CardContent>
        </Card>
        
        <Card
          className={`hover:bg-muted cursor-pointer ${mood === 'good' ? 'bg-primary/20 border-primary' : ''}`}
          onClick={() => handleMoodSelect('good')}
        >
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <span className="text-4xl">🙂</span>
            <span className="text-sm font-medium">Good</span>
          </CardContent>
        </Card>
        
        <Card
          className={`hover:bg-muted cursor-pointer ${mood === 'okay' ? 'bg-primary/20 border-primary' : ''}`}
          onClick={() => handleMoodSelect('okay')}
        >
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <span className="text-4xl">😐</span>
            <span className="text-sm font-medium">Okay</span>
          </CardContent>
        </Card>
        
        <Card
          className={`hover:bg-muted cursor-pointer ${mood === 'tired' ? 'bg-primary/20 border-primary' : ''}`}
          onClick={() => handleMoodSelect('tired')}
        >
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <span className="text-4xl">😴</span>
            <span className="text-sm font-medium">Tired</span>
          </CardContent>
        </Card>
        
        <Card
          className={`hover:bg-muted cursor-pointer ${mood === 'sad' ? 'bg-primary/20 border-primary' : ''}`}
          onClick={() => handleMoodSelect('sad')}
        >
          <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
            <span className="text-4xl">😔</span>
            <span className="text-sm font-medium">Sad</span>
          </CardContent>
        </Card>
      </div>
      
      <Button 
        onClick={handleSave} 
        className="w-full" 
        disabled={!mood}
      >
        Save My Mood
      </Button>
    </div>
  );
};

const StudentTrustedAdultsStep = ({ onSave }: { onSave: (data: any) => void }) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  
  // Mock data - in a real app would come from school staff
  const availableAdults = [
    { id: '1', name: 'Ms. Johnson', role: 'School Counselor' },
    { id: '2', name: 'Mr. Smith', role: 'Teacher' },
    { id: '3', name: 'Dr. Williams', role: 'School Psychologist' },
    { id: '4', name: 'Ms. Rodriguez', role: 'Vice Principal' },
  ];
  
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  
  const handleSave = () => {
    onSave({ trustedAdults: selected });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choose Your Trusted Adults</h3>
      <p className="text-muted-foreground">
        Select staff members you feel comfortable talking to when you need support.
        You can change these selections anytime.
      </p>
      
      <RadioGroup className="space-y-3">
        {availableAdults.map((adult) => (
          <div
            key={adult.id}
            className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-muted ${
              selected.includes(adult.id) ? 'bg-primary/10 border-primary' : ''
            }`}
            onClick={() => handleToggle(adult.id)}
          >
            <RadioGroupItem 
              value={adult.id} 
              id={`adult-${adult.id}`} 
              checked={selected.includes(adult.id)}
            />
            <div className="flex-1">
              <Label htmlFor={`adult-${adult.id}`} className="text-base font-medium">
                {adult.name}
              </Label>
              <p className="text-sm text-muted-foreground">{adult.role}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      <Button onClick={handleSave} className="w-full">
        Save Selections
      </Button>
    </div>
  );
};

const StudentOnboarding: React.FC = () => {
  const navigate = useNavigate();
  
  const handleComplete = async () => {
    toast.success("Onboarding complete! Welcome to your Student Dashboard.");
    navigate("/student-dashboard-enhanced");
  };

  const onboardingSteps = [
    {
      title: "Verify Your Information",
      description: "Please confirm or update your personal information below.",
      component: <PersonalInfoStep onSave={() => {}} />,
    },
    {
      title: "How Are You Feeling Today?",
      description: "Let's start with a quick mood check-in.",
      component: <StudentMoodCheckStep onSave={() => {}} />,
    },
    {
      title: "Choose Your Trusted Adults",
      description: "Select staff members you feel comfortable talking with.",
      component: <StudentTrustedAdultsStep onSave={() => {}} />,
    },
    {
      title: "Notification Preferences",
      description: "Choose how you'd like to receive updates.",
      component: <NotificationPreferencesStep onSave={() => {}} />,
    },
  ];

  return (
    <OnboardingFlow 
      steps={onboardingSteps}
      onComplete={handleComplete}
      userRole={UserRole.student}
    />
  );
};

export default StudentOnboarding;
