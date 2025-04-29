import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivitiesList from "./components/ActivitiesList";
import AssignmentsList from "./components/AssignmentsList";
import EventsList from "./components/EventsList";
import { Assignment } from "@/types/assignment";

const activities = [
  {
    id: 1,
    title: "Completed Breathing Exercise",
    date: "Today, 9:15 AM",
    category: "Wellness",
    details: "5-minute guided breathing session",
    description: "Alex completed a 5-minute guided breathing exercise focused on calm and focus. The session included deep breathing and visualization techniques.",
    stats: {
      duration: "5 minutes",
      completion: "100%",
      mood_before: "Anxious",
      mood_after: "Calm"
    }
  },
  {
    id: 2,
    title: "Journal Entry",
    date: "Yesterday, 3:30 PM",
    category: "Reflection",
    details: "Wrote about school project achievements",
    description: "Alex wrote a reflective journal entry about recent achievements in the school science project. The entry expressed pride in teamwork and creative problem-solving.",
    stats: {
      words: "245",
      topics: ["Teamwork", "Science", "Achievement"],
      sentiment: "Positive"
    }
  },
  {
    id: 3,
    title: "Goal Progress Update",
    date: "Apr 20, 2:45 PM",
    category: "Future Me",
    details: "Updated steps toward becoming a veterinarian",
    description: "Alex updated progress on long-term career goal of becoming a veterinarian. Added two new action items: volunteering at local animal shelter and researching veterinary programs.",
    stats: {
      completion: "35%",
      milestones_completed: "3 of 8",
      recent_actions: ["Research", "Volunteer application"]
    }
  },
  {
    id: 4,
    title: "Earned 'Consistency' Badge",
    date: "Apr 19, 10:00 AM",
    category: "Achievement",
    details: "Completed 7 consecutive daily check-ins",
    description: "Alex earned the 'Consistency Champion' badge for completing 7 consecutive daily wellness check-ins, showing commitment to emotional awareness and self-monitoring.",
    stats: {
      streak: "7 days",
      total_badges: "12",
      next_badge: "Mindfulness Master (3 days away)"
    }
  },
  {
    id: 5,
    title: "Mindfulness Activity",
    date: "Apr 18, 2:15 PM",
    category: "Wellness",
    details: "Completed 'Peaceful Place' visualization exercise",
    description: "Alex participated in a guided visualization activity called 'Peaceful Place', learning to create a mental safe space for times of stress or anxiety.",
    stats: {
      duration: "8 minutes",
      completion: "100%",
      reported_effectiveness: "4/5"
    }
  }
];

// Convert numeric IDs to strings for compatibility
const assignments: Assignment[] = [
  {
    id: "101",
    title: "Math Homework - Algebra Basics",
    dueDate: "Tomorrow, 8:00 AM",
    due_date: "Tomorrow, 8:00 AM",
    status: "Not Started",
    subject: "Mathematics",
    priority: "High",
    type: "Homework"
  },
  {
    id: "102",
    title: "Book Report - 'The Giver'",
    dueDate: "Apr 25, 3:00 PM",
    due_date: "Apr 25, 3:00 PM",
    status: "In Progress",
    subject: "English",
    priority: "Medium",
    type: "Project"
  },
  {
    id: "103",
    title: "Science Lab Report",
    dueDate: "Apr 28, 11:59 PM",
    due_date: "Apr 28, 11:59 PM",
    status: "In Progress",
    subject: "Science",
    priority: "Medium",
    type: "Report"
  }
];

const events = [
  {
    id: 201,
    title: "Parent-Teacher Conference",
    date: "Apr 27, 4:30 PM",
    location: "Room 103",
    type: "Meeting"
  },
  {
    id: 202,
    title: "School Science Fair",
    date: "May 15, 1:00 PM",
    location: "School Gymnasium",
    type: "School Event"
  },
  {
    id: 203,
    title: "Field Trip Permission Due",
    date: "Apr 30",
    type: "Deadline"
  }
];

const ChildActivity = () => {
  // Convert the assignment data to match the expected Assignment type
  const typedAssignments: Assignment[] = assignments.map(assignment => ({
    ...assignment,
    id: String(assignment.id), // Convert number id to string
    dueDate: assignment.due_date,
    type: assignment.subject // Use subject as type if no type field exists
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Child Activity</h2>
      </div>
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>
        <TabsContent value="activities" className="mt-4">
          <ActivitiesList activities={activities} />
        </TabsContent>
        <TabsContent value="assignments" className="mt-4">
          <AssignmentsList assignments={typedAssignments} />
        </TabsContent>
        <TabsContent value="events" className="mt-4">
          <EventsList events={events} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildActivity;
