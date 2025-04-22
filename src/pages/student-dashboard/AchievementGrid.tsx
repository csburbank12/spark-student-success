
import React from "react";
import { AchievementCard } from "@/components/student/AchievementCard";

const achievements = [
  {
    id: "1",
    title: "Consistency Champion",
    description: "Complete 7 consecutive daily check-ins",
    progress: 100,
    icon: "check" as const,
    completed: true,
  },
  {
    id: "2",
    title: "Reflection Master",
    description: "Write journal entries for 5 days",
    progress: 80,
    icon: "star" as const,
    completed: false,
  },
  {
    id: "3",
    title: "Activity Explorer",
    description: "Try 3 different recommended activities",
    progress: 66,
    icon: "award" as const,
    completed: false,
  },
];

const AchievementGrid = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {achievements.map((achievement) => (
      <AchievementCard
        key={achievement.id}
        achievement={achievement}
      />
    ))}
  </div>
);

export default AchievementGrid;
