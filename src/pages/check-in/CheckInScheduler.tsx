
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const demoTimeSlots = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: false },
  { time: "3:00 PM", available: true },
];

const CheckInScheduler = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const handleSchedule = (time: string) => {
    const dateStr = selectedDate ? selectedDate.toLocaleDateString() : '';
    toast.success(`Check-in scheduled for ${dateStr} at ${time}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Schedule Check-in</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className={cn("rounded-md border w-full", "pointer-events-auto")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {demoTimeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{slot.time}</span>
                  </div>
                  <Button
                    size="sm"
                    variant={slot.available ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => handleSchedule(slot.time)}
                  >
                    {slot.available ? "Schedule" : "Unavailable"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckInScheduler;
