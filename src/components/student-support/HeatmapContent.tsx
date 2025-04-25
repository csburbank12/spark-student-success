
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeatmapGrid } from "./HeatmapGrid";
import { AlertCircle } from "lucide-react";

interface Student {
  id: string;
  name: string;
  photoUrl: string | null;
  grade: string;
  class: string;
  teacher: string;
  status: "at_risk" | "concerning" | "stable";
  confidenceScore: number;
  moodTrend: string;
  absences: number;
  tardies: number;
  behaviorReports: number;
  currentInterventions: string[];
}

interface HeatmapContentProps {
  filteredData: Student[];
  selectedView: "class" | "grade" | "school";
}

export const HeatmapContent: React.FC<HeatmapContentProps> = ({
  filteredData,
  selectedView,
}) => {
  return (
    <Tabs defaultValue="grid">
      <TabsList>
        <TabsTrigger value="grid">Grid View</TabsTrigger>
        <TabsTrigger value="list">List View</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
      </TabsList>
      
      <TabsContent value="grid" className="pt-4">
        <HeatmapGrid 
          students={filteredData}
          view={selectedView}
        />
      </TabsContent>
      
      <TabsContent value="list" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredData.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No students match your search criteria</p>
              ) : (
                filteredData.map((student) => (
                  <div 
                    key={student.id}
                    className="flex items-center justify-between p-3 border rounded hover:bg-muted/30 cursor-pointer transition-all"
                  >
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Grade {student.grade}, {student.class}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        student.status === "at_risk" ? "bg-red-100 text-red-800 border-red-300" :
                        student.status === "concerning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
                        "bg-green-100 text-green-800 border-green-300"
                      }>
                        {student.status === "at_risk" ? "At Risk" :
                         student.status === "concerning" ? "Concerning" : "Stable"}
                      </Badge>
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="insights" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Insights & Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                AI-powered insights coming soon...
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
