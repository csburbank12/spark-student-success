
import React from "react";
import { StudentsSection } from "./StudentsSection";

interface TeacherStudentsSectionProps {
  students: any[];
  filteredStudents: any[];
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStudentClick: (student: any) => void;
}

export const TeacherStudentsSection: React.FC<TeacherStudentsSectionProps> = ({
  students,
  filteredStudents,
  onSearch,
  onStudentClick
}) => (
  <StudentsSection
    students={students}
    filteredStudents={filteredStudents}
    onSearch={onSearch}
    onStudentClick={onStudentClick}
  />
);
