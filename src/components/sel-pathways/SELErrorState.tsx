
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export const SELErrorState = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 text-center">
        <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <h3 className="font-medium">Unable to Load Recommendations</h3>
        <p className="text-sm text-muted-foreground mt-1">
          There was a problem loading your SEL recommendations. Please try again later.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};
