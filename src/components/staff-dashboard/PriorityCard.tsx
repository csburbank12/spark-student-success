
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PriorityCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Priorities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-100">
            <div>
              <p className="font-medium">Follow-up: Alex Johnson</p>
              <p className="text-sm text-muted-foreground">Missed check-ins for 3 days</p>
            </div>
            <Button size="sm" variant="destructive">Action</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50 border-amber-100">
            <div>
              <p className="font-medium">SEL Pathway Review</p>
              <p className="text-sm text-muted-foreground">Grade 9 effectiveness assessment</p>
            </div>
            <Button size="sm" variant="outline">Review</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Staff Meeting Preparation</p>
              <p className="text-sm text-muted-foreground">Wellness program update slides</p>
            </div>
            <Button size="sm" variant="outline">View</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
