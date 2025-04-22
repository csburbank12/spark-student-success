
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, CheckCircle } from "lucide-react";

interface StudentFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (val: string) => void;
}

const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search students..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <div className="flex items-center space-x-2">
      <Button
        variant={selectedFilter === "all" ? "default" : "outline"}
        onClick={() => setSelectedFilter("all")}
        size="sm"
      >
        All
      </Button>
      <Button
        variant={selectedFilter === "high" ? "default" : "outline"}
        onClick={() => setSelectedFilter("high")}
        size="sm"
        className="flex items-center gap-1"
      >
        <AlertCircle className="h-4 w-4 text-red-500" /> High Risk
      </Button>
      <Button
        variant={selectedFilter === "medium" ? "default" : "outline"}
        onClick={() => setSelectedFilter("medium")}
        size="sm"
        className="flex items-center gap-1"
      >
        <AlertCircle className="h-4 w-4 text-amber-500" /> Medium Risk
      </Button>
      <Button
        variant={selectedFilter === "low" ? "default" : "outline"}
        onClick={() => setSelectedFilter("low")}
        size="sm"
        className="flex items-center gap-1"
      >
        <CheckCircle className="h-4 w-4 text-green-500" /> Low Risk
      </Button>
    </div>
  </div>
);

export default StudentFilters;
