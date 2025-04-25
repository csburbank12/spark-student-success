
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SelectView } from "./SelectView";
import { UserRole } from "@/types/roles";

interface HeatmapSearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedView: "class" | "grade" | "school";
  setSelectedView: (view: "class" | "grade" | "school") => void;
  availableGrades: string[];
  availableClasses: string[];
  selectedGrade: string;
  selectedClass: string;
  setSelectedGrade: (grade: string) => void;
  setSelectedClass: (class_: string) => void;
  userRole: UserRole;
}

export const HeatmapSearchAndFilter: React.FC<HeatmapSearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedView,
  setSelectedView,
  availableGrades,
  availableClasses,
  selectedGrade,
  selectedClass,
  setSelectedGrade,
  setSelectedClass,
  userRole,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <SelectView 
          view={selectedView}
          onViewChange={setSelectedView}
          availableGrades={availableGrades}
          availableClasses={availableClasses}
          selectedGrade={selectedGrade}
          selectedClass={selectedClass}
          onGradeChange={setSelectedGrade}
          onClassChange={setSelectedClass}
          userRole={userRole}
        />
      </div>
    </div>
  );
};
