
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface NewsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const NewsSearch = ({ searchQuery, setSearchQuery }: NewsSearchProps) => {
  return (
    <div className="relative w-full md:w-1/2 mb-4">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
      <Input 
        className="pl-10" 
        placeholder="Search news articles..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
