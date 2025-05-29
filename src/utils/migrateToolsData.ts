
import { supabase } from '@/integrations/supabase/client';
import toolsData from '@/data/toolsData';

export const migrateToolsToDatabase = async () => {
  try {
    console.log('Starting migration of tools data to database...');

    for (const tool of toolsData) {
      // First, find or create the category
      let { data: category, error: categoryError } = await (supabase as any)
        .from('categories')
        .select('id')
        .eq('name', tool.category)
        .single();

      if (categoryError && categoryError.code === 'PGRST116') {
        // Category doesn't exist, create it
        const { data: newCategory, error: createCategoryError } = await (supabase as any)
          .from('categories')
          .insert([{
            name: tool.category,
            description: `AI tools for ${tool.category.toLowerCase()}`,
          }])
          .select()
          .single();

        if (createCategoryError) {
          console.error('Error creating category:', createCategoryError);
          continue;
        }
        category = newCategory;
      }

      if (!category) {
        console.error('Could not find or create category for:', tool.category);
        continue;
      }

      // Insert the tool
      const { data: insertedTool, error: toolError } = await (supabase as any)
        .from('ai_tools')
        .insert([{
          id: tool.id,
          name: tool.name,
          description: tool.description,
          logo_url: tool.logo || null,
          website_url: tool.url,
          category_id: category.id,
          rating: tool.rating,
          pricing_model: tool.priceModel,
          is_trending: tool.trending || false,
        }])
        .select()
        .single();

      if (toolError) {
        console.error('Error inserting tool:', tool.name, toolError);
        continue;
      }

      // Insert tags
      for (const tagName of tool.tags) {
        // Find or create tag
        let { data: tag, error: tagError } = await (supabase as any)
          .from('tags')
          .select('id')
          .eq('name', tagName)
          .single();

        if (tagError && tagError.code === 'PGRST116') {
          const { data: newTag, error: createTagError } = await (supabase as any)
            .from('tags')
            .insert([{ name: tagName }])
            .select()
            .single();

          if (createTagError) {
            console.error('Error creating tag:', createTagError);
            continue;
          }
          tag = newTag;
        }

        if (tag) {
          // Link tool to tag
          const { error: linkError } = await (supabase as any)
            .from('tool_tags')
            .insert([{
              tool_id: insertedTool.id,
              tag_id: tag.id,
            }]);

          if (linkError) {
            console.error('Error linking tool to tag:', linkError);
          }
        }
      }

      console.log('Successfully migrated:', tool.name);
    }

    console.log('Migration completed successfully!');
    return { success: true, message: 'All tools migrated successfully!' };
  } catch (error) {
    console.error('Migration failed:', error);
    return { success: false, message: 'Migration failed', error };
  }
};
