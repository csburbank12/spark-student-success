
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SELLoadingState = () => {
  return (
    <div className="space-y-4" data-testid="sel-loading">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-64" role="progressbar" />
        <Skeleton className="h-9 w-24" role="progressbar" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-[220px] w-full" role="progressbar" />
        <Skeleton className="h-[220px] w-full" role="progressbar" />
        <Skeleton className="h-[220px] w-full" role="progressbar" />
      </div>
    </div>
  );
};
