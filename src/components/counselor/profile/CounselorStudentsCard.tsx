
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, Search, Filter, Plus, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const studentsData = [
  { 
    name: "Jada Thompson", 
    grade: "10th Grade", 
    lastCheckIn: "Today, 8:15 AM",
    status: "good",
    needsAttention: false,
    notes: "College application preparation starting next month"
  },
  { 
    name: "Alex Johnson", 
    grade: "11th Grade", 
    lastCheckIn: "Today, 9:30 AM",
    status: "at-risk",
    needsAttention: true,
    notes: "Struggling with math, needs academic support"
  },
  { 
    name: "Casey Williams", 
    grade: "9th Grade", 
    lastCheckIn: "Yesterday, 2:15 PM",
    status: "watch",
    needsAttention: true,
    notes: "Reported conflict with another student"
  },
  { 
    name: "Jordan Lee", 
    grade: "12th Grade", 
    lastCheckIn: "3 days ago",
    status: "good",
    needsAttention: false,
    notes: "College application review scheduled for next week"
  },
  { 
    name: "Taylor Wilson", 
    grade: "10th Grade", 
    lastCheckIn: "Today, 11:45 AM",
    status: "watch",
    needsAttention: false,
    notes: "Attendance concerns, follow up with parents"
  }
];

const CounselorStudentsCard: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  
  const filteredStudents = studentsData
    .filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.grade.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(student => 
      statusFilter === null || student.status === statusFilter
    );
    
  const handleSchedule = (name: string) => {
    toast.success(`Scheduled meeting with ${name}`);
  };
  
  const handleViewDetails = (name: string) => {
    toast.info(`Viewing details for ${name}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          My Students
        </CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Students
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('at-risk')}>
                At Risk Students
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('watch')}>
                Watch List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('good')}>
                Good Standing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="divide-y">
          {filteredStudents.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No students matching your filters
            </div>
          ) : (
            filteredStudents.map((student, index) => (
              <div 
                key={index} 
                className={`py-4 ${student.needsAttention ? 'bg-amber-50/50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{student.name}</h3>
                      {student.needsAttention && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                      )}
                      <Badge 
                        variant="outline" 
                        className={
                          student.status === 'at-risk' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                          student.status === 'watch' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                          'bg-green-100 text-green-800 hover:bg-green-100'
                        }
                      >
                        {student.status === 'at-risk' ? 'At Risk' : 
                         student.status === 'watch' ? 'Watch' : 'Good'}
                      </Badge>
                    </div>
                    <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                      <span>{student.grade}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {student.lastCheckIn}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{student.notes}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSchedule(student.name)}
                    >
                      Schedule
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewDetails(student.name)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {studentsData.length} students
          </div>
          <Button variant="outline" size="sm">View All Students</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CounselorStudentsCard;
