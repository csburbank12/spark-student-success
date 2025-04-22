
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Student {
  id: string;
  full_name: string;
  email: string;
  riskFactors: string[];
  daysInRisk: number;
}

interface HighRiskCardViewProps {
  students: Student[];
}

const HighRiskCardView: React.FC<HighRiskCardViewProps> = ({ students }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {students.map((student) => (
      <Card key={student.id}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {student.full_name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-medium">{student.full_name}</div>
              <div className="text-sm text-muted-foreground">At risk for {student.daysInRisk} days</div>
            </div>
          </div>
          <div className="mb-3">
            <div className="text-sm font-medium mb-2">Risk Factors:</div>
            <div className="flex flex-wrap gap-1">
              {student.riskFactors.map((factor, idx) => (
                <Badge key={idx} variant="outline" className="bg-background">{factor}</Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">Create Plan</Button>
            <Button size="sm" className="flex-1">Contact</Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default HighRiskCardView;
