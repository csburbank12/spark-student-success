
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    avatarUrl?: string;
    lastCheckIn?: string;
    mood?: string;
    alerts?: number;
    flags?: string[];
  };
  onClick?: () => void;
  className?: string;
}

export const StudentCard = ({ student, onClick, className }: StudentCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all",
        onClick && "cursor-pointer hover:shadow-md",
        student.alerts && student.alerts > 0 ? "border-l-4 border-l-amber-500" : "",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-primary">
                  {student.name.charAt(0)}
                </span>
              )}
            </div>
            <CardTitle className="text-base font-medium">{student.name}</CardTitle>
          </div>
          {student.alerts && student.alerts > 0 && (
            <div className="flex items-center">
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                <AlertCircle className="h-3 w-3 mr-1" />
                {student.alerts}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Last check-in: </span>
            <span>{student.lastCheckIn || "No recent check-in"}</span>
          </div>
          {student.mood && (
            <div className="text-sm">
              <span className="text-muted-foreground">Current mood: </span>
              <span>{student.mood}</span>
            </div>
          )}
          {student.flags && student.flags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {student.flags.map((flag) => (
                <Badge key={flag} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                  {flag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
