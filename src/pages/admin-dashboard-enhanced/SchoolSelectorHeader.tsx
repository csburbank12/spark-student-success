
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

export interface SchoolData {
  id: string;
  name: string;
}

interface SchoolSelectorHeaderProps {
  mockSchools: SchoolData[];
  selectedSchool: string;
  setSelectedSchool: (id: string) => void;
}

const SchoolSelectorHeader: React.FC<SchoolSelectorHeaderProps> = ({
  mockSchools,
  selectedSchool,
  setSelectedSchool,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-heading font-bold">Admin Dashboard</h2>
      <div className="flex items-center gap-2">
        <Select value={selectedSchool} onValueChange={setSelectedSchool}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select School" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schools</SelectItem>
            {mockSchools.map((school) => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline">
          <School className="mr-2 h-4 w-4" />
          Manage Schools
        </Button>
      </div>
    </div>
  );
};

export default SchoolSelectorHeader;

