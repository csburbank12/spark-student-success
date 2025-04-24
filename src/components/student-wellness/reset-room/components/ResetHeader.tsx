
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResetHeaderProps {
  sessionCount: number;
}

const ResetHeader: React.FC<ResetHeaderProps> = ({ sessionCount }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold">5-Minute Reset Room</h2>
          <p className="text-muted-foreground">Take a moment to pause, breathe, and reset</p>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          Total resets: {sessionCount}
        </div>
      </div>
    </div>
  );
};

export default ResetHeader;
