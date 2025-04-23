
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SELEmptyState = () => {
  const navigate = useNavigate();
  
  const handleViewAllClick = () => {
    navigate("/sel-pathways");
  };

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <h3 className="font-medium">No SEL Recommendations</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Check back after completing more check-ins for personalized recommendations.
        </p>
        <Button variant="outline" className="mt-4" onClick={handleViewAllClick}>
          Explore SEL Pathways
        </Button>
      </CardContent>
    </Card>
  );
};
