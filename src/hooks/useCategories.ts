
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import toolsData from '@/data/toolsData';

export interface Category {
  id: string;
  name: string;
  description: string;
  tool_count: number;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        // Extract unique categories from toolsData and count tools
        const categoryMap = new Map<string, number>();
        
        toolsData.forEach(tool => {
          const count = categoryMap.get(tool.category) || 0;
          categoryMap.set(tool.category, count + 1);
        });

        const categoriesArray: Category[] = Array.from(categoryMap.entries()).map(([name, count]) => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          description: `Discover ${count} AI tools in ${name}`,
          tool_count: count
        }));

        // Sort by tool count (most popular first)
        categoriesArray.sort((a, b) => b.tool_count - a.tool_count);

        setCategories(categoriesArray);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        
        // Fallback categories
        const fallbackCategories = [
          { id: 'text-generation', name: 'Text Generation', description: 'AI writing and content tools', tool_count: 10 },
          { id: 'image-generation', name: 'Image Generation', description: 'AI art and image creation', tool_count: 8 },
          { id: 'code-assistance', name: 'Code Assistance', description: 'AI coding and development tools', tool_count: 7 },
          { id: 'video-generation', name: 'Video Generation', description: 'AI video creation and editing', tool_count: 6 }
        ];
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
