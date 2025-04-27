
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Link as LinkIcon, Bookmark } from "lucide-react";

interface ResourceProps {
  title: string;
  description: string;
  type: string;
  icon: React.ReactNode;
  link: string;
}

const Resource: React.FC<ResourceProps> = ({ title, description, type, icon, link }) => (
  <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
    <div className="mt-1 h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <h4 className="font-medium">{title}</h4>
        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{type}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
    <Button variant="ghost" size="sm" className="ml-2">
      <LinkIcon className="h-4 w-4" />
      <span className="sr-only">Open</span>
    </Button>
  </div>
);

const TeacherResourcesCard: React.FC = () => {
  const resources = [
    {
      title: "SEL Implementation Guide",
      description: "Best practices for integrating SEL into your classroom",
      type: "Document",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      link: "#"
    },
    {
      title: "Crisis Response Protocol",
      description: "Steps to follow when students are in distress",
      type: "PDF",
      icon: <Download className="h-5 w-5 text-red-600" />,
      link: "#"
    },
    {
      title: "Student Support Resources",
      description: "Directory of mental health and academic support services",
      type: "Link",
      icon: <LinkIcon className="h-5 w-5 text-green-600" />,
      link: "#"
    },
    {
      title: "SEL Activity Library",
      description: "Collection of classroom-ready SEL activities and lessons",
      type: "Collection",
      icon: <Bookmark className="h-5 w-5 text-purple-600" />,
      link: "#"
    }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Teaching Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {resources.map((resource, index) => (
          <Resource
            key={index}
            title={resource.title}
            description={resource.description}
            type={resource.type}
            icon={resource.icon}
            link={resource.link}
          />
        ))}
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">View All Resources</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherResourcesCard;
