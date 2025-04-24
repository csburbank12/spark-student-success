import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Activity,
  Filter,
  EyeOff
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { Link } from "react-router-dom";

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
  
  const filteredProfiles = profilesData.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || profile.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Universal Profiles</h2>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button className="flex items-center gap-1">
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

      <div className="grid gap-4">
        {filteredProfiles.map(profile => (
          <Card key={profile.id} className="hover:bg-muted/50 transition-colors">
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
    </div>
  );
};

export default Profiles;
