
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, ThumbsUp, ThumbsDown, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RiskScoreCard from "../RiskScoreCard";
import RiskFactorsCard from "../RiskFactorsCard";
import InterventionTimeline from "../InterventionTimeline";
import InterventionCard from "../InterventionCard";
import { Student, Intervention } from "../PredictiveSupportEngine";

interface StudentDetailViewProps {
  selectedStudent: Student;
  interventions: Intervention[];
  onBack: () => void;
}

const StudentDetailView: React.FC<StudentDetailViewProps> = ({
  selectedStudent,
  interventions,
  onBack,
}) => (
  <>
    <div className="flex items-center">
      <Button variant="ghost" className="mr-2" onClick={onBack}>
        Back to List
      </Button>
      <h3 className="text-xl font-medium">
        Student Support Plan: {selectedStudent?.name}
      </h3>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <RiskScoreCard student={selectedStudent} />
      <RiskFactorsCard student={selectedStudent} />
    </div>
    <Tabs defaultValue="interventions" className="w-full mt-6">
      <TabsList>
        <TabsTrigger value="interventions">Interventions</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="interventions" className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recommended Interventions</CardTitle>
            <Button size="sm" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Intervention
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interventions.map((intervention) => (
                <InterventionCard
                  key={intervention.id}
                  intervention={intervention}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="timeline">
        <InterventionTimeline interventions={interventions} />
      </TabsContent>
      <TabsContent value="history">
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
              <div>
                <h3 className="font-medium mb-2">Most Effective Strategies for This Student</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>One-on-one counseling</span>
                    <div className="flex items-center gap-1">
                      <Progress value={85} className="w-24 h-2 bg-gray-100" />
                      <span className="text-sm">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mindfulness practices</span>
                    <div className="flex items-center gap-1">
                      <Progress value={72} className="w-24 h-2 bg-gray-100" />
                      <span className="text-sm">72%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Parent involvement</span>
                    <div className="flex items-center gap-1">
                      <Progress value={68} className="w-24 h-2 bg-gray-100" />
                      <span className="text-sm">68%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Peer mentoring</span>
                    <div className="flex items-center gap-1">
                      <Progress value={45} className="w-24 h-2 bg-gray-100" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </>
);

export default StudentDetailView;
