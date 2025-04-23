
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { TrustedAdult } from "@/hooks/useTrustedAdults";

interface SelectedTrustedAdultsProps {
  trustedAdults: TrustedAdult[];
  onRemove: (staffId: string) => void;
}

const SelectedTrustedAdults = ({ trustedAdults, onRemove }: SelectedTrustedAdultsProps) => {
  if (trustedAdults.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Your trusted adults:</h4>
      <div className="flex flex-wrap gap-2">
        {trustedAdults.map(staff => (
          <Badge 
            key={staff.id} 
            variant="secondary"
            className="flex items-center gap-1 pl-1 pr-2 py-1"
          >
            <Avatar className="h-6 w-6">
              {staff.avatarUrl ? (
                <AvatarImage src={staff.avatarUrl} />
              ) : (
                <AvatarFallback>{staff.staff_name.substring(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm">{staff.staff_name}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 ml-1 hover:bg-muted rounded-full"
              onClick={() => onRemove(staff.staff_id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SelectedTrustedAdults;
