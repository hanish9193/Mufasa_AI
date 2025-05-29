
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CategoryCard from "@/components/cards/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { getCategoryIcon, formatCategoryId } from "@/utils/categoryIcons";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { categories, loading, error } = useCategories();
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-red-500">Error loading categories: {error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-12 text-center fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 gradient-heading">Explore AI Tools</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover cutting-edge AI solutions organized by category to enhance your workflow and creativity.
          </p>
        </div>
        
        <div className="max-w-md mx-auto mb-12 glass-shine">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input py-6 pr-4"
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/5 to-transparent animate-glass-shine" style={{ backgroundSize: '200% 100%' }}></div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="glass-card h-32 w-full rounded-xl animate-pulse-light"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <div key={category.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CategoryCard 
                    key={category.id} 
                    category={{
                      id: formatCategoryId(category.name),
                      name: category.name,
                      icon: getCategoryIcon(category.name),
                      count: category.tool_count
                    }} 
                  />
                </div>
              ))}
            </div>
            
            {filteredCategories.length === 0 && (
              <div className="text-center py-12 glass-card p-8 fade-in">
                <p className="text-muted-foreground">No categories found matching "{searchQuery}"</p>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Categories;
