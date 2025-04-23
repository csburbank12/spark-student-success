
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { HelpCircle, Bookmark, CheckCircle } from "lucide-react";
import { behaviorSituations, responseStrategies } from "./constants";
import { StudentProfile } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface StaffAssistFormProps {
  students: StudentProfile[];
  isLogging: boolean;
  onLog: (data: {
    studentId: string | null;
    situationType: string;
    interventionUsed: string;
    notes: string;
  }) => void;
  resetForm: () => void;
}

const StaffAssistForm: React.FC<StaffAssistFormProps> = ({
  students, isLogging, onLog, resetForm
}) => {
  const [situation, setSituation] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const suggestedResponses =
    situation && responseStrategies[situation as keyof typeof responseStrategies]
      ? responseStrategies[situation as keyof typeof responseStrategies]
      : [];

  const handleAssist = () => {
    if (!situation) {
      toast("Please select a situation type");
      return;
    }

    if (!selectedResponse) {
      toast("Please select a response strategy");
      return;
    }

    onLog({
      studentId: selectedStudentId,
      situationType: situation,
      interventionUsed: selectedResponse,
      notes: notes,
    });
  };

  const handleReset = () => {
    setSituation(null);
    setSelectedResponse(null);
    setNotes("");
    setSelectedStudentId(null);
    resetForm();
  };

  return (
    <Card>
      <CardHeader className={isMobile ? "p-4" : "p-6"}>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Behavior Response Assistant
        </CardTitle>
        <CardDescription>
          Get immediate, research-backed strategies for classroom behaviors
        </CardDescription>
      </CardHeader>
      <CardContent className={`space-y-4 ${isMobile ? "px-4" : ""}`}>
        <div className="space-y-2">
          <label htmlFor="student-select" className="text-sm font-medium">
            Select Student (Optional)
          </label>
          <Select value={selectedStudentId || ""} onValueChange={setSelectedStudentId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a student (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No specific student</SelectItem>
              {students?.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="situation-select" className="text-sm font-medium">
            What's happening right now?
          </label>
          <Select value={situation || ""} onValueChange={setSituation}>
            <SelectTrigger>
              <SelectValue placeholder="Select the situation type" />
            </SelectTrigger>
            <SelectContent>
              {behaviorSituations.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {situation && (
          <>
            <div className="border rounded-md p-3 md:p-4 bg-muted/30">
              <h3 className="text-base md:text-lg font-medium mb-3">Recommended Strategies:</h3>
              <div className="space-y-3 md:space-y-4">
                {suggestedResponses.map((response, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedResponse === response.title
                        ? "border-primary ring-2 ring-primary ring-opacity-50"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedResponse(response.title)}
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-medium text-sm md:text-base">{response.title}</h4>
                        {selectedResponse === response.title && (
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        {response.description}
                      </p>
                      <div className="mt-2 md:mt-3 p-2 md:p-3 bg-secondary/20 rounded-md">
                        <p className="text-xs md:text-sm font-medium">Sample Script:</p>
                        <p className="italic text-xs md:text-sm mt-1">{response.script}</p>
                      </div>
                      <div className="mt-2 md:mt-3 text-xs text-muted-foreground">
                        <p className="font-medium">Research:</p>
                        <p>{response.research}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Textarea
                id="notes"
                placeholder="Add additional context or observations"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className={`flex justify-between ${isMobile ? "p-4" : ""}`}>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button 
          onClick={handleAssist} 
          className="gap-2" 
          disabled={isLogging || !situation || !selectedResponse}
        >
          <Bookmark className="h-4 w-4" />
          {isLogging ? "Logging..." : "Log Intervention"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StaffAssistForm;
