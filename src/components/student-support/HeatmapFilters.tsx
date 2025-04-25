
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Check, Filter } from "lucide-react";

interface HeatmapFiltersProps {
  selectedRiskLevel: string;
  onRiskLevelChange: (level: string) => void;
}

export const HeatmapFilters: React.FC<HeatmapFiltersProps> = ({
  selectedRiskLevel,
  onRiskLevelChange
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        variant={selectedRiskLevel === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onRiskLevelChange("all")}
      >
        All Students
      </Button>
      
      <Button 
        variant={selectedRiskLevel === "at_risk" ? "default" : "outline"}
        size="sm"
        onClick={() => onRiskLevelChange("at_risk")}
        className="flex items-center gap-1"
      >
        <div className="h-2 w-2 rounded-full bg-red-500"></div>
        At Risk
      </Button>
      
      <Button 
        variant={selectedRiskLevel === "concerning" ? "default" : "outline"}
        size="sm"
        onClick={() => onRiskLevelChange("concerning")}
        className="flex items-center gap-1"
      >
        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
        Concerning
      </Button>
      
      <Button 
        variant={selectedRiskLevel === "stable" ? "default" : "outline"}
        size="sm"
        onClick={() => onRiskLevelChange("stable")}
        className="flex items-center gap-1"
      >
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        Stable
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>Sort by Name</DropdownMenuItem>
          <DropdownMenuItem>Sort by Risk Level (High to Low)</DropdownMenuItem>
          <DropdownMenuItem>Sort by Risk Level (Low to High)</DropdownMenuItem>
          <DropdownMenuItem>Show Only Incomplete Interventions</DropdownMenuItem>
          <DropdownMenuItem>Show Only Recent Changes (7d)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
