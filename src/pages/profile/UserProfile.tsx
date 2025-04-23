
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { UserRole } from '@/types/roles';
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import AdminProfile from "./AdminProfile";
import ParentProfile from "./ParentProfile";
import { Loader } from "@/components/ui/loader";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Not logged in</h3>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to view your profile.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically update the user profile
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    const userRole = role as UserRole;
    switch (userRole) {
      case UserRole.student:
        return "bg-blue-100 text-blue-800";
      case UserRole.teacher:
        return "bg-green-100 text-green-800";
      case UserRole.admin:
        return "bg-purple-100 text-purple-800";
      case UserRole.parent:
        return "bg-amber-100 text-amber-800";
      case UserRole.staff:
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProfileComponent = () => {
    const userRole = user?.role as UserRole;
    switch (userRole) {
      case UserRole.student:
        return <StudentProfile user={user} />;
      case UserRole.teacher:
      case UserRole.staff:
        return <TeacherProfile user={user} />;
      case UserRole.admin:
        return <AdminProfile user={user} />;
      case UserRole.parent:
        return <ParentProfile user={user} />;
      default:
        return <div>Unknown role: {user?.role}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">User Profile</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-lg">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-medium">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="mt-2">
                  <Badge className={`${getRoleColor(user?.role)} capitalize`}>
                    {user?.role}
                  </Badge>
                </div>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Save Changes</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Profile
              </Button>
            )}

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium">App Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive in-app notifications and alerts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role-Specific Information</CardTitle>
              <CardDescription>
                Information and settings specific to your role as a {user?.role}
              </CardDescription>
            </CardHeader>
            <CardContent>{getProfileComponent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
