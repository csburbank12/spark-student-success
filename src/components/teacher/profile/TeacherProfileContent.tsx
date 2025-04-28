
import React, { useState } from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import TeacherClassesCard from "./TeacherClassesCard";
import { BookOpen, GraduationCap, Calendar, Target } from "lucide-react";

interface TeacherProfileProps {
  user: User;
}

const TeacherProfileContent: React.FC<TeacherProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Dr. Nguyen",
    email: user?.email || "nguyen@school.edu",
    subject: "Mathematics",
    grade: "High School",
    room: "204",
    phone: "(555) 123-4567",
    bio: "Math teacher specialized in advanced mathematics and statistics with over 10 years of experience in secondary education.",
    education: "Ph.D. in Mathematics Education, University of California",
    teaching_style: "Interactive lectures with real-world applications"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-32"></div>
        <CardContent className="-mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-end">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-xl bg-blue-100 text-blue-800">{initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mb-2">
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.subject} Teacher</p>
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
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="methods">Teaching Methods</TabsTrigger>
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
                      <Label htmlFor="subject">Subject</Label>
                      <Select 
                        value={profileData.subject} 
                        onValueChange={(value) => handleSelectChange("subject", value)}
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Art">Art</SelectItem>
                          <SelectItem value="Music">Music</SelectItem>
                          <SelectItem value="Physical Education">Physical Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select 
                        value={profileData.grade} 
                        onValueChange={(value) => handleSelectChange("grade", value)}
                      >
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Elementary">Elementary School</SelectItem>
                          <SelectItem value="Middle">Middle School</SelectItem>
                          <SelectItem value="High School">High School</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="room">Room Number</Label>
                      <Input id="room" name="room" value={profileData.room} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input id="education" name="education" value={profileData.education} onChange={handleChange} />
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
                      <p className="text-sm font-medium text-muted-foreground">Education</p>
                      <p>{profileData.education}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Subject</p>
                      <p>{profileData.subject}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Grade Level</p>
                      <p>{profileData.grade}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Room</p>
                      <p>{profileData.room}</p>
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
              <CardTitle>Professional Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start p-4 rounded-lg border">
                  <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Teaching Subject</h4>
                    <p className="text-sm text-muted-foreground">{profileData.subject}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <GraduationCap className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-sm text-muted-foreground">{profileData.education}</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Calendar className="h-8 w-8 text-amber-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Teaching Experience</h4>
                    <p className="text-sm text-muted-foreground">10+ years</p>
                  </div>
                </div>
                <div className="flex items-start p-4 rounded-lg border">
                  <Target className="h-8 w-8 text-purple-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Teaching Style</h4>
                    <p className="text-sm text-muted-foreground">{profileData.teaching_style}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="classes">
          <TeacherClassesCard />
        </TabsContent>

        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Interactive Learning</h3>
                  <p className="text-muted-foreground">
                    I employ a variety of interactive teaching methods to engage students in mathematical concepts. 
                    This includes group problem-solving sessions, mathematical games, and technology-enhanced learning.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Real-world Applications</h3>
                  <p className="text-muted-foreground">
                    Mathematics comes alive when students see its relevance to their lives. I consistently incorporate 
                    real-world examples and applications in my lessons to help students appreciate the practical value 
                    of mathematical concepts.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Differentiated Instruction</h3>
                  <p className="text-muted-foreground">
                    Understanding that students learn at different paces and in different ways, I implement 
                    differentiated instruction strategies to ensure that all students can access and master the material 
                    according to their individual needs.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Data-Driven Assessment</h3>
                  <p className="text-muted-foreground">
                    I use formative and summative assessments to track student progress and adjust my teaching 
                    accordingly. Regular feedback helps students understand their strengths and areas for improvement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherProfileContent;
