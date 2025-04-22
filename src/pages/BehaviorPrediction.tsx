
import React from "react";
import BehaviorPredictionDashboard from "@/components/predictive-support/dashboard/BehaviorPredictionDashboard";
import PredictionConfidenceCard from "@/components/predictive-support/dashboard/PredictionConfidenceCard";

const BehaviorPrediction: React.FC = () => {
  return (
    <div className="space-y-6">
      <BehaviorPredictionDashboard />
      <PredictionConfidenceCard />
    </div>
  );
};

export default BehaviorPrediction;
