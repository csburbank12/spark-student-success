
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LogsPaginationProps {
  currentPage: number;
  currentLimit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const LogsPagination = ({
  currentPage,
  currentLimit,
  totalItems,
  onPageChange,
  className = ''
}: LogsPaginationProps) => {
  // Calculate the range of items being shown
  const startItem = totalItems === 0 ? 0 : currentPage * currentLimit + 1;
  const endItem = Math.min((currentPage + 1) * currentLimit, totalItems);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / currentLimit);
  
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 ${className}`}>
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        {totalItems > 0 ? (
          <>Showing {startItem} to {endItem} of {totalItems} {totalItems === 1 ? 'item' : 'items'}</>
        ) : (
          <>No items to display</>
        )}
      </div>
      
      {totalItems > 0 && (
        <div className="flex gap-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center mx-2 text-sm">
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={(currentPage + 1) * currentLimit >= totalItems}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
