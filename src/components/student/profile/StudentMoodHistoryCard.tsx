
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Activity } from "lucide-react";

const moodData = [
  { date: "10/07", mood: "Happy", energy: 8, note: "Had a great day at school!" },
  { date: "10/06", mood: "Okay", energy: 6, note: "Math test was hard but I think I did okay." },
  { date: "10/05", mood: "Sad", energy: 4, note: "Had an argument with a friend." },
  { date: "10/04", mood: "Stressed", energy: 5, note: "Lots of homework and upcoming tests." },
  { date: "10/03", mood: "Happy", energy: 9, note: "Got an A on my science project!" },
  { date: "10/02", mood: "Good", energy: 7, note: "Normal day, basketball practice was fun." },
  { date: "10/01", mood: "Tired", energy: 3, note: "Didn't sleep well, feeling exhausted." }
];

// Helper function to get emoji based on mood
const getMoodEmoji = (mood: string) => {
  switch(mood.toLowerCase()) {
    case "happy": return "😃";
    case "good": return "🙂";
    case "okay": return "😐";
    case "tired": return "😴";
    case "sad": return "😔";
    case "stressed": return "😣";
    default: return "😐";
  }
};

// Helper function to get color based on energy level
const getEnergyColor = (level: number) => {
  if (level >= 8) return "bg-green-500";
  if (level >= 6) return "bg-blue-500";
  if (level >= 4) return "bg-yellow-500";
  return "bg-red-500";
};

const StudentMoodHistoryCard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Recent Mood Check-ins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodData.map((entry, index) => (
              <div 
                key={index} 
                className="p-3 rounded-md border flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md min-w-[60px]">
                  <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                  <div className="text-xs font-medium mt-1">{entry.date}</div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-2 gap-2">
                    <h3 className="font-medium">{entry.mood}</h3>
                    <div className="ml-auto flex items-center">
                      <Activity className="h-4 w-4 mr-1 text-muted-foreground" />
                      <div className="text-sm">Energy: {entry.energy}/10</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Energy Level Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-12 flex items-end justify-between gap-1">
            {moodData.reverse().map((entry, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <div 
                  className={`w-8 ${getEnergyColor(entry.energy)}`} 
                  style={{ height: `${entry.energy * 10}%` }}
                ></div>
                <div className="text-xs mt-1">{entry.date}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-6">
            <div>Low Energy</div>
            <div>Medium Energy</div>
            <div>High Energy</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentMoodHistoryCard;
