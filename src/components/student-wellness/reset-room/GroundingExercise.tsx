
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const GroundingExercise: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">5-4-3-2-1 Grounding Exercise</h3>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <p className="font-semibold text-center">5</p>
          <p className="text-sm text-center">things you can see</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 dark:bg-green-900/20">
        <CardContent className="p-4">
          <p className="font-semibold text-center">4</p>
          <p className="text-sm text-center">things you can touch</p>
        </CardContent>
      </Card>
      <Card className="bg-yellow-50 dark:bg-yellow-900/20">
        <CardContent className="p-4">
          <p className="font-semibold text-center">3</p>
          <p className="text-sm text-center">things you can hear</p>
        </CardContent>
      </Card>
      <Card className="bg-purple-50 dark:bg-purple-900/20">
        <CardContent className="p-4">
          <p className="font-semibold text-center">2</p>
          <p className="text-sm text-center">things you can smell</p>
        </CardContent>
      </Card>
      <Card className="bg-pink-50 dark:bg-pink-900/20">
        <CardContent className="p-4">
          <p className="font-semibold text-center">1</p>
          <p className="text-sm text-center">thing you can taste</p>
        </CardContent>
      </Card>
    </div>
    <div className="text-sm text-muted-foreground">
      <p>This exercise helps you reconnect with your surroundings and the present moment.</p>
    </div>
  </div>
);

export default GroundingExercise;
