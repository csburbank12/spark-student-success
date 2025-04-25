
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <form className="hidden md:block relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background/60 pl-8 pr-4 border-primary/20 hover:border-primary/30 focus:border-primary/40 transition-colors backdrop-blur-sm"
      />
    </form>
  );
};

export default SearchBar;
