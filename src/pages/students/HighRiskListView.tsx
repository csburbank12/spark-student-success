
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Student {
  id: string;
  full_name: string;
  email: string;
  riskFactors: string[];
  daysInRisk: number;
}

interface HighRiskListViewProps {
  students: Student[];
}

const HighRiskListView: React.FC<HighRiskListViewProps> = ({ students }) => (
  <div className="border rounded-md">
    <table className="w-full">
      <thead>
        <tr className="bg-muted/50">
          <th className="text-left p-3 text-sm">Student</th>
          <th className="text-left p-3 text-sm">Risk Factors</th>
          <th className="text-left p-3 text-sm">Days at Risk</th>
          <th className="text-left p-3 text-sm">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {students.map((student) => (
          <tr key={student.id} className="hover:bg-muted/20">
            <td className="p-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {student.full_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-sm">{student.full_name}</div>
                  <div className="text-xs text-muted-foreground">{student.email}</div>
                </div>
              </div>
            </td>
            <td className="p-3">
              <div className="flex flex-wrap gap-1">
                {student.riskFactors.map((factor, idx) => (
                  <Badge key={idx} variant="outline" className="bg-background">{factor}</Badge>
                ))}
              </div>
            </td>
            <td className="p-3">
              <Badge
                variant={student.daysInRisk > 7 ? "destructive" : "outline"}
                className={student.daysInRisk > 7 ? "" : "bg-background"}
              >
                {student.daysInRisk} {student.daysInRisk === 1 ? 'day' : 'days'}
              </Badge>
            </td>
            <td className="p-3">
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Create Plan</Button>
                <Button size="sm">Contact</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default HighRiskListView;
