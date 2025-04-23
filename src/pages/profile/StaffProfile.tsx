
import React from "react";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Clock, User as UserIcon, BookOpen, Shield, MessageSquare } from "lucide-react";

interface StaffProfileProps {
  user: User | null;
}

const StaffProfile: React.FC<StaffProfileProps> = ({ user }) => {
  const navigate = useNavigate();

  // Mock data for staff profile
  const staffData = {
    position: "Behavioral Support Specialist",
    department: "Student Services",
    interventionsCompleted: 24,
    totalStudentsSupported: 15,
    recentInterventions: [
      {
        studentName: "Alex Johnson",
        date: "2023-04-15",
        interventionType: "Behavior Management",
        effectiveness: 4
      },
      {
        studentName: "Emma Smith",
        date: "2023-04-14",
        interventionType: "Crisis Intervention",
        effectiveness: 3
      },
      {
        studentName: "Noah Miller",
        date: "2023-04-13",
        interventionType: "Anxiety Support",
        effectiveness: 5
      }
    ],
    professionalDevelopment: [
      {
        title: "Crisis De-escalation Techniques",
        completed: true,
        progress: 100
      },
      {
        title: "Trauma-Informed Care",
        completed: true,
        progress: 100
      },
      {
        title: "Social-Emotional Learning Strategies",
        completed: false,
        progress: 65
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Staff Information</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Position:</dt>
              <dd className="font-medium">{staffData.position}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Department:</dt>
              <dd className="font-medium">{staffData.department}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Interventions Completed:</dt>
              <dd className="font-medium">{staffData.interventionsCompleted}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Students Supported:</dt>
              <dd className="font-medium">{staffData.totalStudentsSupported}</dd>
            </div>
          </dl>
          
          <div className="mt-6">
            <h4 className="text-md font-medium mb-3">Quick Access</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start" onClick={() => navigate("/staff-assist")}>
                <Shield className="mr-2 h-4 w-4" />
                Staff Assist
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate("/students")}>
                <UserIcon className="mr-2 h-4 w-4" />
                Student Management
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate("/sel-pathways")}>
                <BookOpen className="mr-2 h-4 w-4" />
                SEL Pathways
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate("/messages")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Professional Development</h3>
          <div className="space-y-3">
            {staffData.professionalDevelopment.map((course, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{course.title}</span>
                  <span className="font-medium">{course.completed ? "Completed" : `${course.progress}%`}</span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" onClick={() => navigate("/professional-development")}>
              View All Courses
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Recent Interventions</h3>
        <div className="space-y-3">
          {staffData.recentInterventions.map((intervention, index) => (
            <div key={index} className="p-3 border rounded-md">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{intervention.studentName}</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{intervention.date}</span>
                </div>
              </div>
              <div className="text-sm">{intervention.interventionType}</div>
              <div className="mt-2 flex items-center">
                <span className="text-xs mr-2">Effectiveness:</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 mr-0.5 rounded-full ${
                        i < intervention.effectiveness ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={() => navigate("/staff-assist")}>
            View All Interventions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
