
import React, { useState } from 'react';
import StepFinish from '@/components/onboarding/data-import/StepFinish';
import { Step1 } from '@/components/onboarding/data-import/Step1';
import { Step2 } from '@/components/onboarding/data-import/Step2';
import { Step3 } from '@/components/onboarding/data-import/Step3';
import { Step4 } from '@/components/onboarding/data-import/Step4';

const DataImportWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [importSummary, setImportSummary] = useState({
    totalRecords: 0,
    successfulImports: 0,
    failedImports: 0,
    errors: [],
  });

  const handleFinish = () => {
    // Logic to handle finish
  };

  const handleViewStudents = () => {
    // Logic to view students
  };

  const handleReset = () => {
    // Logic to reset the wizard
  };

  return (
    <div>
      {currentStep === 1 && <Step1 onNext={() => setCurrentStep(2)} />}
      {currentStep === 2 && <Step2 onNext={() => setCurrentStep(3)} />}
      {currentStep === 3 && <Step3 onNext={() => setCurrentStep(4)} />}
      {currentStep === 4 && (
        <StepFinish
          importSummary={importSummary}
          onFinish={handleFinish}
          onViewStudents={handleViewStudents}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default DataImportWizard;
