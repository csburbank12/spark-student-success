
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const TeacherScheduleCard: React.FC = () => {
  const schedule = [
    { day: "Monday", periods: ["Math 101 (Period 1)", "Math 202 (Period 3)", "Office Hours (Period 5)"] },
    { day: "Tuesday", periods: ["Math 101 (Period 2)", "Math 303 (Period 4)", "Department Meeting (3:00PM)"] },
    { day: "Wednesday", periods: ["Math 101 (Period 1)", "Math 202 (Period 3)", "Office Hours (Period 5)"] },
    { day: "Thursday", periods: ["Math 101 (Period 2)", "Math 303 (Period 4)", "Professional Development (3:00PM)"] },
    { day: "Friday", periods: ["Math 101 (Period 1)", "Math 202 (Period 3)", "Faculty Meeting (2:30PM)"] }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Weekly Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className={`${index < schedule.length - 1 ? "pb-3 border-b" : ""}`}>
              <p className="font-medium">{item.day}</p>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                {item.periods.map((period, idx) => (
                  <li key={idx}>{period}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherScheduleCard;
