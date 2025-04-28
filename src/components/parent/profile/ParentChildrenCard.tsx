
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, User, Sparkles, Activity, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const childrenData = [
  { 
    name: "Jada Thompson", 
    grade: "10th Grade", 
    school: "Lincoln High School",
    lastCheckIn: "Today, 8:15 AM",
    moodStatus: "Good",
    alerts: 0, 
    selProgress: 78,
  },
  { 
    name: "Marcus Thompson", 
    grade: "8th Grade", 
    school: "Washington Middle School",
    lastCheckIn: "Yesterday, 9:30 AM",
    moodStatus: "Stressed",
    alerts: 1, 
    selProgress: 65,
  }
];

const ParentChildrenCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          My Children
        </CardTitle>
        <Button variant="outline" size="sm">Add Child</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {childrenData.map((child, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-md border ${child.alerts > 0 ? 'border-amber-200 bg-amber-50' : 'bg-card'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">{child.grade} • {child.school}</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <div className="text-sm">
                    <p className="font-medium">Last check-in</p>
                    <p className="text-muted-foreground">{child.lastCheckIn}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                  <div className="h-4 w-4 flex items-center justify-center text-amber-600">
                    {child.moodStatus === "Good" ? "🙂" : "😣"}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Current mood</p>
                    <p className="text-muted-foreground">{child.moodStatus}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                  <Sparkles className="h-4 w-4 text-violet-600" />
                  <div className="text-sm">
                    <p className="font-medium">SEL Progress</p>
                    <p className="text-muted-foreground">{child.selProgress}% Complete</p>
                  </div>
                </div>
              </div>
              
              {child.alerts > 0 && (
                <div className="mt-4 p-2 bg-amber-100 text-amber-800 rounded-md text-sm flex items-center">
                  <Badge variant="outline" className="bg-amber-50 border-amber-300 text-amber-800 mr-2">
                    Alert
                  </Badge>
                  Teacher has flagged potential stress issues. Schedule a meeting.
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentChildrenCard;
