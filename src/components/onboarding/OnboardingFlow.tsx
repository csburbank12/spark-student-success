import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

interface OnboardingStep {
  title: string;
  description: string;
  component: React.ReactNode;
}

interface OnboardingFlowProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  userRole: UserRole;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  steps,
  onComplete,
  userRole,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { completeOnboarding } = useOnboardingStatus();
  
  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await completeOnboarding();
      await onComplete();
      
      // Navigate to the appropriate dashboard based on user role
      switch (userRole) {
        case UserRole.teacher:
          navigate('/teacher-dashboard-enhanced');
          break;
        case UserRole.student:
          navigate('/student-dashboard-enhanced');
          break;
        case UserRole.parent:
          navigate('/parent-dashboard-enhanced');
          break;
        case UserRole.admin:
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Failed to complete onboarding");
    } finally {
      setIsCompleting(false);
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const schoolName = user?.schoolId ? "Your School" : "Your School"; // This would normally get the school name from the school ID

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to {schoolName}</CardTitle>
          <CardDescription>
            Let's get your account set up - {currentStep + 1} of {steps.length}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{currentStepData.title}</h3>
            <p className="text-muted-foreground">{currentStepData.description}</p>
            <div className="py-4">{currentStepData.component}</div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 0 || isCompleting}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isCompleting}
          >
            {isLastStep ? 'Complete Setup' : 'Continue'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
