
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ToolCard from "@/components/cards/ToolCard";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { DatabaseTool } from "@/hooks/useTools";
import expandedToolsData from "@/data/expandedToolsData";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [favoriteTools, setFavoriteTools] = useState<DatabaseTool[]>([]);

  useEffect(() => {
    const tools = favorites
      .map(fav => {
        const tool = expandedToolsData.find(t => t.id === fav.toolId);
        if (tool) {
          return {
            tool_id: tool.id,
            tool_name: tool.name,
            tool_description: tool.description,
            tool_logo_url: tool.logo,
            tool_website_url: tool.url,
            tool_rating: tool.rating,
            tool_pricing_model: tool.priceModel,
            tool_is_trending: tool.trending || false,
            category_name: tool.category,
            tags: tool.tags
          } as DatabaseTool;
        }
        return null;
      })
      .filter(Boolean) as DatabaseTool[];
    
    setFavoriteTools(tools);
  }, [favorites]);

  const clearAllFavorites = () => {
    favorites.forEach(fav => removeFromFavorites(fav.toolId));
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="text-red-500 fill-red-500" size={32} />
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-white">
                Your Favorites
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Keep track of your favorite AI tools for quick access
            </p>
            {favorites.length > 0 && (
              <Button
                onClick={clearAllFavorites}
                variant="outline"
                className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={16} className="mr-2" />
                Clear All Favorites
              </Button>
            )}
          </div>

          {/* Content */}
          {favoriteTools.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="mx-auto mb-4 text-gray-600" size={64} />
              <h2 className="text-2xl font-light text-gray-400 mb-2">
                No favorites yet
              </h2>
              <p className="text-gray-500 mb-6">
                Start exploring AI tools and add them to your favorites by clicking the heart icon
              </p>
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <a href="/search">Explore Tools</a>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light text-white">
                  {favoriteTools.length} Favorite{favoriteTools.length !== 1 ? 's' : ''}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteTools.map((dbTool) => {
                  const tool = {
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
                  };

                  return (
                    <div key={tool.id} className="relative">
                      <ToolCard tool={tool} />
                      <div className="absolute top-4 right-4">
                        <FavoriteButton toolId={tool.id} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Favorites;
