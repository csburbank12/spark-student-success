
import React from "react";
import ResetRoom from "@/components/student-wellness/reset-room/ResetRoom";
import PageHeader from "@/components/layout/PageHeader";

const ResetRoomPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Reset Room" />
      <ResetRoom />
    </div>
  );
};

export default ResetRoomPage;
