
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  User,
  Check,
  Clock,
  AlertCircle,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { Intervention } from "./PredictiveSupportEngine";

interface InterventionCardProps {
  intervention: Intervention;
}

const InterventionCard: React.FC<InterventionCardProps> = ({ intervention }) => {
  const getStatusBadge = () => {
    switch (intervention.status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-600">Completed</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (intervention.status) {
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary" />;
      case "completed":
        return <Check className="h-4 w-4 text-green-600" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium">{intervention.type}</h3>
          <p className="text-sm text-muted-foreground mt-1">{intervention.description}</p>
        </div>
        <div className="flex items-center gap-1">
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>Assigned to: {intervention.assignedTo}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Due: {intervention.dueDate}</span>
        </div>
        {intervention.impact !== undefined && (
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            <span>Impact: +{intervention.impact}% improvement</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          <span className="text-sm">
            {intervention.status === "pending" && "Not started yet"}
            {intervention.status === "in-progress" && "Currently active"}
            {intervention.status === "completed" && "Completed"}
            {intervention.status === "overdue" && "Past due date"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Notes">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="More options">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterventionCard;
