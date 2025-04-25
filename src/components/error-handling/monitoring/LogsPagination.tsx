
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LogsPaginationProps {
  currentPage: number;
  currentLimit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const LogsPagination = ({
  currentPage,
  currentLimit,
  totalItems,
  onPageChange
}: LogsPaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {currentPage * currentLimit + 1} to {Math.min((currentPage + 1) * currentLimit, totalItems)} of {totalItems} errors
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={(currentPage + 1) * currentLimit >= totalItems}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
