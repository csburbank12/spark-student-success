import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle } from "lucide-react"; // Use AlertCircle instead of InfoCircle

const RiskOverviewCard = () => {
  // Sample data for demonstration
  const riskData = [
    { id: 1, description: "Low engagement in class activities", severity: "High" },
    { id: 2, description: "Frequent absences", severity: "Medium" },
    { id: 3, description: "Declining grades in core subjects", severity: "Critical" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Overview</CardTitle>
        <CardDescription>Potential risks identified for the student</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {riskData.map((risk) => (
            <div key={risk.id} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium">{risk.description}</span>
              </div>
              <span className={`badge ${risk.severity === "Critical" ? "bg-red-500" : risk.severity === "High" ? "bg-yellow-500" : "bg-green-500"}`}>
                {risk.severity}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskOverviewCard;
