
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const affirmations = [
  {
    gradient: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
    text: `"I am capable of handling whatever comes my way today."`
  },
  {
    gradient: "from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20",
    text: `"I believe in my abilities and am doing my best."`
  },
  {
    gradient: "from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20",
    text: `"I am allowed to take breaks when I need them."`
  },
  {
    gradient: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
    text: `"My feelings are valid, and I can express them in healthy ways."`
  }
];

const PositiveAffirmations: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Positive Affirmations</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {affirmations.map((a, i) => (
        <Card
          key={i}
          className={`bg-gradient-to-r ${a.gradient}`}
        >
          <CardContent className="p-4 text-center">
            <p className="italic">{a.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="text-sm text-muted-foreground">
      <p>
        Choose an affirmation that resonates with you and repeat it to yourself.
        Take a deep breath between each repetition.
      </p>
    </div>
  </div>
);

export default PositiveAffirmations;
