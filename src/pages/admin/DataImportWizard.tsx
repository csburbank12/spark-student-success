import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { EducationSystem } from "@/types/roles";
import StepConnectSIS from "@/components/onboarding/data-import/StepConnectSIS";
import StepMapFields from "@/components/onboarding/data-import/StepMapFields";
import StepPreviewImport from "@/components/onboarding/data-import/StepPreviewImport";
import StepConfirm from "@/components/onboarding/data-import/StepConfirm";
import StepFinish from "@/components/onboarding/data-import/StepFinish";
import WelcomeStep from "@/components/onboarding/data-import/WelcomeStep";

const DataImportWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSystem, setSelectedSystem] = useState<EducationSystem | null>(null);
  const [connectionConfig, setConnectionConfig] = useState<Record<string, any>>({});
  const [mappedFields, setMappedFields] = useState<Record<string, string>>({});
  const [previewData, setPreviewData] = useState<Array<any>>([]);
  const [importSummary, setImportSummary] = useState<{
    totalRecords: number;
    successfulImports: number;
    failedImports: number;
    errors: Array<any>;
  }>({
    totalRecords: 0,
    successfulImports: 0,
    failedImports: 0,
    errors: []
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const steps = [
    {
      title: "Welcome",
      description: "Start the student data import process"
    },
    {
      title: "Connect SIS",
      description: "Connect to your Student Information System"
    },
    {
      title: "Map Fields",
      description: "Match your data fields with our system"
    },
    {
      title: "Preview Import",
      description: "Review data before importing"
    },
    {
      title: "Confirm",
      description: "Start the import process"
    },
    {
      title: "Finish",
      description: "Import complete"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSelectSystem = (system: EducationSystem) => {
    setSelectedSystem(system);
  };

  const handleConfigUpdate = (config: Record<string, any>) => {
    setConnectionConfig(prev => ({ ...prev, ...config }));
  };

  const handleFieldMapping = (mappings: Record<string, string>) => {
    setMappedFields(mappings);
  };

  const handleDataPreview = (data: Array<any>) => {
    setPreviewData(data);
  };

  const handleImport = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const totalRecords = previewData.length;
      const failedImports = Math.floor(Math.random() * 5);
      const successfulImports = totalRecords - failedImports;
      
      const errors = Array.from({ length: failedImports }).map((_, index) => ({
        row: Math.floor(Math.random() * totalRecords) + 1,
        error: "Invalid data format",
        data: previewData[index % previewData.length]
      }));
      
      setImportSummary({
        totalRecords,
        successfulImports,
        failedImports,
        errors
      });
      
      handleNext();
      toast.success(`Successfully imported ${successfulImports} records`);
    } catch (error: any) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinish = () => {
    toast.success("Student data import completed!");
    navigate("/admin/students");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep
            onNext={handleNext}
            onSelectSystem={handleSelectSystem}
            selectedSystem={selectedSystem}
          />
        );
      case 1:
        return (
          <StepConnectSIS
            system={selectedSystem || 'csv'}
            onConnectionUpdate={handleConfigUpdate}
            connectionConfig={connectionConfig}
          />
        );
      case 2:
        return (
          <StepMapFields
            system={selectedSystem || 'csv'}
            connectionConfig={connectionConfig}
            onFieldMapping={handleFieldMapping}
            onDataPreview={handleDataPreview}
          />
        );
      case 3:
        return (
          <StepPreviewImport
            previewData={previewData}
            mappedFields={mappedFields}
          />
        );
      case 4:
        return (
          <StepConfirm
            system={selectedSystem || 'csv'}
            connectionConfig={connectionConfig}
            mappedFields={mappedFields}
            recordCount={previewData.length}
            onImport={handleImport}
            isProcessing={isProcessing}
          />
        );
      case 5:
        return (
          <StepFinish
            importSummary={importSummary}
            onReset={() => setCurrentStep(0)}
            onFinish={handleFinish}
            onViewStudents={() => navigate("/admin/students")}
          />
        );
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Student Data Import Wizard</h1>
      
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`text-xs md:text-sm ${currentStep === index ? 'text-primary font-medium' : currentStep > index ? 'text-green-500' : 'text-muted-foreground'}`}
              style={{ width: `${100 / steps.length}%`, textAlign: 'center' }}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isProcessing}
          >
            Back
          </Button>
          
          <Button
            onClick={currentStep === 4 ? handleImport : (currentStep === 5 ? handleFinish : handleNext)}
            disabled={
              (currentStep === 0 && !selectedSystem) ||
              isProcessing ||
              (currentStep === 3 && previewData.length === 0)
            }
          >
            {currentStep === 4 ? (isProcessing ? 'Importing...' : 'Start Import') : 
             currentStep === 5 ? 'Finish' : 'Continue'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataImportWizard;
