
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentRiskDashboardProps {
  students: any[];
}

const StudentRiskDashboard: React.FC<StudentRiskDashboardProps> = ({ students }) => {
  // Function to generate risk score for demo purposes
  const generateRiskScore = (index: number) => {
    // We'll use the index to make some students high risk, some medium, some low
    if (index % 10 < 2) {
      return { score: 70 + Math.floor(Math.random() * 30), level: "high" };
    } else if (index % 10 < 5) {
      return { score: 40 + Math.floor(Math.random() * 30), level: "medium" };
    } else {
      return { score: Math.floor(Math.random() * 40), level: "low" };
    }
  };
  
  const getRiskClass = (level: string) => {
    switch(level) {
      case 'high':
        return "border-red-200 bg-red-50";
      case 'medium':
        return "border-amber-200 bg-amber-50";
      default:
        return "";
    }
  };
  
  const getBadgeClass = (level: string) => {
    switch(level) {
      case 'high':
        return "bg-red-100 text-red-800";
      case 'medium':
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student, index) => {
          const risk = generateRiskScore(index);
          return (
            <Card key={student.id} className={getRiskClass(risk.level)}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{student.full_name}</h3>
                    <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                  </div>
                  <Badge className={getBadgeClass(risk.level)}>
                    {risk.level.charAt(0).toUpperCase() + risk.level.slice(1)} Risk
                  </Badge>
                </div>
                
                <div className="mt-4 h-2 bg-gray-100 rounded">
                  <div 
                    className={`h-2 rounded ${
                      risk.level === 'high' ? 'bg-red-500' : 
                      risk.level === 'medium' ? 'bg-amber-500' : 
                      'bg-green-500'
                    }`} 
                    style={{ width: `${risk.score}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                  <span>Risk Score</span>
                  <span>{risk.score}/100</span>
                </div>
                
                {risk.level !== 'low' && (
                  <div className="mt-3 flex justify-between items-center">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Send Alert</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StudentRiskDashboard;
