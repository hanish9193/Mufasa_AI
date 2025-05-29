
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, Grid2X2, LayoutList, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ToolCard from "@/components/cards/ToolCard";
import FilterSidebar, { FilterState } from "@/components/search/FilterSidebar";
import MainLayout from "@/components/layout/MainLayout";
import { useTools, DatabaseTool } from "@/hooks/useTools";

type ViewMode = "grid" | "list";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minRating: 0,
    priceModels: [],
    sortBy: "rating"
  });

  const { tools, loading, error } = useTools({
    searchQuery: query,
    categoryFilter: filters.categories[0] || '',
    pricingFilter: filters.priceModels,
    minRating: filters.minRating,
    sortBy: filters.sortBy
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newQuery = formData.get("search") as string;
    
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    }
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      minRating: 0,
      priceModels: [],
      sortBy: "rating"
    });
  };

  // Convert DatabaseTool to Tool interface for ToolCard
  const convertToToolCard = (dbTool: DatabaseTool) => ({
    id: dbTool.tool_id,
    name: dbTool.tool_name,
    description: dbTool.tool_description,
    logo: dbTool.tool_logo_url || `https://placehold.co/200x200/8b5cf6/FFFFFF?text=${dbTool.tool_name.charAt(0)}`,
    category: dbTool.category_name,
    tags: dbTool.tags,
    rating: dbTool.tool_rating,
    priceModel: dbTool.tool_pricing_model,
    url: dbTool.tool_website_url,
    trending: dbTool.tool_is_trending
  });

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">Error loading tools: {error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center gap-2 max-w-2xl mx-auto">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                type="text"
                name="search"
                defaultValue={query}
                placeholder="Search for AI tools, categories, or tasks..."
                className="pl-12 py-6 pr-4 text-base w-full"
              />
            </div>
            <Button type="submit" size="lg" className="px-8 py-6 text-base">
              Search
            </Button>
          </div>
        </form>

        {/* Results Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              filters={filters} 
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          {/* Results Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {query ? `Results for "${query}"` : "All AI Tools"}
                {!loading && <span className="text-base font-normal text-muted-foreground ml-2">({tools.length})</span>}
              </h2>
              
              {/* View Toggle */}
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid2X2 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <LayoutList className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Finding the best AI tools for you...</p>
              </div>
            ) : tools.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'}`}>
                {tools.map((tool) => (
                  <Link to={`/tool/${tool.tool_id}`} key={tool.tool_id} className="block transition-opacity hover:opacity-95">
                    <ToolCard tool={convertToToolCard(tool)} />
                  </Link>
                ))}
              </div>
            ) : (
              // No Results State
              <div className="text-center py-16 border rounded-lg bg-card">
                <h3 className="text-xl font-bold mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any AI tools matching your search.
                </p>
                <div className="space-y-3 max-w-md mx-auto">
                  <p className="text-sm font-medium">Try:</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Using more general keywords</li>
                    <li>• Checking for spelling errors</li>
                    <li>• Removing some filters</li>
                    <li>• Searching by a different category</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
