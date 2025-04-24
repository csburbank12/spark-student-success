
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface WellnessTabProps {
  selectedChildData: any;
  getRiskColor: (level: string) => string;
}

const WellnessTab: React.FC<WellnessTabProps> = ({ selectedChildData, getRiskColor }) => {
  const navigate = useNavigate();
  
  // Mock mood data
  const moodData = [
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 3 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 3 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 4 },
    { day: "Sun", mood: 3 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Check-ins</CardTitle>
          <CardDescription>Last 7 days of mood check-ins</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <XAxis dataKey="day" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/child-wellness?child=${selectedChildData.id}&tab=mood`)}
            >
              View Full Mood History
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wellness Risk Assessment</CardTitle>
          <CardDescription>Current risk level indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <p>Emotional Regulation</p>
                <span className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor("low")}`}>
                  Low Risk
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "20%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p>Social Connection</p>
                <span className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor("low")}`}>
                  Low Risk
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p>Academic Stress</p>
                <span className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(selectedChildData.behaviorRiskLevel)}`}>
                  {selectedChildData.behaviorRiskLevel === "medium" ? "Medium Risk" : "Low Risk"}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div 
                  className={`h-2 rounded-full ${selectedChildData.behaviorRiskLevel === "medium" ? "bg-amber-500" : "bg-green-500"}`} 
                  style={{ width: `${selectedChildData.behaviorRisk}%` }} 
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/child-wellness?child=${selectedChildData.id}&tab=risk`)}
            >
              View Full Risk Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessTab;
