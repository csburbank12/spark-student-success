
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Sun, Smile, Frown, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const EmotionFilterSection: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>("morning");
  const [selectedMood, setSelectedMood] = useState<string | null>("all");
  
  const timeOptions = [
    { value: "morning", label: "Morning", icon: <Sun className="h-3 w-3" /> },
    { value: "midday", label: "Midday", icon: <Sun className="h-3 w-3" /> },
    { value: "afternoon", label: "Afternoon", icon: <Sun className="h-3 w-3" /> }
  ];
  
  const moodOptions = [
    { value: "all", label: "All Moods", icon: null },
    { value: "positive", label: "Positive", icon: <Smile className="h-3 w-3" /> },
    { value: "negative", label: "Negative", icon: <Frown className="h-3 w-3" /> }
  ];
  
  const getButtonVariant = (currentValue: string, selectedValue: string | null) => {
    return currentValue === selectedValue ? "default" : "outline";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart2 className="mr-2 h-5 w-5" />
          Well-Lens™ Optimal Timing
        </CardTitle>
        <CardDescription>
          Use emotional intelligence to time your interventions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Time of Day</h4>
          <div className="flex flex-wrap gap-2">
            {timeOptions.map(option => (
              <Button 
                key={option.value} 
                size="sm"
                variant={getButtonVariant(option.value, selectedTime)}
                onClick={() => setSelectedTime(option.value)}
                className="flex items-center"
              >
                {option.icon && <span className="mr-1">{option.icon}</span>}
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Mood Filter</h4>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map(option => (
              <Button 
                key={option.value} 
                size="sm"
                variant={getButtonVariant(option.value, selectedMood)}
                onClick={() => setSelectedMood(option.value)}
                className="flex items-center"
              >
                {option.icon && <span className="mr-1">{option.icon}</span>}
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="p-3 border rounded-md bg-amber-50/40 dark:bg-amber-950/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">Optimal Timing Insight</p>
              <p className="text-sm text-muted-foreground">
                For students currently showing negative moods, mornings (8-10am) appear to be the most receptive time for check-ins.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 border rounded-md">
            <p className="text-sm font-medium">Most Alert</p>
            <div className="flex items-center mt-1">
              <Badge className="mr-1" variant="outline">10:00 AM</Badge>
              <span className="text-xs text-muted-foreground">Tuesdays</span>
            </div>
          </div>
          
          <div className="p-3 border rounded-md">
            <p className="text-sm font-medium">Most Receptive</p>
            <div className="flex items-center mt-1">
              <Badge className="mr-1" variant="outline">1:30 PM</Badge>
              <span className="text-xs text-muted-foreground">Thursdays</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
