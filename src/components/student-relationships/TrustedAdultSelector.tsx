
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserPlus, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  avatarUrl?: string;
}

interface TrustedAdultSelectorProps {
  studentId: string;
  maxSelections?: number;
  currentSelections?: StaffMember[];
  onSelectionsChange?: (selections: StaffMember[]) => void;
}

const TrustedAdultSelector: React.FC<TrustedAdultSelectorProps> = ({
  studentId,
  maxSelections = 3,
  currentSelections = [],
  onSelectionsChange
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember[]>(currentSelections);
  const { toast } = useToast();

  // Mock staff data - in a real app, this would come from an API call
  const staffMembers: StaffMember[] = [
    { id: "s1", name: "Dr. Emma Wilson", role: "School Counselor", avatarUrl: "" },
    { id: "s2", name: "Mr. James Rodriguez", role: "Math Teacher", department: "Mathematics", avatarUrl: "" },
    { id: "s3", name: "Ms. Sarah Chen", role: "Social Worker", avatarUrl: "" },
    { id: "s4", name: "Mr. David Johnson", role: "English Teacher", department: "English", avatarUrl: "" },
    { id: "s5", name: "Dr. Michael Brown", role: "School Psychologist", avatarUrl: "" },
    { id: "s6", name: "Mrs. Jennifer Lee", role: "Vice Principal", avatarUrl: "" },
  ];

  // Filter staff based on search query
  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (staff.department && staff.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectStaff = (staffMember: StaffMember) => {
    if (selectedStaff.length >= maxSelections) {
      toast({
        title: "Maximum selections reached",
        description: `You can only select up to ${maxSelections} trusted adults.`,
        variant: "destructive"
      });
      return;
    }

    if (selectedStaff.some(staff => staff.id === staffMember.id)) {
      return;
    }

    const newSelections = [...selectedStaff, staffMember];
    setSelectedStaff(newSelections);
    
    if (onSelectionsChange) {
      onSelectionsChange(newSelections);
    }

    toast({
      title: "Trusted adult added",
      description: `${staffMember.name} has been added to your trusted adults.`,
    });
  };

  const handleRemoveStaff = (staffId: string) => {
    const newSelections = selectedStaff.filter(staff => staff.id !== staffId);
    setSelectedStaff(newSelections);
    
    if (onSelectionsChange) {
      onSelectionsChange(newSelections);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Trusted Adults</CardTitle>
        <CardDescription>
          Select up to {maxSelections} staff members you feel comfortable talking to when you need support.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff by name or role..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Selected staff section */}
          {selectedStaff.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Your trusted adults:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStaff.map(staff => (
                  <Badge 
                    key={staff.id} 
                    variant="secondary"
                    className="flex items-center gap-1 pl-1 pr-2 py-1"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={staff.avatarUrl} />
                      <AvatarFallback>{staff.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{staff.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 ml-1 hover:bg-muted rounded-full"
                      onClick={() => handleRemoveStaff(staff.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Staff list */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Available staff:</h4>
            <div className="grid gap-2">
              {filteredStaff
                .filter(staff => !selectedStaff.some(s => s.id === staff.id))
                .map(staff => (
                  <div 
                    key={staff.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => handleSelectStaff(staff)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={staff.avatarUrl} />
                        <AvatarFallback>{staff.name.substring(0, 2)}</AvatarFallback>
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
              
              {filteredStaff.length === 0 && (
                <p className="text-center py-4 text-muted-foreground">No staff members found</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustedAdultSelector;
