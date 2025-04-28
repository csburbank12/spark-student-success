
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EducationSystem } from "@/types/roles";
import { 
  Database, 
  FileSpreadsheet, 
  ArrowRight, 
  School, 
  BookOpen, 
  Building, 
  GraduationCap 
} from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
  onSelectSystem: (system: EducationSystem) => void;
  selectedSystem: EducationSystem | null;
}

const systemOptions: Array<{
  id: EducationSystem;
  name: string;
  icon: React.ReactNode;
  description: string;
}> = [
  {
    id: "skyward",
    name: "Skyward",
    icon: <Database className="h-6 w-6 text-blue-600" />,
    description: "Connect to your Skyward SIS instance"
  },
  {
    id: "powerschool",
    name: "PowerSchool",
    icon: <School className="h-6 w-6 text-purple-600" />,
    description: "Import from PowerSchool"
  },
  {
    id: "infinite_campus",
    name: "Infinite Campus",
    icon: <BookOpen className="h-6 w-6 text-green-600" />,
    description: "Connect to Infinite Campus"
  },
  {
    id: "aeries",
    name: "Aeries",
    icon: <Building className="h-6 w-6 text-orange-600" />,
    description: "Import from Aeries SIS"
  },
  {
    id: "csv",
    name: "CSV/Excel Upload",
    icon: <FileSpreadsheet className="h-6 w-6 text-gray-600" />,
    description: "Upload data from spreadsheet"
  }
];

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, onSelectSystem, selectedSystem }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-blue-800 mb-6">
        <div className="flex items-start">
          <GraduationCap className="h-6 w-6 mr-3 text-blue-700 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Welcome to Student Data Import</h3>
            <p className="text-blue-700">
              This wizard will guide you through importing student data from your SIS into our platform. 
              Select the system you're using to get started.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systemOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all hover:border-primary ${
              selectedSystem === option.id ? 'border-2 border-primary bg-primary/5' : ''
            }`}
            onClick={() => onSelectSystem(option.id)}
          >
            <CardContent className="p-6 flex items-center">
              <div className="mr-4">
                {option.icon}
              </div>
              <div>
                <h3 className="font-medium text-lg">{option.name}</h3>
                <p className="text-muted-foreground text-sm">{option.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={onNext} 
          disabled={!selectedSystem}
          className="flex items-center"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;
