
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WellnessSummaryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>School Wellness Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">Overall Student Mood</p>
            <div className="flex items-center gap-1">
              <span className="text-3xl">😊</span>
              <span className="text-lg font-semibold">Good</span>
            </div>
            <p className="text-sm text-muted-foreground">Based on today's check-ins</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Check-in Completion</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">78%</span>
              <span className="text-xs text-green-600">↑ 5%</span>
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: "78%" }} />
            </div>
            <p className="text-sm text-muted-foreground">Target: 85%</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Support Requests</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">12</span>
              <span className="text-xs text-amber-600">Pending</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }} />
              <div className="h-2 bg-amber-500 rounded-full" style={{ width: "100%" }} />
              <div className="h-2 bg-red-500 rounded-full" style={{ width: "100%" }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 Low</span>
              <span>5 Medium</span>
              <span>2 High</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-muted/20 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Today's Focus Areas</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
              <span>Grade 10 anxiety levels have increased - follow up with counseling team</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
              <span>Positive response to new mindfulness activities - consider expansion</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
              <span>Parent engagement in SEL home activities up 12% - share success in staff meeting</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
