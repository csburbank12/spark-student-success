import React from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Trash2, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  lessons?: SelLesson[];
}

const SELPathwayManagement: React.FC<Props> = ({ lessons }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Mock SEL lesson data (replace with actual data fetching)
  const mockLessons = [
    {
      id: "1",
      title: "Understanding Emotions",
      description: "Learn to identify and understand different emotions.",
      competency_area: "Self-Awareness",
      estimated_duration: 30,
      difficulty: "Beginner",
    },
    {
      id: "2",
      title: "Managing Stress",
      description: "Techniques for managing stress and anxiety.",
      competency_area: "Self-Management",
      estimated_duration: 45,
      difficulty: "Intermediate",
    },
    {
      id: "3",
      title: "Building Relationships",
      description: "Strategies for building and maintaining healthy relationships.",
      competency_area: "Social Awareness",
      estimated_duration: 60,
      difficulty: "Advanced",
    },
  ];

  const filteredLessons = mockLessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">SEL Pathway Management</h1>
        <Link to="/sel-lesson-onboarding">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SEL Lessons</CardTitle>
          <CardDescription>Manage and organize SEL lessons.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search lessons..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Competency Area</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.title}</TableCell>
                  <TableCell>{lesson.competency_area}</TableCell>
                  <TableCell>{lesson.estimated_duration} minutes</TableCell>
                  <TableCell>{lesson.difficulty}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredLessons.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Search className="h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-medium">No lessons found</p>
              <p className="text-muted-foreground">
                Try adjusting your search or adding a new lesson.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SELPathwayManagement;
