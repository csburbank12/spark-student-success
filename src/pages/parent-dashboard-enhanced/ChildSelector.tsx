
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export interface Child {
  id: string;
  name: string;
  grade: string;
  status: string;
}

interface ChildSelectorProps {
  selectedChild: string;
  onChange: (childId: string) => void;
  childrenList: any[];
}

const ChildSelector = ({ selectedChild, onChange, childrenList }: ChildSelectorProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const children = user?.children || [];

  const handleChildChange = (childId: string) => {
    // Update the selected child
    onChange(childId);
    
    // Ensure navigation doesn't break after selection
    // We're staying on the same page but with updated child data
    navigate(`/parent-dashboard-enhanced?child=${childId}`, { replace: true });
  };

  return (
    <Select value={selectedChild} onValueChange={handleChildChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select child" />
      </SelectTrigger>
      <SelectContent>
        {children.map((child) => (
          <SelectItem key={child.id} value={child.id}>
            {child.name} - {child.grade}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChildSelector;
