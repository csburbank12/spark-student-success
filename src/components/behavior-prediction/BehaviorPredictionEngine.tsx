
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the types for our data points
export interface StudentBehaviorData {
  studentId: string;
  studentName: string;
  moodScores: number[];
  attendanceRate: number;
  taskCompletionRate: number;
  engagementScore: number;
  conductIncidents: number;
  lastUpdated: string;
}

export interface BehaviorRiskScore {
  score: number;
  trend: "increasing" | "decreasing" | "stable";
  primaryConcerns: {
    category: "emotional" | "academic" | "social" | "behavioral" | "attendance";
    score: number;
  }[];
  lastCalculated: string;
}

interface BehaviorPredictionEngineProps {
  studentData: StudentBehaviorData;
}

// Weights for different metrics in calculating risk score
const WEIGHTS = {
  mood: 0.25,
  attendance: 0.2,
  taskCompletion: 0.2,
  engagement: 0.2,
  conductIncidents: 0.15,
};

const BehaviorPredictionEngine: React.FC<BehaviorPredictionEngineProps> = ({ 
  studentData 
}) => {
  // Calculate the risk score based on weighted data points
  const calculateRiskScore = (data: StudentBehaviorData): BehaviorRiskScore => {
    // Average mood score (0-10 scale, higher is better)
    const avgMood = data.moodScores.length > 0 
      ? data.moodScores.reduce((sum, score) => sum + score, 0) / data.moodScores.length
      : 5; // Default to neutral if no data
    
    // Convert to risk score (10 - mood because higher mood is lower risk)
    const moodRisk = (10 - avgMood) * 10; // Scale to 0-100
    
    // Attendance (0-100%, higher is better)
    const attendanceRisk = (100 - data.attendanceRate);
    
    // Task completion (0-100%, higher is better)
    const taskRisk = (100 - data.taskCompletionRate);
    
    // Engagement (0-10 scale, higher is better)
    const engagementRisk = (10 - data.engagementScore) * 10; // Scale to 0-100
    
    // Conduct incidents (0+ incidents, higher is worse)
    // Scale to 0-100 with diminishing returns for many incidents
    const conductRisk = Math.min(100, data.conductIncidents * 20);
    
    // Calculate weighted risk score
    const riskScore = (
      moodRisk * WEIGHTS.mood +
      attendanceRisk * WEIGHTS.attendance +
      taskRisk * WEIGHTS.taskCompletion +
      engagementRisk * WEIGHTS.engagement +
      conductRisk * WEIGHTS.conductIncidents
    );
    
    // Determine primary concerns (categories with highest risk)
    const concerns = [
      { category: "emotional" as const, score: moodRisk },
      { category: "attendance" as const, score: attendanceRisk },
      { category: "academic" as const, score: taskRisk },
      { category: "behavioral" as const, score: conductRisk },
      { category: "social" as const, score: engagementRisk },
    ].sort((a, b) => b.score - a.score);
    
    // Determine trend (simplified implementation - would normally compare to historical data)
    const trend: "increasing" | "decreasing" | "stable" = "stable";
    
    return {
      score: Math.min(100, Math.round(riskScore)),
      trend,
      primaryConcerns: concerns.slice(0, 2), // Take top 2 concerns
      lastCalculated: new Date().toLocaleString(),
    };
  };
  
  const riskScore = calculateRiskScore(studentData);
  const riskLevel = riskScore.score >= 75 ? "high" : riskScore.score >= 50 ? "medium" : "low";
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Behavior Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-muted-foreground">Risk Score</span>
            <div className="text-2xl font-bold">{riskScore.score}</div>
          </div>
          <Badge className={
            riskLevel === "high" 
              ? "bg-red-100 text-red-800" 
              : riskLevel === "medium"
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-100 text-blue-800"
          }>
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </Badge>
        </div>
        
        <Progress value={riskScore.score} className="h-2" />
        
        <div className="flex items-center text-sm gap-1">
          <span className="text-muted-foreground">Trend:</span>
          {riskScore.trend === "increasing" ? (
            <div className="flex items-center text-red-500">
              <TrendingUp className="h-4 w-4 mr-1" /> Increasing
            </div>
          ) : riskScore.trend === "decreasing" ? (
            <div className="flex items-center text-green-500">
              <TrendingDown className="h-4 w-4 mr-1" /> Decreasing
            </div>
          ) : (
            <span>Stable</span>
          )}
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Primary Concerns</h4>
          <div className="grid gap-2">
            {riskScore.primaryConcerns.map((concern) => (
              <div 
                key={concern.category}
                className="flex justify-between items-center p-2 rounded-md bg-muted"
              >
                <span className="capitalize">{concern.category}</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{Math.round(concern.score)}</span>
                  <Progress value={concern.score} className="w-20 h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Last updated: {riskScore.lastCalculated}
        </div>
      </CardContent>
    </Card>
  );
};

export default BehaviorPredictionEngine;
