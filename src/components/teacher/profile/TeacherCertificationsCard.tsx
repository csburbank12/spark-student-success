
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const certificationsData = [
  {
    name: "State Teaching License - Mathematics",
    issueDate: "June 2015",
    expiryDate: "June 2025",
    certNumber: "TL-2015-98765",
    status: "active"
  },
  {
    name: "Special Education Certification",
    issueDate: "August 2016",
    expiryDate: "August 2026",
    certNumber: "SEC-2016-45678",
    status: "active"
  },
  {
    name: "Advanced Placement (AP) Certification",
    issueDate: "July 2018",
    expiryDate: "July 2023",
    certNumber: "AP-2018-12345",
    status: "renewal-required"
  },
  {
    name: "Digital Learning Specialist",
    issueDate: "January 2021",
    expiryDate: "January 2024",
    certNumber: "DLS-2021-54321",
    status: "active"
  }
];

const TeacherCertificationsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Certifications & Qualifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {certificationsData.map((cert, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-md border ${cert.status === 'renewal-required' ? 'border-amber-200 bg-amber-50' : ''}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{cert.name}</h3>
                <Badge 
                  variant={cert.status === 'active' ? 'outline' : 'secondary'} 
                  className={cert.status === 'renewal-required' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}
                >
                  {cert.status === 'active' ? 'Active' : 'Renewal Required'}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 opacity-70" />
                  Issued: {cert.issueDate}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 opacity-70" />
                  Expires: {cert.expiryDate}
                </div>
                <div className="flex items-center col-span-2">
                  <FileCheck className="h-3.5 w-3.5 mr-1 opacity-70" />
                  Certification #: {cert.certNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherCertificationsCard;
