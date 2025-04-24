
import React from "react";
import ResetRoom from "@/components/student-wellness/reset-room/ResetRoom";

const ResetRoomPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Reset Room</h2>
      </div>
      <ResetRoom />
    </div>
  );
};

export default ResetRoomPage;
