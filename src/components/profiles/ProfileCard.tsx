
import React from "react";
import { Activity, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    role: string;
    grade?: string;
    department?: string;
    children?: string;
    avatar: string;
    status: string;
    wellLensAccess: boolean;
    lastActive: string;
  };
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
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
  );
};
