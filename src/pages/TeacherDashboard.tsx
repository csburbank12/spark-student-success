import React, { useState } from "react";
import { TeacherStatsGrid } from "@/components/teacher/TeacherStatsGrid";
import { StudentSearchSection } from "@/components/teacher/StudentSearchSection";
import { StudentsGrid } from "@/components/teacher/StudentsGrid";
import { UpcomingScheduleCard } from "@/components/teacher/UpcomingScheduleCard";
import { QuickResourcesCard } from "@/components/teacher/QuickResourcesCard";

const studentsData = [
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

const upcomingEvents = [
  {
    id: "e1",
    title: "SEL Class Session",
    date: "Today, 11:30 AM",
    type: "class",
  },
  {
    id: "e2",
    title: "Check-in with Alex",
    date: "Today, 2:15 PM",
    type: "meeting",
  },
  {
    id: "e3",
    title: "Team Collaboration",
    date: "Tomorrow, 9:00 AM",
    type: "meeting",
  },
];

const resources = [
  {
    id: "r1",
    title: "Mindfulness Activities",
    description: "Collection of 5-minute exercises",
    tags: ["SEL", "Classroom"],
  },
  {
    id: "r2",
    title: "Anxiety Coping Strategies",
    description: "Resources for helping students manage stress",
    tags: ["Mental Health", "Support"],
  },
  {
    id: "r3",
    title: "Mood Check-in Templates",
    description: "Printable worksheets for classroom use",
    tags: ["Resources", "Activities"],
  },
];

const TeacherDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const students = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentClick = (student: any) => {
    // In a real app, this would navigate to student details or open a modal
  };

  return (
    <div className="space-y-6">
      <TeacherStatsGrid />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <StudentSearchSection onChange={(e) => setSearchQuery(e.target.value)} />
          <StudentsGrid students={students} onStudentClick={handleStudentClick} />
        </div>
        <div className="space-y-4">
          <UpcomingScheduleCard events={upcomingEvents} />
          <QuickResourcesCard resources={resources} />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
