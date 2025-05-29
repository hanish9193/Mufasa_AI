
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/cards/ToolCard";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Sparkles, Star, TrendingUp, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTrendingTools, DatabaseTool } from "@/hooks/useTools";

const timeFilters = ["Today", "This Week", "This Month", "All Time"];
const categoryFilters = ["All", "Image Generation", "Text Generation", "Video Generation", "Voice & Speech", "Code"];

const Trending = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTimeFilter, setActiveTimeFilter] = useState("This Week");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"rating" | "newest">("rating");
  const { toast } = useToast();
  
  const { tools, loading, error } = useTrendingTools();
  
  const handleSubscribe = () => {
    toast({
      title: "Subscribed to trending updates!",
      description: "You'll receive weekly updates about trending AI tools.",
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

  const filteredTools = tools
    .filter(tool => 
      tool.tool_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.tool_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(tool => activeCategoryFilter === "All" || tool.category_name === activeCategoryFilter)
    .sort((a, b) => {
      if (sortOrder === "rating") {
        return b.tool_rating - a.tool_rating;
      } else {
        return Math.random() - 0.5; // Random for demo since we don't have timestamps
      }
    });

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-red-500">Error loading trending tools: {error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-8 text-center fade-in scale-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <TrendingUp size={32} className="text-white" />
            <h1 className="text-3xl md:text-5xl font-bold text-gradient-white">Trending AI Tools</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and trending AI tools that everyone is talking about right now.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8 glass-card p-8 fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 glass-shine">
              <Input
                type="text"
                placeholder="Search trending tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input py-6"
              />
            </div>
            
            <div className="flex-shrink-0">
              <Button onClick={handleSubscribe} className="h-full w-full md:w-auto black-to-dark-card">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-white" />
                  <span>Subscribe to Updates</span>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {timeFilters.map((filter) => (
                <Badge 
                  key={filter}
                  onClick={() => setActiveTimeFilter(filter)}
                  className={`cursor-pointer ${
                    activeTimeFilter === filter 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {filter}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSortOrder("rating")}
                  className={sortOrder === "rating" ? "bg-gray-800 text-white" : "bg-transparent"}
                >
                  <Star size={14} className="mr-1" />
                  Rating
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSortOrder("newest")}
                  className={sortOrder === "newest" ? "bg-gray-800 text-white" : "bg-transparent"}
                >
                  <ArrowUp size={14} className="mr-1" />
                  Newest
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <Badge 
                key={filter}
                variant="outline"
                onClick={() => setActiveCategoryFilter(filter)}
                className={`cursor-pointer ${
                  activeCategoryFilter === filter 
                    ? 'border-white text-white' 
                    : 'border-gray-700 text-gray-400'
                }`}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Tool List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading trending AI tools...</p>
          </div>
        ) : (
          <>
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <div key={tool.tool_id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ToolCard tool={convertToToolCard(tool)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card p-8 fade-in">
                <p className="text-muted-foreground">No trending tools found matching your criteria</p>
              </div>
            )}
          </>
        )}
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="black-to-dark-card p-6 rounded-lg text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold mb-1 text-gradient-white">{tools.length}+</h3>
            <p className="text-muted-foreground text-sm">Trending Tools</p>
          </div>
          <div className="black-to-dark-card p-6 rounded-lg text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-2xl font-bold mb-1 text-gradient-white">15+</h3>
            <p className="text-muted-foreground text-sm">Categories</p>
          </div>
          <div className="black-to-dark-card p-6 rounded-lg text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-2xl font-bold mb-1 text-gradient-white">10k+</h3>
            <p className="text-muted-foreground text-sm">Monthly Users</p>
          </div>
          <div className="black-to-dark-card p-6 rounded-lg text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h3 className="text-2xl font-bold mb-1 text-gradient-white">Daily</h3>
            <p className="text-muted-foreground text-sm">Updates</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Trending;
