
export interface SchoolData {
  name: string;
  code: string;
  address: string;
  email?: string;
  phone?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
}

export interface StepStatus {
  step1Complete: boolean;
  step2Complete: boolean;
  step3Complete: boolean;
  step4Complete: boolean;
}

export interface BaseStepProps {
  onComplete: (isComplete: boolean) => void;
}

export interface SchoolDataStepProps extends BaseStepProps {
  schoolData: SchoolData;
  updateSchoolData: (data: Partial<SchoolData>) => void;
}

export interface ImportStepProps extends BaseStepProps {
  schoolCode: string;
}

export interface ReviewStepProps {
  schoolData: SchoolData;
  stepStatus: StepStatus;
}
