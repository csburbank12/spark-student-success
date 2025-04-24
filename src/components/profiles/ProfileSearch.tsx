
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProfileSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const ProfileSearch = ({ searchQuery, setSearchQuery }: ProfileSearchProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search profiles..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
