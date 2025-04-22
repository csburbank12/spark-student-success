
import React from "react";
import { StudentCard } from "@/components/teacher/StudentCard";
import { Button } from "@/components/ui/button";

interface StudentsGridProps {
  students: any[];
  onStudentClick: (student: any) => void;
}

export const StudentsGrid: React.FC<StudentsGridProps> = ({ students, onStudentClick }) => (
  <>
    <div className="grid gap-4 sm:grid-cols-2">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onClick={() => onStudentClick(student)}
        />
      ))}
    </div>
    <div className="flex justify-center">
      <Button variant="outline">View All Students</Button>
    </div>
  </>
);
