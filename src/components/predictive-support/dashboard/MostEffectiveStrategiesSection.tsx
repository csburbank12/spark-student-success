
import React from "react";
import { Progress } from "@/components/ui/progress";

const MostEffectiveStrategiesSection: React.FC = () => (
  <div>
    <h3 className="font-medium mb-2">Most Effective Strategies for This Student</h3>
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span>One-on-one counseling</span>
        <div className="flex items-center gap-1">
          <Progress value={85} className="w-24 h-2 bg-gray-100" />
          <span className="text-sm">85%</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Mindfulness practices</span>
        <div className="flex items-center gap-1">
          <Progress value={72} className="w-24 h-2 bg-gray-100" />
          <span className="text-sm">72%</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Parent involvement</span>
        <div className="flex items-center gap-1">
          <Progress value={68} className="w-24 h-2 bg-gray-100" />
          <span className="text-sm">68%</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Peer mentoring</span>
        <div className="flex items-center gap-1">
          <Progress value={45} className="w-24 h-2 bg-gray-100" />
          <span className="text-sm">45%</span>
        </div>
      </div>
    </div>
  </div>
);

export default MostEffectiveStrategiesSection;
