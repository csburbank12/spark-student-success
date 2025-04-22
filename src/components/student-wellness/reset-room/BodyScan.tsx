
import React from "react";

const BodyScan: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Body Scan</h3>
    <div className="p-4 bg-muted/30 rounded-lg">
      <ol className="space-y-2 text-sm">
        <li>1. Sit or lie down in a comfortable position</li>
        <li>2. Close your eyes and take a few deep breaths</li>
        <li>3. Focus your attention on your feet, noticing any sensations</li>
        <li>4. Slowly move your attention up through your legs, torso, arms, and head</li>
        <li>5. Notice any areas of tension or discomfort</li>
        <li>6. Breathe into those areas and imagine them relaxing</li>
        <li>7. Continue until you've scanned your whole body</li>
      </ol>
    </div>
    <div className="text-sm text-muted-foreground">
      <p>
        A body scan helps you become aware of physical sensations and release tension you may be holding.
      </p>
    </div>
  </div>
);

export default BodyScan;
