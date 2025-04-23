
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, CheckCircle } from "lucide-react";

interface SELProgressOverviewProps {
  studentData: {
    assignments: Array<{
      id: string;
      status: string;
      assigned_at: string;
      due_date?: string;
      sel_lessons: {
        id: string;
        title: string;
        pathway: string;
      };
    }>;
    progress: Array<{
      id: string;
      lesson_id: string;
      completed: boolean;
      progress: number;
      completed_at?: string;
      sel_lessons: {
        id: string;
        title: string;
        pathway: string;
      };
    }>;
  } | null;
}

const SELProgressOverview: React.FC<SELProgressOverviewProps> = ({ studentData }) => {
  if (!studentData) {
    return <div>No data available</div>;
  }

  const { assignments, progress } = studentData;

  // Calculate overall completion percentage
  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter(a => a.status === "completed").length;
  const completionPercentage = totalAssignments > 0 
    ? Math.round((completedAssignments / totalAssignments) * 100)
    : 0;

  // Group progress by pathway
  const pathwayProgress: Record<string, { total: number; completed: number }> = {};
  
  assignments.forEach(assignment => {
    const pathway = assignment.sel_lessons.pathway || "Other";
    if (!pathwayProgress[pathway]) {
      pathwayProgress[pathway] = { total: 0, completed: 0 };
    }
    pathwayProgress[pathway].total += 1;
    
    if (assignment.status === "completed") {
      pathwayProgress[pathway].completed += 1;
    }
  });

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get assignments due soon
  const currentDate = new Date();
  const dueSoon = assignments.filter(a => {
    if (!a.due_date || a.status === "completed") return false;
    const dueDate = new Date(a.due_date);
    const diffDays = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  // Recent completions
  const recentCompletions = progress
    .filter(p => p.completed && p.completed_at)
    .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold">{completionPercentage}%</span>
            <span className="text-muted-foreground ml-2">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {completedAssignments}/{totalAssignments} Lessons
            </Badge>
          </div>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Pathway Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(pathwayProgress).map(([pathway, data]) => {
            const pathwayCompletionPercentage = data.total > 0 
              ? Math.round((data.completed / data.total) * 100)
              : 0;
              
            return (
              <div key={pathway} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>{pathway}</span>
                  <span className="text-sm text-muted-foreground">
                    {data.completed}/{data.total}
                  </span>
                </div>
                <Progress value={pathwayCompletionPercentage} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dueSoon.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Due Soon
            </h3>
            <ul className="space-y-2">
              {dueSoon.map(assignment => (
                <li key={assignment.id} className="text-sm flex items-center justify-between">
                  <span>{assignment.sel_lessons.title}</span>
                  <Badge variant="outline">Due {formatDate(assignment.due_date)}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}

        {recentCompletions.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Recently Completed
            </h3>
            <ul className="space-y-2">
              {recentCompletions.map(completion => (
                <li key={completion.id} className="text-sm flex items-center justify-between">
                  <span>{completion.sel_lessons.title}</span>
                  <Badge variant="outline">{formatDate(completion.completed_at)}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SELProgressOverview;
