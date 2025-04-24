
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ResetBenefits from "./components/ResetBenefits";
import ResetContent from "./components/ResetContent";

const ResetRoom: React.FC = () => {
  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem("resetRoomSessionCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-muted/30 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Take a moment to reset</CardTitle>
              <CardDescription>
                Choose an activity below and take a few minutes to refocus your energy.
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Total resets: {sessionCount}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ResetContent sessionCount={sessionCount} setSessionCount={setSessionCount} />
        </CardContent>
      </Card>
      
      <ResetBenefits />
    </div>
  );
};

export default ResetRoom;
