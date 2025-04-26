
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, FileText } from "lucide-react";

interface ResourceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  iconColor?: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  icon,
  title,
  description,
  actionLabel,
  iconColor = "text-blue-500"
}) => (
  <div className="border rounded-lg p-4 space-y-3">
    <div className="flex items-center">
      <div className={`h-5 w-5 mr-2 ${iconColor}`}>{icon}</div>
      <div className="font-medium">{title}</div>
    </div>
    <div className="text-sm text-muted-foreground">{description}</div>
    <div className="pt-2">
      <Button size="sm" variant="outline">{actionLabel}</Button>
    </div>
  </div>
);

const TeacherResourcesCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Teacher Resources</CardTitle>
        <CardDescription>Tools and resources for classroom management</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResourceItem
            icon={<Target />}
            title="SEL Resources"
            description="Access social-emotional learning curricula"
            actionLabel="Browse Library"
            iconColor="text-blue-500"
          />
          <ResourceItem
            icon={<FileText />}
            title="Lesson Plans"
            description="Find and create lesson plans"
            actionLabel="View Plans"
            iconColor="text-green-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherResourcesCard;
