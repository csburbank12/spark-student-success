
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HighRiskListView from "./HighRiskListView";
import HighRiskCardView from "./HighRiskCardView";

interface Student {
  id: string;
  full_name: string;
  email: string;
  riskFactors: string[];
  daysInRisk: number;
}

interface HighRiskStudentsProps {
  students: Student[];
}

const HighRiskStudents: React.FC<HighRiskStudentsProps> = ({ students }) => (
  <Card>
    <CardHeader>
      <CardTitle>High Risk Students</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {students.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No high risk students identified</p>
        ) : (
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <HighRiskListView students={students} />
            </TabsContent>
            <TabsContent value="cards">
              <HighRiskCardView students={students} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </CardContent>
  </Card>
);

export default HighRiskStudents;
