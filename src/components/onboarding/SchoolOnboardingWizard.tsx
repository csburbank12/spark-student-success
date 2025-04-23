
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Step1BasicInfo,
  Step2Configuration,
  Step3StaffImport,
  Step4StudentImport,
  Step5Review,
  StepStatus
} from './OnboardingSteps';

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

const SchoolOnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [schoolData, setSchoolData] = useState<SchoolData>({
    name: '',
    code: '',
    address: '',
  });

  const [stepStatus, setStepStatus] = useState<StepStatus>({
    step1Complete: false,
    step2Complete: false,
    step3Complete: false,
    step4Complete: false,
  });

  const updateSchoolData = (newData: Partial<SchoolData>) => {
    setSchoolData(prev => ({ ...prev, ...newData }));
  };

  const handleStepCompletion = (step: keyof StepStatus, isComplete: boolean) => {
    setStepStatus(prev => ({ ...prev, [step]: isComplete }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // In a real implementation, this would save the data to the database
    // For now, we'll just show a success message and navigate back
    toast.success(`${schoolData.name} has been successfully onboarded!`);
    navigate('/school-management');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            schoolData={schoolData}
            updateSchoolData={updateSchoolData}
            onComplete={(isComplete) => handleStepCompletion('step1Complete', isComplete)}
          />
        );
      case 2:
        return (
          <Step2Configuration
            schoolData={schoolData}
            updateSchoolData={updateSchoolData}
            onComplete={(isComplete) => handleStepCompletion('step2Complete', isComplete)}
          />
        );
      case 3:
        return (
          <Step3StaffImport
            schoolCode={schoolData.code}
            onComplete={(isComplete) => handleStepCompletion('step3Complete', isComplete)}
          />
        );
      case 4:
        return (
          <Step4StudentImport
            schoolCode={schoolData.code}
            onComplete={(isComplete) => handleStepCompletion('step4Complete', isComplete)}
          />
        );
      case 5:
        return (
          <Step5Review
            schoolData={schoolData}
            stepStatus={stepStatus}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">School Onboarding</h2>
      </div>

      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`flex flex-col items-center ${
              step <= currentStep ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step === currentStep
                  ? 'bg-primary text-white'
                  : step < currentStep
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step}
            </div>
            <span className="text-sm hidden md:block">
              {step === 1 && 'School Info'}
              {step === 2 && 'Configuration'}
              {step === 3 && 'Staff Import'}
              {step === 4 && 'Student Import'}
              {step === 5 && 'Review'}
            </span>
          </div>
        ))}
      </div>

      <Card className="p-6">
        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          <div className="flex-1" />
          {currentStep < 5 ? (
            <Button 
              onClick={nextStep} 
              disabled={
                (currentStep === 1 && !stepStatus.step1Complete) ||
                (currentStep === 2 && !stepStatus.step2Complete) ||
                (currentStep === 3 && !stepStatus.step3Complete) ||
                (currentStep === 4 && !stepStatus.step4Complete)
              }
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Complete Onboarding</Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SchoolOnboardingWizard;
