
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Student } from "./PredictiveSupportEngine";

interface RiskFactorsCardProps {
  student: Student;
}

const RiskFactorsCard: React.FC<RiskFactorsCardProps> = ({ student }) => {
  // Mock factor importance scores (would come from AI in real implementation)
  const factorImportance: Record<string, number> = {
    "Declining grades": 85,
    "Increased absences": 74,
    "Negative journal sentiment": 68,
    "Low engagement": 62,
    "Peer conflict": 58,
    "Recent mood decline": 65,
    "Behavioral incidents": 80,
    "Low check-in rate": 55,
    "Moderate absences": 45
  };
  
  // Generate explanations based on factors
  const generateExplanation = (factor: string) => {
    const explanations: Record<string, string> = {
      "Declining grades": "Math grades dropped from B to D over 3 weeks. English assignment completion rate is 65%, down from 90% last month.",
      "Increased absences": "5 absences in the last 3 weeks compared to 2 in the previous month. Primarily missing morning classes.",
      "Negative journal sentiment": "Journal entries show increased negative emotions (sad, frustrated, anxious) in the past 2 weeks.",
      "Low engagement": "Participation in class discussions has decreased by 40%. Teacher reports indicate reduced focus.",
      "Peer conflict": "Two reported incidents of peer conflict in the past week. Counselor notes indicate social difficulties.",
      "Recent mood decline": "Mood check-ins show a downward trend over 10 days, moving from 'happy' to 'sad' or 'stressed'.",
      "Behavioral incidents": "Three behavioral incidents reported in the last 2 weeks compared to none in previous months.",
      "Low check-in rate": "Only completed 3 of 10 requested check-ins in the past two weeks.",
      "Moderate absences": "3 absences in the past month, slightly above class average."
    };
    
    return explanations[factor] || "Additional data being analyzed.";
  };
  
  const tooltipContent = (
    <p className="w-80">These factors contribute to the risk score with varying levels of importance. Click on any factor to see the underlying data that led to this assessment.</p>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Risk Factors & Explanations</CardTitle>
          <Tooltip content={tooltipContent}>
            <Info className="h-4 w-4 text-muted-foreground" />
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {student.riskFactors.length === 0 ? (
          <p className="text-muted-foreground">No significant risk factors identified</p>
        ) : (
          student.riskFactors.map((factor, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <div className="font-medium">{factor}</div>
                <div className="text-sm">{factorImportance[factor] || 50}% Impact</div>
              </div>
              <Progress 
                value={factorImportance[factor] || 50} 
                className="h-1.5 mb-2"
              />
              <div className="text-sm text-muted-foreground bg-muted/40 p-2 rounded">
                {generateExplanation(factor)}
              </div>
            </div>
          ))
        )}
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Data Sources</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Check-ins:</span>
              <span>Last 14 days</span>
            </div>
            <div className="flex justify-between">
              <span>Academic Data:</span>
              <span>Last 30 days</span>
            </div>
            <div className="flex justify-between">
              <span>Attendance:</span>
              <span>Current semester</span>
            </div>
            <div className="flex justify-between">
              <span>Journal Entries:</span>
              <span>Last 10 entries</span>
            </div>
            <div className="flex justify-between">
              <span>Behavior Reports:</span>
              <span>Current academic year</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskFactorsCard;
