
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Users, 
  UserCircle, 
  UserPlus, 
  Settings, 
  Activity,
  Filter,
  EyeOff
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { Link } from "react-router-dom";

// Mock data for profiles
const profilesData = [
  { 
    id: "p1", 
    name: "Alex Johnson", 
    role: "Student", 
    grade: "9th",
    avatar: "AJ", 
    status: "active",
    wellLensAccess: true,
    lastActive: "Today, 10:45 AM" 
  },
  { 
    id: "p2", 
    name: "Jamie Smith", 
    role: "Student", 
    grade: "10th",
    avatar: "JS", 
    status: "inactive",
    wellLensAccess: false,
    lastActive: "Yesterday, 3:20 PM" 
  },
  { 
    id: "p3", 
    name: "Casey Williams", 
    role: "Teacher", 
    department: "Mathematics",
    avatar: "CW", 
    status: "active",
    wellLensAccess: true,
    lastActive: "Today, 9:15 AM" 
  },
  { 
    id: "p4", 
    name: "Morgan Lee", 
    role: "Parent", 
    children: "Alex Johnson",
    avatar: "ML", 
    status: "active",
    wellLensAccess: true,
    lastActive: "Today, 8:30 AM" 
  }
];

const Profiles = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const isAdmin = user?.role === UserRole.admin;
  
  // Filter profiles based on search and role filter
  const filteredProfiles = profilesData.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || profile.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Universal Profiles</h2>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Add Profile</span>
            </Button>
          )}
          <Link to="/welllens">
            <Button variant="outline" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span>WellLens</span>
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Integration with WellLens™</CardTitle>
          <CardDescription>
            Access detailed user information and customize WellLens insights based on user profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Universal profiles work together with WellLens to create personalized experiences for each user type.
            By integrating profile data with predictive support, you can:
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>See relevant insights based on your role and permissions</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>Tailor interventions to specific student needs and profiles</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <span>Share and collaborate on wellness resources across roles</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search profiles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="teacher">Teachers</SelectItem>
              <SelectItem value="parent">Parents</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Profile List</TabsTrigger>
          <TabsTrigger value="wellLens">WellLens Access</TabsTrigger>
          <TabsTrigger value="settings">Integration Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {filteredProfiles.map(profile => (
              <Card key={profile.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">{profile.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{profile.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{profile.role}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {profile.grade || profile.department || profile.children}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <div className={`flex items-center gap-1 ${profile.wellLensAccess ? 'text-green-600' : 'text-amber-600'}`}>
                        {profile.wellLensAccess ? (
                          <>
                            <Activity className="h-4 w-4" />
                            <span>WellLens Enabled</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4" />
                            <span>No WellLens Access</span>
                          </>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Last active: {profile.lastActive}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wellLens">
          <Card>
            <CardHeader>
              <CardTitle>WellLens Access Management</CardTitle>
              <CardDescription>Control who can access WellLens features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2">Access by Role</h3>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {['Admin', 'Teacher', 'Student', 'Parent'].map(role => (
                      <div key={role} className="flex items-center justify-between p-3 border rounded-md bg-card">
                        <span>{role}s</span>
                        <Badge variant={role === 'Student' ? 'outline' : 'default'}>
                          {role === 'Student' ? 'Limited' : 'Full'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">WellLens Feature Access</h3>
                  <table className="w-full">
                    <thead className="text-left text-xs border-b">
                      <tr>
                        <th className="pb-2 font-medium">Feature</th>
                        <th className="pb-2 font-medium">Admin</th>
                        <th className="pb-2 font-medium">Teacher</th>
                        <th className="pb-2 font-medium">Student</th>
                        <th className="pb-2 font-medium">Parent</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="py-2">Predictive Analysis</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td className="py-2">Emotional Scheduling</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td className="py-2">Intervention Management</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <td className="py-2">Wellness Trends</td>
                        <td>✓</td>
                        <td>✓</td>
                        <td>Limited</td>
                        <td>✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Configure how profiles integrate with WellLens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Data Sharing</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure what profile data is shared with WellLens for analysis
                  </p>
                  <Button className="w-full" variant="outline">Configure Data Sharing</Button>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage privacy settings for WellLens integrations
                  </p>
                  <Button className="w-full" variant="outline">Manage Privacy</Button>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Default Permissions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set default permissions for new user profiles
                  </p>
                  <Button className="w-full" variant="outline">Configure Permissions</Button>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Integration History</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    View history of profile and WellLens interactions
                  </p>
                  <Button className="w-full" variant="outline">View History</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profiles;
