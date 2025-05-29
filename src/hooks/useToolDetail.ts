
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import toolsData from '@/data/toolsData';

export interface ToolDetail {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  website_url: string;
  rating: number;
  pricing_model: 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
  is_trending: boolean;
  category: string;
  tags: string[];
  features: string[];
  pricing_tiers: {
    tier_name: string;
    price: string;
    features: string[];
  }[];
  use_cases: string[];
  screenshots: string[];
  view_count: number;
  created_at: string;
}

export const useToolDetail = (toolId: string | undefined) => {
  const [tool, setTool] = useState<ToolDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!toolId) {
      setLoading(false);
      return;
    }

    const fetchToolDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Find tool in local data
        const foundTool = toolsData.find(t => t.id === toolId);
        
        if (!foundTool) {
          throw new Error('Tool not found');
        }

        // Generate some example features and use cases based on the tool
        const generateFeatures = (tool: any) => {
          const baseFeatures = [
            `${tool.priceModel} pricing model`,
            `Rated ${tool.rating}/5 by users`,
            `Category: ${tool.category}`
          ];
          
          if (tool.tags.includes('API')) baseFeatures.push('API access available');
          if (tool.tags.includes('Real-time')) baseFeatures.push('Real-time processing');
          if (tool.tags.includes('Multilingual')) baseFeatures.push('Multiple language support');
          if (tool.tags.includes('Enterprise')) baseFeatures.push('Enterprise-grade security');
          if (tool.tags.includes('Open Source')) baseFeatures.push('Open source and customizable');
          
          return baseFeatures;
        };

        const generateUseCases = (tool: any) => {
          const useCases = [];
          
          if (tool.category === 'Text Generation') {
            useCases.push('Content creation and copywriting', 'Blog post writing', 'Email drafting');
          } else if (tool.category === 'Image Generation') {
            useCases.push('Social media graphics', 'Marketing materials', 'Art and illustrations');
          } else if (tool.category === 'Code Assistance') {
            useCases.push('Code completion and suggestions', 'Bug fixing and debugging', 'Code documentation');
          } else if (tool.category === 'Video Generation') {
            useCases.push('Marketing videos', 'Educational content', 'Social media clips');
          } else {
            useCases.push(`${tool.category} tasks`, 'Productivity enhancement', 'Professional workflows');
          }
          
          return useCases;
        };

        const generatePricingTiers = (priceModel: string) => {
          if (priceModel === 'Free') {
            return [{
              tier_name: 'Free',
              price: '$0/month',
              features: ['Basic features', 'Limited usage', 'Community support']
            }];
          } else if (priceModel === 'Freemium') {
            return [
              {
                tier_name: 'Free',
                price: '$0/month',
                features: ['Basic features', 'Limited usage', 'Community support']
              },
              {
                tier_name: 'Pro',
                price: '$19/month',
                features: ['Advanced features', 'Higher usage limits', 'Priority support', 'API access']
              }
            ];
          } else if (priceModel === 'Paid') {
            return [{
              tier_name: 'Professional',
              price: '$29/month',
              features: ['Full feature access', 'Unlimited usage', 'Premium support', 'API access']
            }];
          } else {
            return [{
              tier_name: 'Enterprise',
              price: 'Custom pricing',
              features: ['Enterprise features', 'Custom integrations', 'Dedicated support', 'SLA guarantee']
            }];
          }
        };

        const formattedTool: ToolDetail = {
          id: foundTool.id,
          name: foundTool.name,
          description: foundTool.description,
          logo_url: foundTool.logo || `https://placehold.co/200x200/8b5cf6/FFFFFF?text=${foundTool.name.charAt(0)}`,
          website_url: foundTool.url,
          rating: foundTool.rating,
          pricing_model: foundTool.priceModel,
          is_trending: foundTool.trending || false,
          category: foundTool.category,
          tags: foundTool.tags,
          features: generateFeatures(foundTool),
          pricing_tiers: generatePricingTiers(foundTool.priceModel),
          use_cases: generateUseCases(foundTool),
          screenshots: [], // No screenshots in demo data
          view_count: Math.floor(Math.random() * 10000) + 1000, // Random view count for demo
          created_at: new Date().toISOString()
        };

        setTool(formattedTool);
      } catch (err) {
        console.error('Error fetching tool detail:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchToolDetail();
  }, [toolId]);

  return { tool, loading, error };
};
