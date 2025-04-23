
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  avatarUrl?: string;
}

interface StaffListProps {
  staffMembers: StaffMember[];
  searchQuery: string;
  onSelect: (staff: StaffMember) => void;
  selectedStaffIds: string[];
}

const StaffList = ({ staffMembers, searchQuery, onSelect, selectedStaffIds }: StaffListProps) => {
  const filteredStaff = staffMembers
    .filter(staff => !selectedStaffIds.includes(staff.id))
    .filter(staff => 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (staff.department && staff.department.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (filteredStaff.length === 0) {
    return <p className="text-center py-4 text-muted-foreground">No staff members found</p>;
  }

  return (
    <div className="grid gap-2">
      {filteredStaff.map(staff => (
        <div 
          key={staff.id}
          className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
          onClick={() => onSelect(staff)}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              {staff.avatarUrl ? (
                <AvatarImage src={staff.avatarUrl} />
              ) : (
                <AvatarFallback>{staff.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h4 className="text-sm font-medium">{staff.name}</h4>
              <p className="text-xs text-muted-foreground">
                {staff.role} {staff.department && `(${staff.department})`}
              </p>
            </div>
          </div>
          <Button size="sm" variant="ghost">
            <UserPlus className="h-4 w-4 mr-2" />
            Select
          </Button>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
