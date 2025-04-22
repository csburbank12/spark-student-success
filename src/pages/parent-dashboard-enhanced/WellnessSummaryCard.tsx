
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, BookOpen } from "lucide-react";
import { Child } from "./ChildSelector";

interface WellnessSummaryCardProps {
  childData: any;
  getWellnessSummary: () => { title: string; description: string; statusColor: string; };
  getTrendIcon: (trend: string) => React.ReactNode;
}

const WellnessSummaryCard: React.FC<WellnessSummaryCardProps> = ({ childData, getWellnessSummary, getTrendIcon }) => {
  const wellnessSummary = getWellnessSummary();

  return (
    <Card className="border-l-4" style={{
      borderLeftColor:
        childData.behaviorRiskLevel === "low" ? "rgb(34 197 94)" :
        childData.behaviorRiskLevel === "medium" ? "rgb(245 158 11)" :
        "rgb(239 68 68)" }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{childData.name}'s Wellness Summary</CardTitle>
            <CardDescription>
              <span className={wellnessSummary.statusColor + " font-medium"}>{wellnessSummary.title}</span> - {wellnessSummary.description}
            </CardDescription>
          </div>
          {childData.alerts > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {childData.alerts} Alert
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">School</div>
            <div className="flex items-center gap-1">
              <School className="h-4 w-4 text-primary" />
              <span>{childData.school}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Grade</div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>{childData.grade}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Recent Mood</div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 text-primary">💖</span>
              <span>{childData.recentMood}</span>
              {getTrendIcon(childData.moodTrend)}
            </div>
            <div className="text-sm text-muted-foreground mt-2">Academic Standing</div>
            <div className="flex items-center gap-1">
              <Badge className={childData.academicStanding === "On Track" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                {childData.academicStanding}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Attendance</div>
            <div className="flex items-center gap-1">
              <span>{childData.attendance}%</span>
              {getTrendIcon(childData.attendanceTrend)}
            </div>
            <div className="text-sm text-muted-foreground mt-2">Check-ins</div>
            <div>{childData.checkIns} in the last 2 weeks</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessSummaryCard;
