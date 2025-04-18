
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NewsCategoriesProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const NewsCategories = ({ categories, activeCategory, setActiveCategory }: NewsCategoriesProps) => {
  return (
    <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory}>
      <TabsList className="mb-4 flex flex-wrap overflow-auto">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="capitalize">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
