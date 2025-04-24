
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/roles";

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, role, avatarUrl }) => {
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

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="text-lg">
          {name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-xl font-medium">{name}</h3>
        <p className="text-muted-foreground">{email}</p>
        <div className="mt-2">
          <Badge className={`${getRoleColor(role)} capitalize`}>
            {role}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
