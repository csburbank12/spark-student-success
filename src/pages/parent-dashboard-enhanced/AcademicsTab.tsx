
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface AcademicsTabProps {
  selectedChildData: any;
}

const AcademicsTab: React.FC<AcademicsTabProps> = ({ selectedChildData }) => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Academic Progress</CardTitle>
        <CardDescription>Your child's performance across subjects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {/* Math */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Mathematics</h3>
              <span className="font-medium">{selectedChildData.id === "child1" ? "B+" : "C"}</span>
            </div>
            <Progress value={selectedChildData.id === "child1" ? 85 : 72} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {selectedChildData.id === "child1" 
                ? "Strong performance in most areas. Excelling in algebra concepts."
                : "Showing improvement but struggles with some key concepts."}
            </p>
          </div>
          {/* Science */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Science</h3>
              <span className="font-medium">{selectedChildData.id === "child1" ? "A-" : "B-"}</span>
            </div>
            <Progress value={selectedChildData.id === "child1" ? 92 : 82} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {selectedChildData.id === "child1" 
                ? "Excellent participation and understanding of concepts."
                : "Good understanding but needs to complete all assignments."}
            </p>
          </div>
          {/* English */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">English Language Arts</h3>
              <span className="font-medium">{selectedChildData.id === "child1" ? "A" : "B"}</span>
            </div>
            <Progress value={selectedChildData.id === "child1" ? 95 : 85} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {selectedChildData.id === "child1"
                ? "Strong reader with excellent writing skills."
                : "Good participation but needs help organizing written work."}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Upcoming Assignments</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span>Science Project</span>
                <span className="text-muted-foreground">Due Apr 28</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Math Quiz</span>
                <span className="text-muted-foreground">Apr 30</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>English Essay</span>
                <span className="text-muted-foreground">May 5</span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Academic Support Tips</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>Review weekly math concepts together</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>Encourage reading 20 minutes daily</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>Help break down large assignments</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>

    <Button className="w-full mt-4">
      Schedule Teacher Conference
    </Button>
  </>
);

export default AcademicsTab;
