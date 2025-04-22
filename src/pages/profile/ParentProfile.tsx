
import React from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, MessageSquare, Heart } from "lucide-react";

interface ParentProfileProps {
  user: User | null;
}

const ParentProfile: React.FC<ParentProfileProps> = ({ user }) => {
  // Mock data for parent profile
  const parentData = {
    children: [
      { 
        id: "c1", 
        name: "Alex Johnson", 
        grade: "10th Grade", 
        school: "Washington High School",
        recentMood: "Good",
        checkIns: 14,
        alerts: 0
      },
      { 
        id: "c2", 
        name: "Jordan Johnson", 
        grade: "7th Grade", 
        school: "Lincoln Middle School",
        recentMood: "Okay",
        checkIns: 10,
        alerts: 1
      },
    ],
    upcomingEvents: [
      { title: "Parent-Teacher Conference", date: "May 5, 2023", child: "Alex" },
      { title: "School Field Trip", date: "May 12, 2023", child: "Jordan" },
      { title: "End of Term Report", date: "June 15, 2023", child: "Both" },
    ],
    unreadMessages: 2,
    recentActivities: [
      { 
        activity: "Viewed mood check-ins", 
        child: "Alex Johnson", 
        date: "Yesterday",
      },
      { 
        activity: "Messaged Ms. Rodriguez", 
        child: "Alex Johnson", 
        date: "2 days ago",
      },
      { 
        activity: "Reviewed academic progress", 
        child: "Jordan Johnson", 
        date: "3 days ago",
      },
    ],
    resourcesAccessed: [
      { name: "Supporting Teen Mental Health", date: "Last week" },
      { name: "Academic Success Strategies", date: "2 weeks ago" },
      { name: "Digital Wellness for Families", date: "3 weeks ago" },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Children</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {parentData.children.map((child) => (
              <div 
                key={child.id}
                className="p-3 rounded-lg border space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {child.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{child.name}</h4>
                      <p className="text-xs text-muted-foreground">{child.grade} • {child.school}</p>
                    </div>
                  </div>
                  {child.alerts > 0 && (
                    <Badge className="bg-amber-100 text-amber-800">{child.alerts} Alert</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 rounded bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">Recent Mood</p>
                    <p className="font-medium">{child.recentMood}</p>
                  </div>
                  <div className="p-2 rounded bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">Check-ins</p>
                    <p className="font-medium">{child.checkIns} Days</p>
                  </div>
                </div>
                
                <div className="pt-2 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">View Activity</Button>
                  <Button size="sm" className="flex-1">Wellness Dashboard</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-auto flex flex-col items-center justify-center py-6 gap-2">
                <Heart className="h-6 w-6" />
                <span>Wellness Dashboard</span>
              </Button>
              <Button className="h-auto flex flex-col items-center justify-center py-6 gap-2" variant="outline">
                <Users className="h-6 w-6" />
                <span>Academic Progress</span>
              </Button>
              <Button className="h-auto flex flex-col items-center justify-center py-6 gap-2" variant="outline">
                <MessageSquare className="h-6 w-6" />
                <span>Messages ({parentData.unreadMessages})</span>
              </Button>
              <Button className="h-auto flex flex-col items-center justify-center py-6 gap-2" variant="outline">
                <Calendar className="h-6 w-6" />
                <span>Calendar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {parentData.upcomingEvents.map((event, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{event.child}</Badge>
                    <span className="text-xs text-muted-foreground">{event.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-4">
              {parentData.recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <span>{activity.activity}</span>
                  <div className="text-xs text-muted-foreground">
                    {activity.child} • {activity.date}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Resources Accessed</h4>
              <ul className="space-y-1">
                {parentData.resourcesAccessed.map((resource, index) => (
                  <li key={index} className="text-sm pl-2 border-l-2 border-primary">
                    <span className="font-medium">{resource.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{resource.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentProfile;
