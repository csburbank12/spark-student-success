
import React, { useState, useTransition } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import StudentInterventionView from "@/components/teacher/StudentInterventionView";
import { TeacherStatCardsRow } from "@/components/teacher/TeacherStatCardsRow";
import { TeacherStudentsSection } from "@/components/teacher/TeacherStudentsSection";
import { TeacherDashboardTabs } from "@/components/teacher/TeacherDashboardTabs";
import { TeacherDashboardHeader } from "@/components/teacher/TeacherDashboardHeader";
import { Loader } from "@/components/ui/loader";

const students = [
  {
    id: "s1",
    name: "Alex Johnson",
    lastCheckIn: "Today, 8:15 AM",
    mood: "😔 Sad",
    alerts: 2,
    flags: ["Missed check-ins", "Mood decline"],
  },
  {
    id: "s2",
    name: "Zoe Martin",
    lastCheckIn: "Today, 9:20 AM",
    mood: "😐 Okay",
    alerts: 0,
    flags: [],
  },
  {
    id: "s3",
    name: "Ethan Brown",
    lastCheckIn: "Yesterday, 3:45 PM",
    mood: "🙂 Good",
    alerts: 0,
    flags: [],
  },
  {
    id: "s4",
    name: "Lily Chen",
    lastCheckIn: "2 days ago",
    mood: "😣 Stressed",
    alerts: 1,
    flags: ["High stress levels"],
  },
  {
    id: "s5",
    name: "Noah Williams",
    lastCheckIn: "Today, 7:30 AM",
    mood: "😃 Happy",
    alerts: 0,
    flags: [],
  },
  {
    id: "s6",
    name: "Emma Davis",
    lastCheckIn: "3 days ago",
    alerts: 1,
    flags: ["No recent check-in"],
  },
];

const TeacherDashboardEnhanced = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedStudentName, setSelectedStudentName] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentClick = (student: any) => {
    // Use startTransition to wrap the state updates that might cause suspense
    startTransition(() => {
      setSelectedStudent(student.id);
      setSelectedStudentName(student.name);
    });
  };

  const handleBackToDashboard = () => {
    startTransition(() => {
      setSelectedStudent(null);
    });
  };

  const handleScheduleCheckIn = () => {
    // Placeholder for schedule check-in logic
  };

  // Show loading indicator if transition is pending
  if (isPending) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader size="lg" />
      </div>
    );
  }

  // Wrap the conditional rendering in a React Fragment to ensure a single root element
  return (
    <div className="space-y-6">
      {!selectedStudent ? (
        <React.Fragment>
          <TeacherDashboardHeader onScheduleCheckIn={handleScheduleCheckIn} />
          <TeacherStatCardsRow />
          <TeacherStudentsSection
            students={students}
            filteredStudents={filteredStudents}
            onSearch={(e) => setSearchQuery(e.target.value)}
            onStudentClick={handleStudentClick}
          />
          <TeacherDashboardTabs
            students={students}
            onStudentClick={handleStudentClick}
          />
        </React.Fragment>
      ) : (
        <StudentInterventionView
          studentId={selectedStudent}
          studentName={selectedStudentName}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default TeacherDashboardEnhanced;
