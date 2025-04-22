
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface StudentSearchSectionProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StudentSearchSection: React.FC<StudentSearchSectionProps> = ({ onChange }) => (
  <div className="flex items-center justify-between">
    <h3 className="text-xl font-heading font-bold">Students</h3>
    <div className="relative w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search students..."
        className="pl-8"
        onChange={onChange}
      />
    </div>
  </div>
);

