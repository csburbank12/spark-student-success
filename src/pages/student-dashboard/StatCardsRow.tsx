
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award, BookOpen, Heart } from "lucide-react";

const StatCardsRow: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Daily Streak</p>
            <h3 className="text-2xl font-bold mt-1">7 Days</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Badges Earned</p>
            <h3 className="text-2xl font-bold mt-1">12</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
            <Award className="h-5 w-5 text-amber-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">SEL Activities</p>
            <h3 className="text-2xl font-bold mt-1">24</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Mood Index</p>
            <h3 className="text-2xl font-bold mt-1">85%</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
            <Heart className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCardsRow;
