
import React, { useState } from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Heart, Calendar, BookOpen, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CounselorProfileProps {
  user: User;
}

const CounselorProfileContent: React.FC<CounselorProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Miguel Sanchez",
    email: user?.email || "miguel@school.edu",
    title: "School Counselor",
    phone: "(555) 456-7890",
    office: "Room 115",
    specialization: "Social-Emotional Development, Behavioral Support",
    bio: "Dedicated school counselor with expertise in helping students navigate social-emotional challenges and develop healthy coping strategies.",
    education: "M.Ed. in School Counseling, Licensed Professional Counselor",
    officeHours: "Monday-Friday: 8:00 AM - 4:00 PM",
    emergencyContact: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  const initials = profileData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Sample availability schedule
  const availabilitySchedule = [
    { day: "Monday", slots: ["9:00 AM - 10:30 AM", "1:00 PM - 3:00 PM"] },
    { day: "Tuesday", slots: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"] },
    { day: "Wednesday", slots: ["8:30 AM - 11:30 AM", "1:30 PM - 3:30 PM"] },
    { day: "Thursday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"] },
    { day: "Friday", slots: ["8:00 AM - 11:00 AM", "1:00 PM - 2:30 PM"] }
  ];

  // Sample upcoming appointments
  const upcomingAppointments = [
    { studentName: "Jamie S.", date: "April 29, 2025", time: "9:30 AM", type: "Check-in" },
    { studentName: "Casey L.", date: "April 30, 2025", time: "1:15 PM", type: "Goal Setting" },
    { studentName: "Parent Meeting", date: "May 1, 2025", time: "3:00 PM", type: "Parent Conference" }
  ];

  // Sample programs and resources
  const programs = [
    { name: "Peer Mediation", description: "Student-led conflict resolution program", type: "Ongoing" },
    { name: "Anxiety Management Group", description: "Weekly group for anxiety management skills", type: "Weekly" },
    { name: "College Prep Workshop", description: "Preparing juniors and seniors for college applications", type: "Monthly" },
    { name: "New Student Orientation", description: "Support program for students new to the school", type: "Quarterly" }
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
        <CardContent className="-mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-xl bg-purple-100 text-purple-800">{initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <Badge variant="outline" className="border-purple-200 bg-purple-100 text-purple-800">Counselor</Badge>
                </div>
                <p className="text-muted-foreground">{profileData.title}</p>
              </div>
            </div>
            <div className="space-x-2">
              {isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" value={profileData.email} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" value={profileData.title} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input id="specialization" name="specialization" value={profileData.specialization} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="office">Office</Label>
                      <Input id="office" name="office" value={profileData.office} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="education">Education & Credentials</Label>
                      <Input id="education" name="education" value={profileData.education} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="officeHours">Office Hours</Label>
                      <Input id="officeHours" name="officeHours" value={profileData.officeHours} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p>{profileData.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{profileData.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p>{profileData.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Office</p>
                      <p>{profileData.office}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Title</p>
                      <p>{profileData.title}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                      <p>{profileData.specialization}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Education & Credentials</p>
                      <p>{profileData.education}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Office Hours</p>
                      <p>{profileData.officeHours}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Bio</p>
                    <p>{profileData.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Counselor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start p-4 rounded-lg border">
                  <Heart className="h-8 w-8 text-rose-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Specialization</h4>
                    <p className="text-sm text-muted-foreground">{profileData.specialization}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Calendar className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Office Hours</h4>
                    <p className="text-sm text-muted-foreground">{profileData.officeHours}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <BookOpen className="h-8 w-8 text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-sm text-muted-foreground">{profileData.education}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <ShieldCheck className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Emergency Contact</h4>
                    <p className="text-sm text-muted-foreground">{profileData.emergencyContact ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Availability Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availabilitySchedule.map((day, i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                      <h3 className="font-medium mb-2">{day.day}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {day.slots.map((slot, j) => (
                          <div key={j} className="bg-muted px-4 py-2 rounded-md text-sm">
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{appointment.studentName}</h4>
                        <Badge variant="outline">{appointment.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View Full Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Schedule an Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-type">Appointment Type</Label>
                    <select id="appointment-type" className="w-full rounded-md border border-input bg-transparent px-3 py-2">
                      <option>General Check-in</option>
                      <option>Academic Guidance</option>
                      <option>Social-Emotional Support</option>
                      <option>College/Career Planning</option>
                      <option>Parent Conference</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-date">Preferred Date</Label>
                    <Input id="appointment-date" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-time">Preferred Time</Label>
                    <select id="appointment-time" className="w-full rounded-md border border-input bg-transparent px-3 py-2">
                      <option>Morning (8:00 AM - 10:00 AM)</option>
                      <option>Mid-day (10:00 AM - 12:00 PM)</option>
                      <option>Early Afternoon (1:00 PM - 2:30 PM)</option>
                      <option>Late Afternoon (2:30 PM - 4:00 PM)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <select id="duration" className="w-full rounded-md border border-input bg-transparent px-3 py-2">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointment-notes">Notes</Label>
                  <Textarea id="appointment-notes" placeholder="Brief description of what you'd like to discuss..." />
                </div>
                <Button type="button">Request Appointment</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs">
          <Card>
            <CardHeader>
              <CardTitle>Programs & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((program, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <Badge variant="outline">{program.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                      <Button variant="outline" size="sm">Learn More</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Additional Resources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Crisis Hotlines</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>National Crisis Line: 988</li>
                      <li>Youth Crisis Text Line: Text HOME to 741741</li>
                      <li>School Crisis Team: (555) 123-4567</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Community Resources</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Community Mental Health Center</li>
                      <li>Local Youth Support Groups</li>
                      <li>Family Resource Center</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CounselorProfileContent;
