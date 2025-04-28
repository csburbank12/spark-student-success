
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Mail, Phone, School, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const trustedAdultsData = [
  {
    name: "Mr. Ethan Nguyen",
    role: "Teacher",
    subject: "Math",
    email: "nguyen@school.edu",
    phone: "555-123-4567"
  },
  {
    name: "Ms. Casey Williams",
    role: "School Counselor",
    email: "williams@school.edu",
    phone: "555-987-6543",
    availableHours: "Mon-Fri, 8am-3pm"
  },
  {
    name: "Coach Jordan Rivera",
    role: "Basketball Coach",
    email: "rivera@school.edu",
    phone: "555-456-7890",
    location: "Gym Office"
  }
];

const StudentTrustedAdultsCard: React.FC = () => {
  const handleContact = (method: string, value: string) => {
    if (method === "email") {
      window.location.href = `mailto:${value}`;
    } else {
      toast.info(`${method}: ${value}`);
    }
  };
  
  const handleRequestNewAdult = () => {
    toast.info("Request submitted! Your request will be reviewed by administrators.");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Trusted Adults
        </CardTitle>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Request New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            These are the trusted adults you can reach out to when you need support or someone to talk to.
          </p>
          
          <div className="space-y-4">
            {trustedAdultsData.map((adult, index) => (
              <div 
                key={index} 
                className="p-4 rounded-md border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{adult.name}</h3>
                    <div className="flex items-center mt-1">
                      <Badge variant="secondary" className="mr-2">
                        {adult.role}
                      </Badge>
                      {adult.subject && (
                        <span className="text-xs text-muted-foreground">{adult.subject}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm" 
                      onClick={() => handleContact("email", adult.email)}
                    >
                      {adult.email}
                    </Button>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm" 
                      onClick={() => handleContact("phone", adult.phone)}
                    >
                      {adult.phone}
                    </Button>
                  </div>
                  
                  {adult.location && (
                    <div className="flex items-center">
                      <School className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span>{adult.location}</span>
                    </div>
                  )}
                  
                  {adult.availableHours && (
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      <span>{adult.availableHours}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleRequestNewAdult}>
              <UserPlus className="h-4 w-4 mr-2" />
              Request Additional Trusted Adult
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentTrustedAdultsCard;
