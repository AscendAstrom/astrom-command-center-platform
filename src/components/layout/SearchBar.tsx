
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      onSearch?.(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search patients, rooms, data..."
        className="pl-10 bg-background/50"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        size="sm" 
        variant="ghost" 
        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
      >
        <Search className="h-3 w-3" />
      </Button>
    </form>
  );
};

export default SearchBar;
