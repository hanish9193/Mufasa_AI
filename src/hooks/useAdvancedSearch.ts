import { useState, useMemo } from 'react';
import { DatabaseTool } from './useTools';

export interface AdvancedSearchFilters {
  searchQuery: string;
  categories: string[];
  priceModels: string[];
  minRating: number;
  maxRating: number;
  trending: boolean | null;
  sortBy: 'rating' | 'newest' | 'popular' | 'alphabetical';
  tags: string[];
}

export const useAdvancedSearch = (tools: DatabaseTool[]) => {
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    searchQuery: '',
    categories: [],
    priceModels: [],
    minRating: 0,
    maxRating: 5,
    trending: null,
    sortBy: 'rating',
    tags: []
  });

  const availableTags = useMemo(() => {
    const allTags = tools.flatMap(tool => tool.tags);
    return [...new Set(allTags)].sort();
  }, [tools]);

  const availableCategories = useMemo(() => {
    const allCategories = tools.map(tool => tool.category_name);
    return [...new Set(allCategories)].sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.tool_name.toLowerCase().includes(query) ||
        tool.tool_description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query)) ||
        tool.category_name.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(tool => 
        filters.categories.includes(tool.category_name)
      );
    }

    // Price model filter
    if (filters.priceModels.length > 0) {
      filtered = filtered.filter(tool => 
        filters.priceModels.includes(tool.tool_pricing_model)
      );
    }

    // Rating range filter
    filtered = filtered.filter(tool => 
      tool.tool_rating >= filters.minRating && tool.tool_rating <= filters.maxRating
    );

    // Trending filter
    if (filters.trending !== null) {
      filtered = filtered.filter(tool => tool.tool_is_trending === filters.trending);
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(tool =>
        filters.tags.some(tag => tool.tags.includes(tag))
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'alphabetical':
        filtered.sort((a, b) => a.tool_name.localeCompare(b.tool_name));
        break;
      case 'newest':
        // Keep original order for newest
        break;
      case 'popular':
        filtered.sort((a, b) => {
          if (a.tool_is_trending && !b.tool_is_trending) return -1;
          if (!a.tool_is_trending && b.tool_is_trending) return 1;
          return b.tool_rating - a.tool_rating;
        });
        break;
      default: // rating
        filtered.sort((a, b) => b.tool_rating - a.tool_rating);
    }

    return filtered;
  }, [tools, filters]);

  const updateFilters = (newFilters: Partial<AdvancedSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      priceModels: [],
      minRating: 0,
      maxRating: 5,
      trending: null,
      sortBy: 'rating',
      tags: []
    });
  };

  return {
    filters,
    filteredTools,
    updateFilters,
    clearFilters,
    availableTags,
    availableCategories
  };
};
