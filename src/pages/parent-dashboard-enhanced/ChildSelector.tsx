
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";

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
  const children = user?.children || [];

  return (
    <Select value={selectedChild} onValueChange={onChange}>
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
