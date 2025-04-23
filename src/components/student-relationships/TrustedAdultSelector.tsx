
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTrustedAdults } from "@/hooks/useTrustedAdults";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "@/components/ui/loader";
import StaffSearch from "./StaffSearch";
import StaffList from "./StaffList";
import SelectedTrustedAdults from "./SelectedTrustedAdults";

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
      } catch (error) {
        console.error('Error fetching staff members:', error);
        toast({
          title: "Error",
          description: "Could not load staff members.",
          variant: "destructive"
        });
      }
      setIsLoadingStaff(false);
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

  const handleRemoveStaff = async (staffId: string) => {
    const trustedAdultToRemove = trustedAdults.find(adult => adult.staff_id === staffId);
    if (trustedAdultToRemove) {
      await removeTrustedAdult(trustedAdultToRemove.id);
    }
    if (onSelectionsChange) {
      onSelectionsChange(trustedAdults.filter(s => s.staff_id !== staffId).map(ta => ({
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
          <StaffSearch 
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {(isLoading || isLoadingStaff) ? (
            <div className="flex justify-center py-8">
              <Loader size="lg" />
            </div>
          ) : (
            <>
              <SelectedTrustedAdults
                trustedAdults={trustedAdults}
                onRemove={handleRemoveStaff}
              />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Available staff:</h4>
                <StaffList
                  staffMembers={staffMembers}
                  searchQuery={searchQuery}
                  onSelect={handleSelectStaff}
                  selectedStaffIds={trustedAdults.map(ta => ta.staff_id)}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustedAdultSelector;
