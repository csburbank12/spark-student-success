
import React from "react";
import { StudentsGrid } from "./StudentsGrid";
import { StudentSearchSection } from "./StudentSearchSection";

interface StudentsSectionProps {
  students: any[];
  filteredStudents: any[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStudentClick: (student: any) => void;
}

export const StudentsSection: React.FC<StudentsSectionProps> = ({
  students,
  filteredStudents,
  onSearch,
  onStudentClick
}) => (
  <div className="space-y-4">
    <StudentSearchSection onChange={onSearch} />
    <StudentsGrid students={filteredStudents} onStudentClick={onStudentClick} />
  </div>
);
