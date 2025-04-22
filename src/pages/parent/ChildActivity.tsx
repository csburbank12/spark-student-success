
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ChildActivity = () => {
  // In a real app, this data would be fetched from an API
  const activities = [
    {
      id: 1,
      title: "Completed Breathing Exercise",
      date: "Today, 9:15 AM",
      category: "Wellness",
      details: "5-minute guided breathing session"
    },
    {
      id: 2,
      title: "Journal Entry",
      date: "Yesterday, 3:30 PM",
      category: "Reflection",
      details: "Wrote about school project achievements"
    },
    {
      id: 3,
      title: "Goal Progress Update",
      date: "Apr 20, 2:45 PM",
      category: "Future Me",
      details: "Updated steps toward becoming a veterinarian"
    },
    {
      id: 4,
      title: "Earned 'Consistency' Badge",
      date: "Apr 19, 10:00 AM",
      category: "Achievement",
      details: "Completed 7 consecutive daily check-ins"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Child Activity</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map(activity => (
              <div key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{activity.title}</h3>
                  <Badge variant="outline">{activity.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.date}</p>
                <p className="text-sm">{activity.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildActivity;
