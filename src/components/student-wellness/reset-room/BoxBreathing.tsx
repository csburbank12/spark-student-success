
import React from "react";

const BoxBreathing: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Box Breathing</h3>
    <div className="flex justify-center">
      <div className="w-48 h-48 border-4 border-primary/30 rounded-xl relative p-4 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-sm">Inhale for 4</p>
          <p className="text-sm">Hold for 4</p>
          <p className="text-sm">Exhale for 4</p>
          <p className="text-sm">Hold for 4</p>
          <p className="text-xs text-muted-foreground mt-4">Follow the rhythm</p>
        </div>
      </div>
    </div>
    <div className="text-sm text-muted-foreground">
      <p>
        Box breathing helps reduce stress and improve focus.
        Breathe in through your nose, hold, breathe out through your mouth, hold, and repeat.
      </p>
    </div>
  </div>
);

export default BoxBreathing;
