
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RecentActivityCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="text-sm border-l-2 border-primary pl-3 py-1">
            New school onboarded: Washington High School (2 hours ago)
          </li>
          <li className="text-sm border-l-2 border-primary pl-3 py-1">
            System update completed: v2.4.3 (Yesterday)
          </li>
          <li className="text-sm border-l-2 border-primary pl-3 py-1">
            User roles updated for Lincoln Middle School (2 days ago)
          </li>
        </ul>
        <Button variant="link" className="mt-4 px-0">View all activity</Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
