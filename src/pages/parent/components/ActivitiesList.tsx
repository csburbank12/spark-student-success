
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ThumbsUp, Heart, Award, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Activity {
  id: number;
  title: string;
  date: string;
  category: string;
  details: string;
  description: string;
  stats: Record<string, string | string[]>;
}

interface ActivitiesListProps {
  activities: Activity[];
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Wellness":
      return <Heart className="h-4 w-4 text-pink-500" />;
    case "Reflection":
      return <CheckCircle className="h-4 w-4 text-blue-500" />;
    case "Future Me":
      return <Award className="h-4 w-4 text-amber-500" />;
    case "Achievement":
      return <Award className="h-4 w-4 text-primary" />;
    default:
      return <CheckCircle className="h-4 w-4" />;
  }
};

export const ActivitiesList: React.FC<ActivitiesListProps> = ({ activities }) => {
  const [expandedActivities, setExpandedActivities] = useState<number[]>([]);

  const toggleActivity = (id: number) => {
    setExpandedActivities((prev) =>
      prev.includes(id) ? prev.filter(activityId => activityId !== id) : [...prev, id]
    );
  };

  const handleEncourage = () => {
    toast.success("Encouragement sent to your child!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="border rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => toggleActivity(activity.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(activity.category)}
                    <h3 className="font-medium">{activity.title}</h3>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getCategoryIcon(activity.category)}
                    {activity.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.date}</p>
                <p className="text-sm">{activity.details}</p>
                <div className="flex justify-end mt-2">
                  {expandedActivities.includes(activity.id) ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              {expandedActivities.includes(activity.id) && (
                <div className="px-4 pb-4 pt-2 bg-muted/10 border-t">
                  <p className="mb-4">{activity.description}</p>
                  <h4 className="font-medium text-sm mb-2">Activity Details:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(activity.stats).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-2">
                        <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-muted-foreground">
                          {Array.isArray(value) ? value.join(", ") : value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" onClick={handleEncourage} className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      Send Encouragement
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <Button variant="outline">View More Activities</Button>
      </CardFooter>
    </Card>
  );
};

export default ActivitiesList;
