
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ThumbsUp, ThumbsDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const InterventionHistorySection: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Intervention History & Effectiveness</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Previous Interventions</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between mb-1">
                <div className="font-medium">Weekly Check-ins with School Counselor</div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3 text-green-500" />
                  Effective
                </Badge>
              </div>
              <p className="text-sm mb-2">Four weekly sessions discussing social anxiety and coping strategies</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>March 5 - March 26, 2023</span>
              </div>
              <div className="mt-3">
                <div className="text-sm font-medium mb-1">Impact Metrics:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Mood Score: +18%</div>
                  <div>Check-in Completion: +25%</div>
                  <div>Classroom Participation: +12%</div>
                  <div>Self-reported Anxiety: -30%</div>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between mb-1">
                <div className="font-medium">Math Tutoring Program</div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <ThumbsDown className="h-3 w-3 text-amber-500" />
                  Partial Effect
                </Badge>
              </div>
              <p className="text-sm mb-2">Twice-weekly after-school math support for 4 weeks</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>February 1 - February 28, 2023</span>
              </div>
              <div className="mt-3">
                <div className="text-sm font-medium mb-1">Impact Metrics:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Math Assessment Scores: +8%</div>
                  <div>Homework Completion: +15%</div>
                  <div>Math Anxiety: -5%</div>
                  <div>Self-confidence: +2%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default InterventionHistorySection;
