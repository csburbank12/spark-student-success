
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Child {
  id: string;
  name: string;
}

interface ChildSelectorProps {
  childrenList: Child[];
  selectedChild: string;
  onChange: (id: string) => void;
}

const ChildSelector: React.FC<ChildSelectorProps> = ({
  childrenList, selectedChild, onChange
}) => {
  if (childrenList.length <= 1) return null;
  return (
    <Select value={selectedChild} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select child" />
      </SelectTrigger>
      <SelectContent>
        {childrenList.map(child => (
          <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChildSelector;
