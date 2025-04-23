
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SELAssignLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (lessonId: string, dueDate?: string) => void;
  selectedLesson: any;
  lessons: Array<{
    id: string;
    title: string;
    pathway: string;
  }>;
  isLoading: boolean;
}

const SELAssignLessonDialog: React.FC<SELAssignLessonDialogProps> = ({
  open,
  onOpenChange,
  onAssign,
  selectedLesson,
  lessons,
  isLoading
}) => {
  const [lessonId, setLessonId] = useState<string>(selectedLesson?.id || "");
  const [date, setDate] = useState<Date | undefined>();

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      setLessonId(selectedLesson?.id || "");
      setDate(undefined);
    }
  }, [open, selectedLesson]);

  const handleAssign = () => {
    onAssign(
      lessonId,
      date ? format(date, "yyyy-MM-dd") : undefined
    );
  };

  // Group lessons by pathway
  const lessonsByPathway: Record<string, typeof lessons> = {};
  lessons.forEach(lesson => {
    const pathway = lesson.pathway || "Other";
    if (!lessonsByPathway[pathway]) {
      lessonsByPathway[pathway] = [];
    }
    lessonsByPathway[pathway].push(lesson);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign SEL Lesson</DialogTitle>
          <DialogDescription>
            Select a lesson to assign to this student and optionally set a due date.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="lesson" className="text-sm font-medium">
              Lesson
            </label>
            <Select
              value={lessonId}
              onValueChange={setLessonId}
              disabled={!!selectedLesson}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a lesson" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {Object.entries(lessonsByPathway).map(([pathway, pathwayLessons]) => (
                  <div key={pathway}>
                    <div className="px-2 py-1.5 text-sm font-semibold">{pathway}</div>
                    {pathwayLessons.map(lesson => (
                      <SelectItem key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </SelectItem>
                    ))}
                    {pathway !== Object.keys(lessonsByPathway).slice(-1)[0] && (
                      <hr className="my-1" />
                    )}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="due-date" className="text-sm font-medium">
              Due Date (Optional)
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="due-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign} 
            disabled={!lessonId || isLoading}
          >
            {isLoading ? "Assigning..." : "Assign Lesson"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SELAssignLessonDialog;
