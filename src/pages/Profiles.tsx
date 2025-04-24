import React, { useState } from "react";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { Link } from "react-router-dom";
import { ProfileSearch } from "@/components/profiles/ProfileSearch";
import { ProfileFilters } from "@/components/profiles/ProfileFilters";
import { ProfileList } from "@/components/profiles/ProfileList";

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
        <ProfileSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ProfileFilters filterRole={filterRole} setFilterRole={setFilterRole} />
      </div>

      <ProfileList profiles={filteredProfiles} />
    </div>
  );
};

export default Profiles;
