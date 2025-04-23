
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CheckInListProps {
  checkIns: any[];
  isLoading: boolean;
}

const getMoodEmoji = (mood: string) => {
  switch (mood) {
    case "happy": return "😃";
    case "good": return "🙂";
    case "okay": return "😐";
    case "sad": return "😔";
    case "stressed": return "😣";
    default: return "😐";
  }
};

const CheckInList: React.FC<CheckInListProps> = ({ checkIns, isLoading }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">Previous Check-Ins</CardTitle>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center gap-4 pb-4 border-b">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {checkIns.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">
              No check-ins yet. Complete your first mood check-in above!
            </div>
          ) : (
            checkIns.map((checkIn: any, index: number) => (
              <div
                key={checkIn.id || index}
                className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="md:w-24">
                  <div className="text-sm font-medium">
                    {new Date(checkIn.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 md:w-32">
                  <span className="text-2xl">{getMoodEmoji(checkIn.mood_type)}</span>
                  <span className="capitalize text-sm">{checkIn.mood_type}</span>
                </div>
                <div className="md:w-32">
                  <div className="flex items-center gap-2">
                    <div className="h-2 bg-primary/20 rounded-full w-24">
                      <div
                        className="h-2 bg-primary rounded-full"
                        style={{ width: `${(checkIn.energy_level || 0) * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{checkIn.energy_level || 0}/10</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{checkIn.notes || ""}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </CardContent>
  </Card>
);

export default CheckInList;
