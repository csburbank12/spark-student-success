
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { UserRole } from "@/types/roles";

interface SelectViewProps {
  view: "class" | "grade" | "school";
  onViewChange: (view: "class" | "grade" | "school") => void;
  availableGrades: string[];
  availableClasses: string[];
  selectedGrade: string;
  selectedClass: string;
  onGradeChange: (grade: string) => void;
  onClassChange: (class_: string) => void;
  userRole: UserRole;
}

export const SelectView: React.FC<SelectViewProps> = ({
  view,
  onViewChange,
  availableGrades,
  availableClasses,
  selectedGrade,
  selectedClass,
  onGradeChange,
  onClassChange,
  userRole
}) => {
  // Sort the grades and classes
  const sortedGrades = [...availableGrades].sort((a, b) => a.localeCompare(b));
  const sortedClasses = [...availableClasses].sort((a, b) => a.localeCompare(b));
  
  return (
    <div className="flex items-center gap-2">
      <Select value={view} onValueChange={(v) => onViewChange(v as "class" | "grade" | "school")}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="View" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="class">Class View</SelectItem>
          <SelectItem value="grade">Grade View</SelectItem>
          {(userRole === UserRole.admin || userRole === UserRole.counselor) && (
            <SelectItem value="school">School View</SelectItem>
          )}
        </SelectContent>
      </Select>
      
      {view === "class" && (
        <Select value={selectedClass} onValueChange={onClassChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Classes</SelectItem>
            {sortedClasses.map((class_) => (
              <SelectItem key={class_} value={class_}>
                {class_}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      
      {(view === "grade" || view === "class") && (
        <Select value={selectedGrade} onValueChange={onGradeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Grades</SelectItem>
            {sortedGrades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
