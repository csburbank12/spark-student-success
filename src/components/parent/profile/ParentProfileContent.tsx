
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
import { Users, Phone, Mail, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ParentProfileProps {
  user: User;
}

const ParentProfileContent: React.FC<ParentProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Sarah Parker",
    email: user?.email || "sarah@family.com",
    phone: "(555) 234-5678",
    address: "123 Family Lane, Hometown, CA 94321",
    relationship: "Mother",
    emergencyContact: true,
    bio: "Parent of Alex (9th grade) and Jamie (7th grade). Active in school community and PTA member.",
    preferredContact: "Email"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    behavioralUpdates: true,
    academicUpdates: true,
    emergencyNotifications: true,
    weeklyReports: true,
    schoolEvents: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
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

  // Sample children data
  const children = [
    {
      name: "Alex Parker",
      grade: "9th Grade",
      school: "Lincoln High School",
      photo: null
    },
    {
      name: "Jamie Parker",
      grade: "7th Grade", 
      school: "Roosevelt Middle School",
      photo: null
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-green-500 h-32"></div>
        <CardContent className="-mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-xl bg-teal-100 text-teal-800">{initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mb-2">
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">Parent | {profileData.relationship}</p>
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
          <TabsTrigger value="children">My Children</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
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
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship to Student</Label>
                      <Input id="relationship" name="relationship" value={profileData.relationship} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={profileData.address} onChange={handleChange} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                    <Input id="preferredContact" name="preferredContact" value={profileData.preferredContact} onChange={handleChange} />
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
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="break-words">{profileData.address}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Relationship to Student</p>
                      <p>{profileData.relationship}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                      <p>{profileData.emergencyContact ? "Yes" : "No"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Preferred Contact Method</p>
                      <p>{profileData.preferredContact}</p>
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
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start p-4 rounded-lg border">
                  <Phone className="h-8 w-8 text-teal-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Mail className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border sm:col-span-2">
                  <Users className="h-8 w-8 text-amber-500 mr-3" />
                  <div className="flex-1">
                    <h4 className="font-medium">Children</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {children.map((child, index) => (
                        <div key={index} className="text-sm inline-flex items-center bg-muted px-2 py-1 rounded">
                          {child.name} ({child.grade})
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="children">
          <Card>
            <CardHeader>
              <CardTitle>My Children</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {children.map((child, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{child.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{child.name}</h3>
                          <p className="text-sm text-muted-foreground">{child.grade}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                    <div className="bg-muted/30 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">School</p>
                        <p className="text-sm text-muted-foreground">{child.school}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Student ID</p>
                        <p className="text-sm text-muted-foreground">STU-{Math.floor(10000 + Math.random() * 90000)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Homeroom Teacher</p>
                        <p className="text-sm text-muted-foreground">{index === 0 ? "Dr. Nguyen" : "Mrs. Johnson"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Counselor</p>
                        <p className="text-sm text-muted-foreground">{index === 0 ? "Mr. Rodriguez" : "Ms. Chen"}</p>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Recent Activity</h4>
                        <p className="text-xs text-muted-foreground">Last check-in: {index === 0 ? "Today, 10:15 AM" : "Yesterday, 2:30 PM"}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Progress</Button>
                        <Button size="sm">Schedule Meeting</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailAlerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive important notifications via email</p>
                  </div>
                  <Switch
                    id="emailAlerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={() => handleNotificationChange('emailAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="behavioralUpdates">Behavioral Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about behavioral changes or concerns</p>
                  </div>
                  <Switch
                    id="behavioralUpdates"
                    checked={notificationSettings.behavioralUpdates}
                    onCheckedChange={() => handleNotificationChange('behavioralUpdates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="academicUpdates">Academic Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates on grades and assignments</p>
                  </div>
                  <Switch
                    id="academicUpdates"
                    checked={notificationSettings.academicUpdates}
                    onCheckedChange={() => handleNotificationChange('academicUpdates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emergencyNotifications">Emergency Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive critical emergency alerts (cannot be disabled)</p>
                  </div>
                  <Switch
                    id="emergencyNotifications"
                    checked={notificationSettings.emergencyNotifications}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyReports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get a weekly summary of your child's progress</p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={() => handleNotificationChange('weeklyReports')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="schoolEvents">School Events</Label>
                    <p className="text-sm text-muted-foreground">Notifications about upcoming school events</p>
                  </div>
                  <Switch
                    id="schoolEvents"
                    checked={notificationSettings.schoolEvents}
                    onCheckedChange={() => handleNotificationChange('schoolEvents')}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Communication History
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Weekly Progress Report</p>
                        <p className="text-xs text-muted-foreground">Apr 26, 2025</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Sent via email</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Parent-Teacher Conference Reminder</p>
                        <p className="text-xs text-muted-foreground">Apr 20, 2025</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Sent via email and SMS</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">Behavior Alert: Positive Recognition</p>
                        <p className="text-xs text-muted-foreground">Apr 18, 2025</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Sent via email</p>
                    </div>
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

export default ParentProfileContent;
