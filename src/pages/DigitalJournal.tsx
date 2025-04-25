
import React from "react";
import JournalComponent from "@/components/student-wellness/JournalComponent";
import PageHeader from "@/components/layout/PageHeader";

const DigitalJournal: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Digital Journal" />
      <JournalComponent />
    </div>
  );
};

export default DigitalJournal;
