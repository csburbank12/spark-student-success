
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AtRiskStudentsTabProps {
  totalRisk: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterGrade: string;
  setFilterGrade: (q: string) => void;
  filterRisk: string;
  setFilterRisk: (q: string) => void;
}

const AtRiskStudentsTab: React.FC<AtRiskStudentsTabProps> = ({
  totalRisk,
  searchQuery,
  setSearchQuery,
  filterGrade,
  setFilterGrade,
  filterRisk,
  setFilterRisk,
}) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Students Requiring Attention</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="6">Grade 6</SelectItem>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="moderate">Moderate Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-12 border-b py-3 px-4 font-medium text-sm">
            <div className="col-span-3">Student Name</div>
            <div className="col-span-2">Grade</div>
            <div className="col-span-2">Risk Score</div>
            <div className="col-span-3">Primary Concerns</div>
            <div className="col-span-2">Interventions</div>
          </div>
          {/* Demo, in real implementation map through filtered data */}
          <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
            <div className="col-span-3 font-medium">Alex Johnson</div>
            <div className="col-span-2">8</div>
            <div className="col-span-2 flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800">High</Badge>
              <span>82</span>
            </div>
            <div className="col-span-3 flex flex-wrap gap-1">
              <Badge variant="outline">Emotional</Badge>
              <Badge variant="outline">Attendance</Badge>
            </div>
            <div className="col-span-2">
              <Button size="sm">View</Button>
            </div>
          </div>
          <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
            <div className="col-span-3 font-medium">Lily Chen</div>
            <div className="col-span-2">8</div>
            <div className="col-span-2 flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800">High</Badge>
              <span>75</span>
            </div>
            <div className="col-span-3 flex flex-wrap gap-1">
              <Badge variant="outline">Emotional</Badge>
              <Badge variant="outline">Social</Badge>
            </div>
            <div className="col-span-2">
              <Button size="sm">View</Button>
            </div>
          </div>
          <div className="grid grid-cols-12 border-b py-3 px-4 text-sm items-center hover:bg-muted/50">
            <div className="col-span-3 font-medium">Emma Davis</div>
            <div className="col-span-2">8</div>
            <div className="col-span-2 flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
              <span>68</span>
            </div>
            <div className="col-span-3 flex flex-wrap gap-1">
              <Badge variant="outline">Attendance</Badge>
              <Badge variant="outline">Academic</Badge>
            </div>
            <div className="col-span-2">
              <Button size="sm">View</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Showing 3 of {totalRisk} at-risk students</div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AtRiskStudentsTab;
