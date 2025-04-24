
import React from "react";
import ResetRoom from "@/components/student-wellness/reset-room/ResetRoom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ResetRoomPage: React.FC = () => {
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
          <h2 className="text-3xl font-heading font-bold">Reset Room</h2>
        </div>
      </div>
      <ResetRoom />
    </div>
  );
};

export default ResetRoomPage;
