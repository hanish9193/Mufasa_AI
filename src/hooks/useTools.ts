import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import toolsData from '@/data/toolsData';

export interface DatabaseTool {
  tool_id: string;
  tool_name: string;
  tool_description: string;
  tool_logo_url: string | null;
  tool_website_url: string;
  tool_rating: number;
  tool_pricing_model: 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
  tool_is_trending: boolean;
  category_name: string;
  tags: string[];
}

export interface UseToolsOptions {
  searchQuery?: string;
  categoryFilter?: string;
  pricingFilter?: string[];
  minRating?: number;
  sortBy?: 'rating' | 'newest' | 'popular';
  limit?: number;
}

// Helper function to convert toolsData to DatabaseTool format
const convertToDBFormat = (tools: any[]): DatabaseTool[] => {
  return tools.map(tool => ({
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
  }));
};

export const useTools = (options: UseToolsOptions = {}) => {
  const [tools, setTools] = useState<DatabaseTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from Supabase first, fallback to local data
        let filteredTools = toolsData;

        // Apply search filter
        if (options.searchQuery) {
          const query = options.searchQuery.toLowerCase();
          filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }

        // Apply category filter
        if (options.categoryFilter) {
          filteredTools = filteredTools.filter(tool => 
            tool.category.toLowerCase() === options.categoryFilter?.toLowerCase()
          );
        }

        // Apply pricing filter
        if (options.pricingFilter && options.pricingFilter.length > 0) {
          filteredTools = filteredTools.filter(tool => 
            options.pricingFilter?.includes(tool.priceModel)
          );
        }

        // Apply rating filter
        if (options.minRating && options.minRating > 0) {
          filteredTools = filteredTools.filter(tool => 
            tool.rating >= (options.minRating || 0)
          );
        }

        // Apply sorting
        switch (options.sortBy) {
          case 'newest':
            // For local data, we'll keep the original order which has newer tools first
            break;
          case 'popular':
            filteredTools.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
            break;
          default:
            filteredTools.sort((a, b) => b.rating - a.rating);
        }

        // Apply limit
        if (options.limit) {
          filteredTools = filteredTools.slice(0, options.limit);
        }

        setTools(convertToDBFormat(filteredTools));
      } catch (err) {
        console.error('Error fetching tools:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback to all tools data
        setTools(convertToDBFormat(toolsData));
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [
    options.searchQuery,
    options.categoryFilter,
    options.pricingFilter,
    options.minRating,
    options.sortBy,
    options.limit
  ]);

  return { tools, loading, error };
};

export const useTrendingTools = () => {
  const [tools, setTools] = useState<DatabaseTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingTools = async () => {
      try {
        setLoading(true);
        setError(null);

        // Filter trending tools from local data
        const trendingTools = toolsData
          .filter(tool => tool.trending)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 20);

        setTools(convertToDBFormat(trendingTools));
      } catch (err) {
        console.error('Error fetching trending tools:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback to some default trending tools
        const fallbackTrending = toolsData.slice(0, 10);
        setTools(convertToDBFormat(fallbackTrending));
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTools();
  }, []);

  return { tools, loading, error };
};
