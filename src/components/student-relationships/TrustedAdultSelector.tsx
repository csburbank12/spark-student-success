import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTrustedAdults, TrustedAdult } from "@/hooks/useTrustedAdults";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "@/components/ui/loader";

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
  onSelectionsChange?: (selections: StaffMember[]) => void;
}

const TrustedAdultSelector: React.FC<TrustedAdultSelectorProps> = ({
  studentId,
  maxSelections = 3,
  onSelectionsChange
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isLoadingStaff, setIsLoadingStaff] = useState(true);
  const { toast } = useToast();
  const { 
    trustedAdults, 
    isLoading, 
    addTrustedAdult, 
    removeTrustedAdult 
  } = useTrustedAdults(studentId);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('staff_members')
          .select(`
            id,
            position,
            department,
            profiles:user_id (
              first_name,
              last_name,
              avatar_url
            )
          `);

        if (error) throw error;

        const formattedStaff = (data || []).map((staff: any) => ({
          id: staff.id,
          name: `${staff.profiles?.first_name || ''} ${staff.profiles?.last_name || ''}`.trim(),
          role: staff.position || 'Staff Member',
          department: staff.department,
          avatarUrl: staff.profiles?.avatar_url
        }));

        setStaffMembers(formattedStaff);
        setIsLoadingStaff(false);
      } catch (error) {
        console.error('Error fetching staff members:', error);
        toast({
          title: "Error",
          description: "Could not load staff members. Using demo data instead.",
          variant: "destructive"
        });
        setStaffMembers([
          { id: "s1", name: "Dr. Emma Wilson", role: "School Counselor", avatarUrl: "" },
          { id: "s2", name: "Mr. James Rodriguez", role: "Math Teacher", department: "Mathematics", avatarUrl: "" },
          { id: "s3", name: "Ms. Sarah Chen", role: "Social Worker", avatarUrl: "" },
          { id: "s4", name: "Mr. David Johnson", role: "English Teacher", department: "English", avatarUrl: "" },
          { id: "s5", name: "Dr. Michael Brown", role: "School Psychologist", avatarUrl: "" },
          { id: "s6", name: "Mrs. Jennifer Lee", role: "Vice Principal", avatarUrl: "" },
        ]);
        setIsLoadingStaff(false);
      }
    };

    fetchStaffMembers();
  }, [toast]);

  const handleSelectStaff = async (staffMember: StaffMember) => {
    if (trustedAdults.length >= maxSelections) {
      toast({
        title: "Maximum selections reached",
        description: `You can only select up to ${maxSelections} trusted adults.`,
        variant: "destructive"
      });
      return;
    }

    if (trustedAdults.some(staff => staff.staff_id === staffMember.id)) {
      return;
    }

    await addTrustedAdult(staffMember.id);

    if (onSelectionsChange) {
      onSelectionsChange([...trustedAdults.map(ta => ({
        id: ta.staff_id,
        name: ta.staff_name,
        role: ta.staff_role,
        avatarUrl: ta.avatarUrl
      })), staffMember]);
    }
  };

  const handleRemoveStaff = async (staff: any) => {
    const trustedAdultToRemove = trustedAdults.find(adult => adult.staff_id === staff.id);
    if (trustedAdultToRemove) {
      await removeTrustedAdult(trustedAdultToRemove.id);
    }
    if (onSelectionsChange) {
      onSelectionsChange(trustedAdults.filter(s => s.staff_id !== staff.id).map(ta => ({
        id: ta.staff_id,
        name: ta.staff_name,
        role: ta.staff_role,
        avatarUrl: ta.avatarUrl
      })));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Trusted Adults</CardTitle>
        <CardDescription>
          Select up to {maxSelections} staff members you feel comfortable talking to when you need support.
          {trustedAdults.length > 0 && (
            <div className="mt-2 text-sm">
              You have selected {trustedAdults.length} of {maxSelections} trusted adults.
            </div>
          )}
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

          {(isLoading || isLoadingStaff) ? (
            <div className="flex justify-center py-8">
              <Loader size="lg" />
            </div>
          ) : (
            <>
              {trustedAdults.length > 0 && (
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
                          onClick={() => handleRemoveStaff({ id: staff.staff_id })}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Available staff:</h4>
                <div className="grid gap-2">
                  {staffMembers
                    .filter(staff => !trustedAdults.some(s => s.staff_id === staff.id))
                    .filter(staff => 
                      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (staff.department && staff.department.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map(staff => (
                      <div 
                        key={staff.id}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => handleSelectStaff(staff)}
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
                  {staffMembers
                    .filter(staff => !trustedAdults.some(s => s.staff_id === staff.id))
                    .filter(staff => 
                      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (staff.department && staff.department.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).length === 0 && (
                    <p className="text-center py-4 text-muted-foreground">No staff members found</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustedAdultSelector;
