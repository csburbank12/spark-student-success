
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, FileText, Video } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";

const Help = () => {
  const { user } = useAuth();
  const userRole = user?.role as UserRole;

  const sendSupportRequest = () => {
    toast.success("Support request submitted. We'll get back to you soon!");
  };

  const getRoleFAQs = () => {
    switch (userRole) {
      case UserRole.teacher:
        return [
          {
            question: "How do I add students to my class?",
            answer: "Navigate to Student Management, click 'Add Students', and either enter their information manually or import from a CSV file."
          },
          {
            question: "How do I track student mood trends?",
            answer: "On your dashboard, you can view aggregated mood data under the Wellness tab. For individual students, check their specific profiles."
          },
          {
            question: "How do I assign SEL lessons?",
            answer: "Go to SEL Pathways, select a lesson, click 'Assign', choose your students, and set a due date."
          }
        ];
      case UserRole.student:
        return [
          {
            question: "How do I complete my mood check-in?",
            answer: "From your dashboard, click on the Check-In button and select your current mood and energy level."
          },
          {
            question: "Where can I find SEL lessons assigned to me?",
            answer: "Your assignments appear on your dashboard. Click on any assignment to begin the lesson."
          },
          {
            question: "How do I use the Reset Room?",
            answer: "Access the Reset Room from your dashboard or navigation menu, then choose an activity that helps you calm down."
          }
        ];
      case UserRole.admin:
        return [
          {
            question: "How do I add staff members to the system?",
            answer: "Go to User Management, click 'Add User', select the Staff role, and enter their information."
          },
          {
            question: "How do I view school-wide wellness data?",
            answer: "The Admin Dashboard has analytics panels showing aggregated wellness data for all students."
          },
          {
            question: "How do I configure safety alert settings?",
            answer: "Navigate to System Settings and select the Safety Alerts tab to customize thresholds and notification rules."
          }
        ];
      case UserRole.parent:
        return [
          {
            question: "How do I view my child's progress?",
            answer: "On your dashboard, select your child's profile to see their academic progress and wellness information."
          },
          {
            question: "How do I message my child's teacher?",
            answer: "Go to Messages, click 'New Message', select your child's teacher from the dropdown, and compose your message."
          },
          {
            question: "How do I set up a parent-teacher meeting?",
            answer: "Navigate to the Meetings tab, click 'Request Meeting', select available times, and submit your request."
          }
        ];
      case UserRole.staff:
        return [
          {
            question: "How do I log interventions for students?",
            answer: "Go to Staff Assist Mode, select a student, choose an intervention strategy, and click 'Log Intervention'."
          },
          {
            question: "How do I track the effectiveness of interventions?",
            answer: "In Staff Assist Mode, go to the Intervention History tab to view past interventions and rate their effectiveness."
          },
          {
            question: "How do I access student SEL data?",
            answer: "Navigate to Student Management, select a student, and view their SEL tab for comprehensive data."
          }
        ];
      default:
        return [
          {
            question: "How do I update my profile information?",
            answer: "Go to your profile page by clicking on your avatar, then click 'Edit Profile' to update your information."
          },
          {
            question: "How do I change my password?",
            answer: "Navigate to Settings, select the Account tab, and click the 'Change Password' button."
          },
          {
            question: "How do I get help with technical issues?",
            answer: "Submit a support request using the form on this page or email support@beaconapp.edu."
          }
        ];
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions and get assistance</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="docs">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video className="mr-2 h-4 w-4" />
                Video Guides
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="p-4">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {getRoleFAQs().map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="docs" className="p-4">
              <h3 className="text-lg font-semibold mb-4">Documentation</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn the basics of using the Beacon platform and set up your account.
                    </p>
                    <Button variant="outline" size="sm">View Guide</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{userRole} User Manual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive guide to all features available for your role.
                    </p>
                    <Button variant="outline" size="sm">Download PDF</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Technical Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Technical specifications and system requirements.
                    </p>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="p-4">
              <h3 className="text-lg font-semibold mb-4">Video Tutorials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-1">Getting Started</h4>
                    <p className="text-sm text-muted-foreground">3:45 min</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-1">{userRole} Features Overview</h4>
                    <p className="text-sm text-muted-foreground">5:12 min</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-1">Advanced Features</h4>
                    <p className="text-sm text-muted-foreground">7:30 min</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardContent className="pt-4">
                    <h4 className="font-medium mb-1">Troubleshooting Common Issues</h4>
                    <p className="text-sm text-muted-foreground">4:18 min</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Get in touch with our support team.
              </p>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="subject">Subject</Label>
                  <input
                    id="subject"
                    className="w-full p-2 border rounded"
                    placeholder="Brief description of your issue"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="w-full p-2 border rounded min-h-[120px]"
                    placeholder="Please describe your issue in detail"
                  />
                </div>
                
                <Button className="w-full" onClick={sendSupportRequest}>
                  Submit Request
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Other Contact Options</p>
                <p className="text-sm">Email: support@beaconapp.edu</p>
                <p className="text-sm">Phone: (555) 123-4567</p>
                <p className="text-sm">Hours: Mon-Fri, 8am-6pm ET</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
