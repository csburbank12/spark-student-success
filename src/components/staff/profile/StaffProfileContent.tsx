
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
import { School, BookOpen, Calendar, Users } from "lucide-react";

interface StaffProfileProps {
  user: User;
}

const StaffProfileContent: React.FC<StaffProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "Chen Li",
    email: user.email || "chen@school.edu",
    department: "Student Support Services",
    position: "School Counselor Assistant",
    phone: "(555) 123-4567",
    officeLocation: "Room 110",
    officeHours: "Mon-Fri: 8:00AM - 3:30PM",
    bio: "Supporting students and staff with administrative and counseling assistance.",
    specialties: "Student records management, event coordination, peer mediation"
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

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
        <CardContent className="-mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-xl bg-indigo-100 text-indigo-800">{initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mb-2">
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.position}</p>
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
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
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
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" value={profileData.department} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" name="position" value={profileData.position} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="officeLocation">Office Location</Label>
                      <Input id="officeLocation" name="officeLocation" value={profileData.officeLocation} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
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
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Department</p>
                      <p>{profileData.department}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Position</p>
                      <p>{profileData.position}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Office Location</p>
                      <p>{profileData.officeLocation}</p>
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
              <CardTitle>Key Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start p-4 rounded-lg border">
                  <School className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Department</h4>
                    <p className="text-sm text-muted-foreground">{profileData.department}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Calendar className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Office Hours</h4>
                    <p className="text-sm text-muted-foreground">{profileData.officeHours}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <BookOpen className="h-8 w-8 text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Specialties</h4>
                    <p className="text-sm text-muted-foreground">{profileData.specialties}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Users className="h-8 w-8 text-purple-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Staff ID</h4>
                    <p className="text-sm text-muted-foreground">STF-{Math.floor(10000 + Math.random() * 90000)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <div key={day} className="border-b pb-4 last:border-0">
                    <h3 className="font-medium mb-2">{day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="text-sm">
                        <span className="inline-block w-20 font-medium">8:00 AM</span>
                        <span className="text-muted-foreground">Office Hours</span>
                      </div>
                      <div className="text-sm">
                        <span className="inline-block w-20 font-medium">9:30 AM</span>
                        <span className="text-muted-foreground">Student Support</span>
                      </div>
                      <div className="text-sm">
                        <span className="inline-block w-20 font-medium">11:00 AM</span>
                        <span className="text-muted-foreground">Staff Meeting</span>
                      </div>
                      <div className="text-sm">
                        <span className="inline-block w-20 font-medium">1:00 PM</span>
                        <span className="text-muted-foreground">Group Sessions</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Development</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Certifications</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Student Support Services Certification</li>
                    <li>Crisis Response Training</li>
                    <li>Peer Mediation Facilitator</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Training</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>SEL Implementation (2023)</li>
                    <li>Trauma-Informed Practices (2022)</li>
                    <li>Student Record Management (2021)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Professional Goals</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Complete School Counseling Assistant Certificate</li>
                    <li>Implement new student check-in system</li>
                    <li>Organize career day for upper grades</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffProfileContent;
