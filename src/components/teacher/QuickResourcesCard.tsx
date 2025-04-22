
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Resource {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

interface QuickResourcesCardProps {
  resources: Resource[];
}

export const QuickResourcesCard: React.FC<QuickResourcesCardProps> = ({ resources }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">Quick Resources</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {resources.map((resource) => (
        <div key={resource.id} className="space-y-2 pb-3 border-b last:border-0 last:pb-0">
          <p className="font-medium">{resource.title}</p>
          <p className="text-sm text-muted-foreground">{resource.description}</p>
          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full mt-2">
        Browse Resources
      </Button>
    </CardContent>
  </Card>
);
