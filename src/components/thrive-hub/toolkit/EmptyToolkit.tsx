
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface EmptyToolkitProps {
  onAddClick: () => void;
}

export function EmptyToolkit({ onAddClick }: EmptyToolkitProps) {
  return (
    <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4 border-muted">
      <div className="bg-primary/10 p-3 rounded-full">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Your toolkit is empty</h3>
        <p className="text-muted-foreground">
          Add helpful resources, strategies, and activities to your personal wellness toolkit.
        </p>
      </div>
      <Button onClick={onAddClick} className="mt-2">
        <Plus className="mr-2 h-4 w-4" />
        Add Your First Item
      </Button>
    </div>
  );
}
