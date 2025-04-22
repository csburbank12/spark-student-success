
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertTriangle, User, BarChart } from "lucide-react";

interface StatsRowProps {
  aggregatedData: {
    studentCount: number;
    staffCount: number;
    highRiskCount: number;
    moderateRiskCount: number;
    lowRiskCount: number;
    activeInterventions: number;
  };
  totalRisk: number;
}

const AdminStatsCardsRow: React.FC<StatsRowProps> = ({ aggregatedData, totalRisk }) => (
  <div className="grid gap-4 md:grid-cols-4">
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold">{aggregatedData.studentCount.toLocaleString()}</p>
          </div>
          <Users className="h-10 w-10 text-primary opacity-20" />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Students at Risk</p>
            <p className="text-2xl font-bold">{totalRisk.toLocaleString()}</p>
          </div>
          <AlertTriangle className="h-10 w-10 text-amber-500 opacity-20" />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Staff Members</p>
            <p className="text-2xl font-bold">{aggregatedData.staffCount.toLocaleString()}</p>
          </div>
          <User className="h-10 w-10 text-primary opacity-20" />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Active Interventions</p>
            <p className="text-2xl font-bold">{aggregatedData.activeInterventions.toLocaleString()}</p>
          </div>
          <BarChart className="h-10 w-10 text-primary opacity-20" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminStatsCardsRow;
