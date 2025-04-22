
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface WellnessTabProps {
  selectedChildData: any;
  getRiskColor: (level: string) => string;
}

const WellnessTab: React.FC<WellnessTabProps> = ({ selectedChildData, getRiskColor }) => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Wellness Overview</CardTitle>
        <CardDescription>Understanding your child's wellness at school</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Overall Wellness Score</h3>
            <Badge className={getRiskColor(selectedChildData.behaviorRiskLevel)}>
              {selectedChildData.behaviorRiskLevel === "low" ? "Strong" : selectedChildData.behaviorRiskLevel === "medium" ? "Mixed" : "Needs Support"}
            </Badge>
          </div>
          <Progress value={100 - selectedChildData.behaviorRisk} className="h-2" />
          <p className="text-xs text-muted-foreground">
            This score summarizes your child's overall wellness at school, including mood, social interactions, and engagement.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-medium mb-1">Recent Moods</h3>
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <span className="text-lg">😊</span>
                  <span className="text-sm">Happy</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">🙂</span>
                  <span className="text-sm">Good</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <span className="text-lg">😐</span>
                  <span className="text-sm">Okay</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lg">😔</span>
                  <span className="text-sm">Sad</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-medium mb-1">Social Well-being</h3>
            <p className="text-sm">
              {selectedChildData.behaviorRiskLevel === "low"
                ? "Your child appears to be connecting well with peers and participating in class activities."
                : selectedChildData.behaviorRiskLevel === "medium"
                ? "Your child sometimes engages with peers but may need support with social connections."
                : "Your child may need additional support with social connections and classroom participation."
              }
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Monthly Mood Trend</h3>
          <div className="h-40 border rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Mood trend visualization coming soon</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Support at Home</CardTitle>
        <CardDescription>Ways to support your child's emotional well-being</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 border rounded-md">
            <h3 className="font-medium">Create Conversation Opportunities</h3>
            <p className="text-sm mt-1">
              Find relaxed times to chat, like during car rides or while preparing meals. 
              Ask open-ended questions about their day and listen without judgment.
            </p>
          </div>
          <div className="p-3 border rounded-md">
            <h3 className="font-medium">Establish Consistent Routines</h3>
            <p className="text-sm mt-1">
              Predictable routines help children feel secure and reduce stress.
              Maintain consistent meal times, homework time, and bedtimes.
            </p>
          </div>
          <div className="p-3 border rounded-md">
            <h3 className="font-medium">Practice Mindfulness Together</h3>
            <p className="text-sm mt-1">
              Take 5 minutes each day for deep breathing or a mindful activity together.
              This helps develop emotional awareness and coping skills.
            </p>
            <div>
              <button className="text-primary px-0 text-sm underline bg-transparent border-none cursor-pointer">View Guided Activities</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);

export default WellnessTab;
