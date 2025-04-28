
import React, { useState } from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { BookOpen, User as UserIcon, Target, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StudentProfileProps {
  user: User;
}

const StudentProfileContent: React.FC<StudentProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Jada Martinez",
    email: user?.email || "jada@school.edu",
    grade: "9th Grade",
    interests: "Art, Music, Biology",
    bio: "I love learning about science and expressing myself through art.",
    learningStyle: "Visual learner who enjoys group discussions",
    selStrengths: "Self-awareness, Relationship skills"
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

  // Sample SEL Domain data
  const selDomains = [
    { name: "Self-Awareness", value: 85 },
    { name: "Self-Management", value: 70 },
    { name: "Social Awareness", value: 80 },
    { name: "Relationship Skills", value: 90 },
    { name: "Responsible Decision Making", value: 75 }
  ];

  // Sample badges
  const badges = [
    { name: "Self-Reflection Master", description: "Completed 10 journal entries", date: "April 15, 2025" },
    { name: "Peer Support Star", description: "Sent 5 kindness notes to classmates", date: "April 10, 2025" },
    { name: "Growth Mindset", description: "Showed improvement in managing emotions", date: "April 5, 2025" }
  ];

  // Sample academic data
  const subjects = [
    { name: "Math", grade: "B+", teacher: "Dr. Nguyen" },
    { name: "Science", grade: "A", teacher: "Mrs. Johnson" },
    { name: "English", grade: "A-", teacher: "Mr. Williams" },
    { name: "History", grade: "B", teacher: "Ms. Garcia" },
    { name: "Art", grade: "A+", teacher: "Mrs. Roberts" }
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32"></div>
        <CardContent className="-mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-xl bg-indigo-100 text-indigo-800">{initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mb-2">
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.grade}</p>
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
          <TabsTrigger value="sel">SEL Progress</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
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
                      <Label htmlFor="grade">Grade</Label>
                      <Input id="grade" name="grade" value={profileData.grade} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests</Label>
                      <Input id="interests" name="interests" value={profileData.interests} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="learningStyle">Learning Style</Label>
                      <Input id="learningStyle" name="learningStyle" value={profileData.learningStyle} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="selStrengths">SEL Strengths</Label>
                      <Input id="selStrengths" name="selStrengths" value={profileData.selStrengths} onChange={handleChange} />
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
                      <p className="text-sm font-medium text-muted-foreground">Grade</p>
                      <p>{profileData.grade}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Interests</p>
                      <p>{profileData.interests}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Learning Style</p>
                      <p>{profileData.learningStyle}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">SEL Strengths</p>
                      <p>{profileData.selStrengths}</p>
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
              <CardTitle>Student Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start p-4 rounded-lg border">
                  <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Learning Style</h4>
                    <p className="text-sm text-muted-foreground">{profileData.learningStyle}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <UserIcon className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-medium">SEL Strengths</h4>
                    <p className="text-sm text-muted-foreground">{profileData.selStrengths}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Target className="h-8 w-8 text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Goals</h4>
                    <p className="text-sm text-muted-foreground">Improve math skills, Join art club</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Heart className="h-8 w-8 text-rose-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Support Needs</h4>
                    <p className="text-sm text-muted-foreground">Extra time for tests, Visual aids</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sel">
          <Card>
            <CardHeader>
              <CardTitle>Social-Emotional Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selDomains.map((domain, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{domain.name}</span>
                      <span className="text-sm text-muted-foreground">{domain.value}%</span>
                    </div>
                    <Progress 
                      value={domain.value} 
                      className={domain.value >= 80 
                        ? "bg-green-100" 
                        : domain.value >= 60 
                        ? "bg-amber-100" 
                        : "bg-red-100"}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {domain.value >= 80 
                        ? "Strong competency" 
                        : domain.value >= 60 
                        ? "Developing competency" 
                        : "Needs support"}
                    </p>
                  </div>
                ))}

                <div className="border-t mt-6 pt-6">
                  <h3 className="font-medium mb-2">Recent Reflections</h3>
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-1">I've been working on controlling my frustration when I don't understand something right away in math class.</p>
                      <p className="text-xs text-muted-foreground">April 15, 2025</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm mb-1">I helped a new student feel welcome by showing them around the school and including them at lunch.</p>
                      <p className="text-xs text-muted-foreground">April 10, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Current Courses</h3>
                  <div className="rounded-md border overflow-hidden">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Grade</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Teacher</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-border">
                        {subjects.map((subject, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{subject.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{subject.grade}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{subject.teacher}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Academic Goals</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <p>Improve math grade from B+ to A</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <p>Complete science project with distinction</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <p>Join the debate team</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Learning Accommodations</h3>
                  <p className="text-muted-foreground">Extra time on tests, Preferential seating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map((badge, index) => (
                  <div key={index} className="border rounded-lg p-4 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Badge className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium text-lg mb-1">{badge.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    <p className="text-xs text-muted-foreground">Earned on {badge.date}</p>
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

export default StudentProfileContent;
