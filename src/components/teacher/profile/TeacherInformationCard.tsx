
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";

const TeacherInformationCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">nguyen@school.edu</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="text-sm text-muted-foreground">(555) 123-4567</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <GraduationCap className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Department</p>
            <p className="text-sm text-muted-foreground">Mathematics</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Office</p>
            <p className="text-sm text-muted-foreground">Room 203, Building B</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherInformationCard;
