
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface StaffSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const StaffSearch = ({ value, onChange }: StaffSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search staff by name or role..."
        className="pl-9"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default StaffSearch;
