
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";

export type FilterState = {
  categories: string[];
  minRating: number;
  priceModels: string[];
  sortBy: "rating" | "newest" | "popular";
};

const CATEGORIES = [
  "Image Generation",
  "Text Generation",
  "Video Generation",
  "Audio",
  "Code",
  "Writing",
  "3D Design",
  "Developer Platform",
];

const PRICE_MODELS = ["Free", "Freemium", "Paid", "Enterprise"];

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters }: FilterSidebarProps) => {
  
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handlePriceModelChange = (priceModel: string, checked: boolean) => {
    const newPriceModels = checked
      ? [...filters.priceModels, priceModel]
      : filters.priceModels.filter((p) => p !== priceModel);
    
    onFiltersChange({
      ...filters,
      priceModels: newPriceModels,
    });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minRating: value[0],
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortBy: value as "rating" | "newest" | "popular",
    });
  };

  return (
    <div className="black-to-dark-card p-6 space-y-8 sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-light tracking-wide text-white">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-1"
        >
          <FilterX size={16} />
          <span className="text-sm">Clear All</span>
        </Button>
      </div>
      
      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-light text-gray-200 tracking-wide">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category, checked as boolean)
                }
                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label 
                htmlFor={`category-${category}`} 
                className="text-sm cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price */}
      <div className="space-y-3">
        <h3 className="font-light text-gray-200 tracking-wide">Price</h3>
        <div className="space-y-2">
          {PRICE_MODELS.map((priceModel) => (
            <div key={priceModel} className="flex items-center space-x-2">
              <Checkbox 
                id={`price-${priceModel}`}
                checked={filters.priceModels.includes(priceModel)}
                onCheckedChange={(checked) => 
                  handlePriceModelChange(priceModel, checked as boolean)
                }
                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label 
                htmlFor={`price-${priceModel}`} 
                className="text-sm cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                {priceModel}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Rating */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-light text-gray-200 tracking-wide">Minimum Rating</h3>
          <span className="text-sm font-medium text-white">{filters.minRating.toFixed(1)}</span>
        </div>
        <Slider 
          defaultValue={[filters.minRating]} 
          max={5} 
          min={0} 
          step={0.5}
          onValueChange={handleRatingChange}
          className="[&>.SliderTrack]:bg-white/20 [&>.SliderRange]:bg-white [&>.SliderThumb]:bg-white [&>.SliderThumb]:border-none"
        />
      </div>
      
      {/* Sort By */}
      <div className="space-y-3">
        <h3 className="font-light text-gray-200 tracking-wide">Sort By</h3>
        <RadioGroup 
          defaultValue={filters.sortBy}
          onValueChange={handleSortChange}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="rating" 
              id="sort-rating"
              className="border-white/30 text-white data-[state=checked]:bg-white data-[state=checked]:text-black" 
            />
            <Label 
              htmlFor="sort-rating" 
              className="text-sm cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              Highest Rated
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="newest" 
              id="sort-newest"
              className="border-white/30 text-white data-[state=checked]:bg-white data-[state=checked]:text-black" 
            />
            <Label 
              htmlFor="sort-newest" 
              className="text-sm cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              Newest
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="popular" 
              id="sort-popular"
              className="border-white/30 text-white data-[state=checked]:bg-white data-[state=checked]:text-black" 
            />
            <Label 
              htmlFor="sort-popular" 
              className="text-sm cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              Most Popular
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSidebar;
