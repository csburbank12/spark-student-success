
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
  selectedChildData: any;
  getHomeStrategies: () => string[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ selectedChildData, getHomeStrategies }) => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Recent School Notes</CardTitle>
        <CardDescription>Notes from teachers and staff</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedChildData.recentNotes.length > 0 ? (
          selectedChildData.recentNotes.map((note: any, idx: number) => (
            <div key={idx} className="p-3 border rounded-md">
              <p className="text-sm">{note.note}</p>
              <p className="text-xs text-muted-foreground mt-1">{note.date}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-6">No recent notes</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Notes</Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Suggested Home Strategies</CardTitle>
        <CardDescription>Ways to support your child at home</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {getHomeStrategies().map((strategy: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm">{strategy}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Family Resource Center</Button>
      </CardFooter>
    </Card>
  </div>
);

export default OverviewTab;
