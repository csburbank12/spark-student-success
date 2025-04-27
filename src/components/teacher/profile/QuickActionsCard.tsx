
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Calendar, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActionsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center" asChild>
            <Link to="/assign-sel">
              <Users className="h-6 w-6 mb-2" />
              <span>Assign SEL</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center" asChild>
            <Link to="/schedule-meeting">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Schedule Meeting</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center" asChild>
            <Link to="/create-report">
              <FileText className="h-6 w-6 mb-2" />
              <span>Create Report</span>
            </Link>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center text-center bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700" asChild>
            <Link to="/student-alerts">
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span>Student Alerts</span>
              <span className="text-xs bg-amber-200 px-2 py-0.5 rounded-full mt-1">3 New</span>
            </Link>
          </Button>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" className="text-primary" asChild>
            <Link to="/teacher-dashboard">
              Go to Dashboard <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
