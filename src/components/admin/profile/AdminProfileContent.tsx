
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
import { Shield, Key, Settings, Users, School, BellRing } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminProfileProps {
  user: User;
}

const AdminProfileContent: React.FC<AdminProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "Alex Rodriguez",
    email: user.email || "rodriguez@district.edu",
    title: "District Technology Administrator",
    phone: "(555) 987-6543",
    location: "District Office",
    bio: "Responsible for overseeing educational technology implementation and security across all district schools.",
    accessLevel: "Super Admin",
    joinedDate: "January 15, 2022",
    department: "Information Technology"
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
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-32"></div>
        <CardContent className="-mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-xl bg-indigo-100 text-indigo-800">{initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <Badge variant="default" className="bg-purple-600">Admin</Badge>
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
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
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
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" value={profileData.department} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" value={profileData.location} onChange={handleChange} />
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
                      <p className="text-sm font-medium text-muted-foreground">Title</p>
                      <p>{profileData.title}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Department</p>
                      <p>{profileData.department}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p>{profileData.location}</p>
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
              <CardTitle>Admin Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start p-4 rounded-lg border">
                  <Shield className="h-8 w-8 text-purple-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Access Level</h4>
                    <p className="text-sm text-muted-foreground">{profileData.accessLevel}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Key className="h-8 w-8 text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Security Clearance</h4>
                    <p className="text-sm text-muted-foreground">Level 3 (Highest)</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <School className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Schools Managed</h4>
                    <p className="text-sm text-muted-foreground">All District Schools (5)</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Users className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Joined Date</h4>
                    <p className="text-sm text-muted-foreground">{profileData.joinedDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>System Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>User Management</span>
                  </div>
                  <Badge className="bg-green-600">Full Access</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <School className="h-5 w-5 text-muted-foreground" />
                    <span>School Management</span>
                  </div>
                  <Badge className="bg-green-600">Full Access</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <span>System Configuration</span>
                  </div>
                  <Badge className="bg-green-600">Full Access</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span>Data Compliance</span>
                  </div>
                  <Badge className="bg-green-600">Full Access</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-muted-foreground" />
                    <span>Notifications</span>
                  </div>
                  <Badge className="bg-green-600">Full Access</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Updated system settings",
                    timestamp: "Today, 10:23 AM",
                    details: "Changed notification settings for all users"
                  },
                  {
                    action: "Added new school",
                    timestamp: "Yesterday, 2:45 PM",
                    details: "Added Westside Elementary School to the system"
                  },
                  {
                    action: "Modified user permissions",
                    timestamp: "Apr 26, 2025, 11:30 AM",
                    details: "Updated permissions for teacher accounts"
                  },
                  {
                    action: "System backup",
                    timestamp: "Apr 25, 2025, 9:00 AM",
                    details: "Performed scheduled system data backup"
                  },
                  {
                    action: "Security audit",
                    timestamp: "Apr 24, 2025, 3:15 PM",
                    details: "Completed quarterly security compliance audit"
                  }
                ].map((item, index) => (
                  <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProfileContent;
