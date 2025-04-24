
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useStudentToolkit } from "@/hooks/useStudentToolkit";
import { AddToolkitItemDialog } from "./toolkit/AddToolkitItemDialog";
import { ToolkitItemList } from "./toolkit/ToolkitItemList";
import { EmptyToolkit } from "./toolkit/EmptyToolkit";

// Define a type for toolkit items to ensure type safety
export type ToolkitItem = {
  id: string;
  student_id: string;
  item_type: string;
  item_label: string;
  item_url?: string;
  item_content?: string;
  added_on: string;
};

export function ToolkitTab() {
  const { user } = useAuth();
  const { data: toolkitItems } = useStudentToolkit(user?.id);
  const [open, setOpen] = useState(false);
  
  // Group toolkit items by type
  const itemsByType = toolkitItems?.reduce((acc, item) => {
    const type = item.item_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, ToolkitItem[]>) || {};
  
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
