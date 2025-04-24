
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ResetBenefits: React.FC = () => {
  return (
    <Card className="border border-muted">
      <CardHeader>
        <CardTitle className="text-lg">Reset Room Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-1">
            <h4 className="font-medium">Emotional Regulation</h4>
            <p className="text-muted-foreground">Help manage strong emotions through mindful practices</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Improved Focus</h4>
            <p className="text-muted-foreground">Reset your attention to better engage in learning</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Stress Reduction</h4>
            <p className="text-muted-foreground">Decrease stress hormones and promote calm</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetBenefits;
