
import React from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SELLessonsTableProps {
  lessons: SelLesson[];
  onDeleteLesson: (id: string) => void;
}

export const SELLessonsTable = ({ lessons, onDeleteLesson }: SELLessonsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Title</TableHead>
          <TableHead>Competency Area</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Activity Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lessons.map((lesson) => (
          <TableRow key={lesson.id}>
            <TableCell className="font-medium">{lesson.title}</TableCell>
            <TableCell>{lesson.competency_area || 'General'}</TableCell>
            <TableCell>{lesson.estimated_duration || lesson.duration || '--'} minutes</TableCell>
            <TableCell>
              <Badge variant="outline">
                {lesson.activity_type || 'Activity'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link to={`/edit-sel-lesson/${lesson.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => onDeleteLesson(lesson.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
