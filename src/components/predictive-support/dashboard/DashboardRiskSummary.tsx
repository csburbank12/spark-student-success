
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Calendar } from "lucide-react";
import { Intervention, Student } from "../PredictiveSupportEngine";

interface DashboardRiskSummaryProps {
  students: Student[];
  interventions: Intervention[];
}

const DashboardRiskSummary: React.FC<DashboardRiskSummaryProps> = ({
  students,
  interventions,
}) => (
  <div className="grid gap-4 md:grid-cols-4">
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <div className="text-2xl font-bold">{students.filter((s) => s.riskScore >= 75).length}</div>
          <p className="text-sm text-muted-foreground">High Risk</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
          <div className="text-2xl font-bold">{students.filter((s) => s.riskScore >= 50 && s.riskScore < 75).length}</div>
          <p className="text-sm text-muted-foreground">Medium Risk</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold">{students.filter((s) => s.riskScore < 50).length}</div>
          <p className="text-sm text-muted-foreground">Low Risk</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <Calendar className="h-8 w-8 text-primary mb-2" />
          <div className="text-2xl font-bold">{interventions.filter((i) => i.status === "pending" || i.status === "in-progress").length}</div>
          <p className="text-sm text-muted-foreground">Active Interventions</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default DashboardRiskSummary;
