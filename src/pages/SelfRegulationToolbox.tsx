
import React from "react";
import SelfRegulationToolbox from "@/components/student-wellness/SelfRegulationToolbox";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SelfRegulationToolboxPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h2 className="text-3xl font-heading font-bold">Self-Regulation Toolbox</h2>
        </div>
      </div>
      <SelfRegulationToolbox />
    </div>
  );
};

export default SelfRegulationToolboxPage;
