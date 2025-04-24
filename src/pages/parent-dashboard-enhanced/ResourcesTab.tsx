
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResourcesTab: React.FC = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Supporting Your Child's Mental Health",
      type: "Guide",
      icon: BookOpen,
      description: "Learn strategies to support your child's emotional wellbeing at home.",
      link: "/parent-resources?category=mental-health"
    },
    {
      title: "Homework Help Strategies",
      type: "Video",
      icon: Video,
      description: "Watch this 10-minute video on effective ways to help with homework.",
      link: "/parent-resources?category=academics"
    },
    {
      title: "Talking About Difficult Topics",
      type: "Article",
      icon: FileText,
      description: "How to have meaningful conversations about challenging subjects.",
      link: "/parent-resources?category=communication"
    },
    {
      title: "School Resources Bundle",
      type: "Download",
      icon: Download,
      description: "Complete package of school forms, calendars, and contact information.",
      link: "/parent-resources?category=school-info"
    }
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {resources.map((resource, idx) => (
        <Card key={idx}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <resource.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{resource.title}</CardTitle>
                <CardDescription className="text-xs">{resource.type}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{resource.description}</p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate(resource.link)}
            >
              View Resource
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      <Card className="sm:col-span-2">
        <CardHeader>
          <CardTitle>Need More Support?</CardTitle>
          <CardDescription>Connect with our school resources</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="flex-1" 
            onClick={() => navigate("/parent-resources")}
          >
            Browse All Resources
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/messages?recipient=support")}
          >
            Contact Support Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
