
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";

interface EmptyToolkitProps {
  onAddClick: () => void;
}

export function EmptyToolkit({ onAddClick }: EmptyToolkitProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center py-12">
        <HeartHandshake className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Your toolkit is empty</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Add videos, music, articles, and strategies that help you feel better
        </p>
        <Button onClick={onAddClick}>Add Your First Tool</Button>
      </CardContent>
    </Card>
  );
}
