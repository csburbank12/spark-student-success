
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, ThumbsUp, Heart, Calendar, Award, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const ChildActivity = () => {
  const [expandedActivities, setExpandedActivities] = useState<number[]>([]);
  
  // In a real app, this data would be fetched from an API
  const activities = [
    {
      id: 1,
      title: "Completed Breathing Exercise",
      date: "Today, 9:15 AM",
      category: "Wellness",
      details: "5-minute guided breathing session",
      description: "Alex completed a 5-minute guided breathing exercise focused on calm and focus. The session included deep breathing and visualization techniques.",
      stats: {
        duration: "5 minutes",
        completion: "100%",
        mood_before: "Anxious",
        mood_after: "Calm"
      }
    },
    {
      id: 2,
      title: "Journal Entry",
      date: "Yesterday, 3:30 PM",
      category: "Reflection",
      details: "Wrote about school project achievements",
      description: "Alex wrote a reflective journal entry about recent achievements in the school science project. The entry expressed pride in teamwork and creative problem-solving.",
      stats: {
        words: "245",
        topics: ["Teamwork", "Science", "Achievement"],
        sentiment: "Positive"
      }
    },
    {
      id: 3,
      title: "Goal Progress Update",
      date: "Apr 20, 2:45 PM",
      category: "Future Me",
      details: "Updated steps toward becoming a veterinarian",
      description: "Alex updated progress on long-term career goal of becoming a veterinarian. Added two new action items: volunteering at local animal shelter and researching veterinary programs.",
      stats: {
        completion: "35%",
        milestones_completed: "3 of 8",
        recent_actions: ["Research", "Volunteer application"]
      }
    },
    {
      id: 4,
      title: "Earned 'Consistency' Badge",
      date: "Apr 19, 10:00 AM",
      category: "Achievement",
      details: "Completed 7 consecutive daily check-ins",
      description: "Alex earned the 'Consistency Champion' badge for completing 7 consecutive daily wellness check-ins, showing commitment to emotional awareness and self-monitoring.",
      stats: {
        streak: "7 days",
        total_badges: "12",
        next_badge: "Mindfulness Master (3 days away)"
      }
    },
    {
      id: 5,
      title: "Mindfulness Activity",
      date: "Apr 18, 2:15 PM",
      category: "Wellness",
      details: "Completed 'Peaceful Place' visualization exercise",
      description: "Alex participated in a guided visualization activity called 'Peaceful Place', learning to create a mental safe space for times of stress or anxiety.",
      stats: {
        duration: "8 minutes",
        completion: "100%",
        reported_effectiveness: "4/5"
      }
    }
  ];

  const assignments = [
    {
      id: 101,
      title: "Math Homework - Algebra Basics",
      due_date: "Tomorrow, 8:00 AM",
      status: "Not Started",
      subject: "Mathematics",
      priority: "High"
    },
    {
      id: 102,
      title: "Book Report - 'The Giver'",
      due_date: "Apr 25, 3:00 PM",
      status: "In Progress",
      subject: "English",
      priority: "Medium"
    },
    {
      id: 103,
      title: "Science Lab Report",
      due_date: "Apr 28, 11:59 PM",
      status: "In Progress",
      subject: "Science",
      priority: "Medium"
    }
  ];

  const events = [
    {
      id: 201,
      title: "Parent-Teacher Conference",
      date: "Apr 27, 4:30 PM",
      location: "Room 103",
      type: "Meeting"
    },
    {
      id: 202,
      title: "School Science Fair",
      date: "May 15, 1:00 PM",
      location: "School Gymnasium",
      type: "School Event"
    },
    {
      id: 203,
      title: "Field Trip Permission Due",
      date: "Apr 30",
      type: "Deadline"
    }
  ];

  const toggleActivity = (id: number) => {
    if (expandedActivities.includes(id)) {
      setExpandedActivities(expandedActivities.filter(activityId => activityId !== id));
    } else {
      setExpandedActivities([...expandedActivities, id]);
    }
  };

  const handleEncourage = () => {
    toast.success("Encouragement sent to your child!");
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Child Activity</h2>
      </div>

      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="mt-4">
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
        </TabsContent>
        
        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map(assignment => (
                  <div key={assignment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <Badge 
                        variant={
                          assignment.priority === "High" ? "destructive" : 
                          assignment.priority === "Medium" ? "default" : 
                          "outline"
                        }
                      >
                        {assignment.priority}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">Subject: {assignment.subject}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Due: {assignment.due_date}
                      </div>
                      <Badge variant={
                        assignment.status === "Not Started" ? "outline" : 
                        assignment.status === "In Progress" ? "secondary" : 
                        "warning"
                      }>
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Clock className="h-3 w-3" />
                      {event.date}
                    </div>
                    {event.location && (
                      <p className="text-sm mt-1">Location: {event.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildActivity;
