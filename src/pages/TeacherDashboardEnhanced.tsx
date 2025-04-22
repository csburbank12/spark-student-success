
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { StudentInterventionView } from "@/components/teacher/StudentInterventionView";
import { TeacherStatCardsRow } from "@/components/teacher/TeacherStatCardsRow";
import { StudentsSection } from "@/components/teacher/StudentsSection";
import { TeacherDashboardTabs } from "@/components/teacher/TeacherDashboardTabs";

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

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student.id);
    setSelectedStudentName(student.name);
  };

  const handleBackToDashboard = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6">
      {!selectedStudent ? (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-heading font-bold">Teacher Dashboard</h2>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Check-in
            </Button>
          </div>

          <TeacherStatCardsRow />

          <StudentsSection
            students={students}
            filteredStudents={filteredStudents}
            onSearch={(e) => setSearchQuery(e.target.value)}
            onStudentClick={handleStudentClick}
          />

          <TeacherDashboardTabs
            students={students}
            onStudentClick={handleStudentClick}
          />
        </>
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
