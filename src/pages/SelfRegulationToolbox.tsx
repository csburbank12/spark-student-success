
import React from "react";
import SelfRegulationToolbox from "@/components/student-wellness/SelfRegulationToolbox";
import PageHeader from "@/components/layout/PageHeader";

const SelfRegulationToolboxPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Self-Regulation Toolbox" />
      <SelfRegulationToolbox />
    </div>
  );
};

export default SelfRegulationToolboxPage;
