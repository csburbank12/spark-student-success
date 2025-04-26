
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ScheduleCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-3 border-b">
            <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
              <span className="text-sm font-medium">9:00 AM</span>
              <span className="text-xs text-muted-foreground">1 hour</span>
            </div>
            <div>
              <p className="font-medium">Morning Check-in</p>
              <p className="text-sm text-muted-foreground">Student support team</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 pb-3 border-b">
            <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
              <span className="text-sm font-medium">11:30 AM</span>
              <span className="text-xs text-muted-foreground">30 min</span>
            </div>
            <div>
              <p className="font-medium">Student Review: Lily Chen</p>
              <p className="text-sm text-muted-foreground">With Ms. Thompson</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
              <span className="text-sm font-medium">2:00 PM</span>
              <span className="text-xs text-muted-foreground">1 hour</span>
            </div>
            <div>
              <p className="font-medium">SEL Program Planning</p>
              <p className="text-sm text-muted-foreground">Conference Room B</p>
            </div>
          </div>
        </div>
        <Button variant="link" className="mt-4 px-0">View Full Calendar</Button>
      </CardContent>
    </Card>
  );
};
