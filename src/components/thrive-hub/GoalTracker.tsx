
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStudentGoals, useUpdateGoal } from "@/hooks/useStudentGoals";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle } from "lucide-react";

export function GoalTracker() {
  const { user } = useAuth();
  const { data: goals } = useStudentGoals(user?.id);
  const { mutate: updateGoal } = useUpdateGoal();

  const currentGoal = goals?.[0];

  const handleCompleteGoal = () => {
    if (currentGoal?.id) {
      updateGoal({ 
        goalId: currentGoal.id, 
        isCompleted: true 
      });
    }
  };

  if (!currentGoal) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Set a goal for this week!</p>
          <Button className="mt-4">Add Goal</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>This Week's Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>{currentGoal.goal_text}</p>
          
          <Progress value={currentGoal.is_completed ? 100 : 0} />
          
          {!currentGoal.is_completed ? (
            <Button onClick={handleCompleteGoal} className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Complete
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              🎉 Goal completed! Great work!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
