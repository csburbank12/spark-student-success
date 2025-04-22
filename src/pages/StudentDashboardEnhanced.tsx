
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MoodTracker } from "@/components/student/MoodTracker";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Award, Calendar, CheckCircle2, Target, TrendingUp, BookOpen, Heart, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";

// Define types for goals
interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  progress: number;
  category: "academic" | "social" | "emotional" | "other";
}

// Define types for achievements
interface Achievement {
  id: string;
  title: string;
  description: string;
  dateEarned: string;
  icon: string;
}

// Define types for tasks
interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  category: "academic" | "wellness" | "social" | "other";
}

const StudentDashboardEnhanced = () => {
  const { user } = useAuth();
  const [selectedMoodReflection, setSelectedMoodReflection] = useState<string>("");
  
  // Mock data for student dashboard
  const studentData = {
    name: user?.name || "Student",
    grade: "10",
    recentMood: "Good",
    attendanceRate: 95,
    taskCompletionRate: 85,
    behaviorScore: 78,
    goals: [
      {
        id: "g1",
        title: "Complete math project",
        description: "Finish the statistical analysis project",
        dueDate: "Apr 28, 2025",
        progress: 65,
        category: "academic"
      },
      {
        id: "g2",
        title: "Daily mindfulness practice",
        description: "Complete 5 minutes of mindfulness each day",
        dueDate: "Ongoing",
        progress: 80,
        category: "emotional"
      },
      {
        id: "g3",
        title: "Join study group",
        description: "Connect with peers for science study sessions",
        dueDate: "May 5, 2025",
        progress: 40,
        category: "social"
      }
    ] as Goal[],
    achievements: [
      {
        id: "a1",
        title: "5-Day Check-in Streak",
        description: "Completed mood check-ins for 5 consecutive days",
        dateEarned: "Apr 20, 2025",
        icon: "🏆"
      },
      {
        id: "a2",
        title: "Assignment Master",
        description: "Submitted all assignments on time for a month",
        dateEarned: "Apr 15, 2025",
        icon: "📚"
      },
      {
        id: "a3",
        title: "Goal Setter",
        description: "Created and tracked 3 personal goals",
        dateEarned: "Apr 10, 2025",
        icon: "🎯"
      }
    ] as Achievement[],
    tasks: [
      {
        id: "t1",
        title: "Complete math homework",
        dueDate: "Today",
        completed: true,
        category: "academic"
      },
      {
        id: "t2",
        title: "Read chapter 5 for English",
        dueDate: "Tomorrow",
        completed: false,
        category: "academic"
      },
      {
        id: "t3",
        title: "Mood check-in",
        dueDate: "Today",
        completed: false,
        category: "wellness"
      },
      {
        id: "t4",
        title: "Group project meeting",
        dueDate: "Apr 25, 2025",
        completed: false,
        category: "social"
      }
    ] as Task[],
    lessons: [
      {
        id: "l1",
        title: "Managing Test Anxiety",
        type: "Wellness",
        duration: "15 min",
        completed: false
      },
      {
        id: "l2",
        title: "Effective Study Techniques",
        type: "Academic",
        duration: "20 min",
        completed: true
      },
      {
        id: "l3",
        title: "Building Healthy Friendships",
        type: "Social",
        duration: "15 min",
        completed: false
      }
    ],
    moodReflections: [
      "What went well today?",
      "What was challenging about today?",
      "Is there something you're looking forward to tomorrow?",
      "Did anything surprise you today?",
      "What's one thing you're grateful for today?"
    ]
  };

  const [tasks, setTasks] = useState<Task[]>(studentData.tasks);

  const completedTaskCount = tasks.filter(task => task.completed).length;
  const taskCompletionPercentage = Math.round((completedTaskCount / tasks.length) * 100);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast.success(`Task ${task.completed ? 'marked as incomplete' : 'completed'}: ${task.title}`);
    }
  };

  const handleMoodReflectionClick = (reflection: string) => {
    setSelectedMoodReflection(reflection);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic": return "bg-blue-100 text-blue-800";
      case "social": return "bg-green-100 text-green-800";
      case "emotional": return "bg-purple-100 text-purple-800";
      case "wellness": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Today's Mood</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{studentData.recentMood}</p>
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-xl">😊</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-2xl font-bold">{studentData.attendanceRate}%</p>
              </div>
              <Calendar className="h-12 w-12 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Task Completion</p>
                <p className="text-2xl font-bold">{taskCompletionPercentage}%</p>
              </div>
              <CheckCircle2 className="h-12 w-12 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Well-being Score</p>
                <p className="text-2xl font-bold">{studentData.behaviorScore}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MoodTracker />
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Reflection</CardTitle>
            <CardDescription>Take a moment to reflect on your day</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMoodReflection ? (
              <div className="space-y-3">
                <p className="font-medium">{selectedMoodReflection}</p>
                <textarea
                  className="w-full h-24 p-3 border rounded-md"
                  placeholder="Write your thoughts here..."
                />
                <Button>Save Reflection</Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Choose a reflection prompt:</p>
                <div className="grid gap-2">
                  {studentData.moodReflections.map((reflection, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleMoodReflectionClick(reflection)}
                    >
                      {reflection}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>My Tasks</span>
                <Badge variant="outline">{completedTaskCount}/{tasks.length} Completed</Badge>
              </CardTitle>
              <CardDescription>Keep track of your daily tasks and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 border rounded-md ${
                      task.completed ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <div>
                        <p className={task.completed ? "line-through text-muted-foreground" : ""}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getCategoryColor(task.category)}>
                            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Due: {task.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add New Task
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>My Goals</CardTitle>
              <CardDescription>Track your progress toward personal goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {studentData.goals.map((goal) => (
                  <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      </div>
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Due: {goal.dueDate}</span>
                      <Button size="sm" variant="outline">Update</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Set New Goal</Button>
              <Button variant="outline">View All Goals</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>My Achievements</CardTitle>
              <CardDescription>Celebrate your progress and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {studentData.achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border rounded-lg text-center">
                    <div className="flex justify-center mb-2">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-3xl">{achievement.icon}</span>
                      </div>
                    </div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-3">Earned on {achievement.dateEarned}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Achievements
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Explore lessons and activities to support your growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {studentData.lessons.map((lesson) => (
                  <div key={lesson.id} className="border rounded-lg overflow-hidden">
                    <div className="h-32 bg-muted flex items-center justify-center">
                      {lesson.type === "Wellness" && <Heart className="h-12 w-12 text-primary/30" />}
                      {lesson.type === "Academic" && <BookOpen className="h-12 w-12 text-primary/30" />}
                      {lesson.type === "Social" && <Users className="h-12 w-12 text-primary/30" />}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{lesson.title}</h3>
                        {lesson.completed && (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{lesson.type}</Badge>
                        <span>{lesson.duration}</span>
                      </div>
                      <Button className="w-full mt-3" variant={lesson.completed ? "outline" : "default"}>
                        {lesson.completed ? "Review Again" : "Start Lesson"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Browse All Resources
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6 p-4 border rounded-lg bg-muted/50">
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Need to talk?</h3>
                <p className="text-sm mt-1">
                  If you're feeling overwhelmed or need someone to talk to, our counseling staff is here to help.
                </p>
                <Button className="mt-3">Connect with Counselor</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboardEnhanced;
