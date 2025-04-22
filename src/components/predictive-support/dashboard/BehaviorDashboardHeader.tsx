
import React from "react";

const BehaviorDashboardHeader: React.FC = () => (
  <div className="flex items-center justify-between">
    <h2 className="text-3xl font-heading font-bold">Behavior Prediction Dashboard</h2>
    <div className="text-sm text-muted-foreground">
      Last updated: {new Date().toLocaleDateString()}
    </div>
  </div>
);

export default BehaviorDashboardHeader;
