
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface InterventionsTabProps {
  interventionTypes: { name: string; count: number; success: number }[];
  aggregatedData: {
    activeInterventions: number;
  };
}

const InterventionsTab: React.FC<InterventionsTabProps> = ({ interventionTypes, aggregatedData }) => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Intervention Distribution</CardTitle>
        <CardDescription>Types of interventions currently active</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {interventionTypes.map((type) => (
            <div key={type.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{type.name}</span>
                <span>{type.count} active</span>
              </div>
              <Progress
                value={
                  aggregatedData.activeInterventions
                    ? (type.count / aggregatedData.activeInterventions) * 100
                    : 0
                }
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Intervention Effectiveness</CardTitle>
        <CardDescription>Success rates by intervention type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {interventionTypes.map((type) => (
            <div key={type.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{type.name}</span>
                <span>{type.success}% effective</span>
              </div>
              <Progress value={type.success} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export const RecentInterventionsTable: React.FC = () => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>Recent Interventions</CardTitle>
      <CardDescription>Recently applied interventions across schools</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border">
        <div className="grid grid-cols-12 border-b py-3 px-4 font-medium text-sm">
          <div className="col-span-3">Intervention</div>
          <div className="col-span-2">Student</div>
          <div className="col-span-2">School</div>
          <div className="col-span-2">Applied By</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Applied Date</div>
        </div>
        <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
          <div className="col-span-3">Daily Check-in Strategy</div>
          <div className="col-span-2">Alex Johnson</div>
          <div className="col-span-2">Washington HS</div>
          <div className="col-span-2">Ms. Rodriguez</div>
          <div className="col-span-1">
            <Badge variant="outline">Active</Badge>
          </div>
          <div className="col-span-2">Apr 18, 2025</div>
        </div>
        <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
          <div className="col-span-3">Attendance Improvement Plan</div>
          <div className="col-span-2">Emma Davis</div>
          <div className="col-span-2">Washington HS</div>
          <div className="col-span-2">Mr. Williams</div>
          <div className="col-span-1">
            <Badge variant="outline">Active</Badge>
          </div>
          <div className="col-span-2">Apr 10, 2025</div>
        </div>
        <div className="grid grid-cols-12 py-3 px-4 text-sm items-center hover:bg-muted/50">
          <div className="col-span-3">Social Skills Group</div>
          <div className="col-span-2">Lily Chen</div>
          <div className="col-span-2">Washington HS</div>
          <div className="col-span-2">Dr. Wong</div>
          <div className="col-span-1">
            <Badge variant="outline">New</Badge>
          </div>
          <div className="col-span-2">Apr 21, 2025</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default InterventionsTab;
