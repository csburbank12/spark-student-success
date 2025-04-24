
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useStudentToolkit, groupToolkitItemsByType } from "@/hooks/useStudentToolkit";
import { AddToolkitItemDialog } from "./toolkit/AddToolkitItemDialog";
import { ToolkitItemList } from "./toolkit/ToolkitItemList";
import { EmptyToolkit } from "./toolkit/EmptyToolkit";
import { Loader } from "@/components/ui/loader";
import { AlertTriangle } from "lucide-react";

export function ToolkitTab() {
  const { user } = useAuth();
  const { 
    data: toolkitItems, 
    isLoading, 
    isError,
    refetch 
  } = useStudentToolkit(user?.id);
  
  const [open, setOpen] = useState(false);
  
  // Show proper loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="h-8 w-8 text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Loading your toolkit...</span>
      </div>
    );
  }
  
  // Show proper error state with retry option
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-destructive">
        <AlertTriangle className="h-8 w-8 mb-2" />
        <p className="mb-4">Failed to load toolkit items</p>
        <button 
          onClick={() => refetch()} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  // Group toolkit items by type
  const itemsByType = groupToolkitItemsByType(toolkitItems);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Wellness Toolkit</h2>
        <AddToolkitItemDialog open={open} setOpen={setOpen} />
      </div>
      
      {Object.keys(itemsByType).length > 0 ? (
        <ToolkitItemList itemsByType={itemsByType} />
      ) : (
        <EmptyToolkit onAddClick={() => setOpen(true)} />
      )}
    </div>
  );
}
