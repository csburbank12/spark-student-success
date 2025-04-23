
import React from "react";

const StaffAssistAccessDenied: React.FC = () => (
  <div className="max-w-lg mx-auto mt-20">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Access Denied
        </h3>
      </div>
      <div className="p-6 pt-0">
        <p>
          You do not have permission to access Staff Assist Mode.
        </p>
      </div>
    </div>
  </div>
);

export default StaffAssistAccessDenied;
