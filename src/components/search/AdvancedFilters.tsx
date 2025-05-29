
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AdvancedSearchFilters } from "@/hooks/useAdvancedSearch";

interface AdvancedFiltersProps {
  filters: AdvancedSearchFilters;
  onFiltersChange: (filters: Partial<AdvancedSearchFilters>) => void;
  onClearFilters: () => void;
  availableTags: string[];
  availableCategories: string[];
}

const AdvancedFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  availableTags,
  availableCategories
}: AdvancedFiltersProps) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const displayedTags = showAllTags ? availableTags : availableTags.slice(0, 10);
  const displayedCategories = showAllCategories ? availableCategories : availableCategories.slice(0, 8);

  return (
    <div className="black-to-dark-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-white">Advanced Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-400 hover:text-white"
        >
          Clear All
        </Button>
      </div>

      {/* Search Query */}
      <div className="space-y-2">
        <Label className="text-gray-200">Search</Label>
        <Input
          value={filters.searchQuery}
          onChange={(e) => onFiltersChange({ searchQuery: e.target.value })}
          placeholder="Search tools, descriptions, or tags..."
          className="bg-black/20 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-gray-200">Categories</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {displayedCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  const newCategories = checked
                    ? [...filters.categories, category]
                    : filters.categories.filter(c => c !== category);
                  onFiltersChange({ categories: newCategories });
                }}
                className="border-white/30"
              />
              <Label htmlFor={`category-${category}`} className="text-sm text-gray-400">
                {category}
              </Label>
            </div>
          ))}
          {availableCategories.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-blue-400 hover:text-blue-300"
            >
              {showAllCategories ? (
                <>Show Less <ChevronUp size={16} /></>
              ) : (
                <>Show More ({availableCategories.length - 8}) <ChevronDown size={16} /></>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Price Models */}
      <div className="space-y-3">
        <Label className="text-gray-200">Pricing</Label>
        <div className="space-y-2">
          {['Free', 'Freemium', 'Paid', 'Enterprise'].map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${price}`}
                checked={filters.priceModels.includes(price)}
                onCheckedChange={(checked) => {
                  const newPrices = checked
                    ? [...filters.priceModels, price]
                    : filters.priceModels.filter(p => p !== price);
                  onFiltersChange({ priceModels: newPrices });
                }}
                className="border-white/30"
              />
              <Label htmlFor={`price-${price}`} className="text-sm text-gray-400">
                {price}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Range */}
      <div className="space-y-3">
        <Label className="text-gray-200">Rating Range</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Min: {filters.minRating}</span>
            <span className="text-gray-400">Max: {filters.maxRating}</span>
          </div>
          <Slider
            value={[filters.minRating]}
            onValueChange={(value) => onFiltersChange({ minRating: value[0] })}
            max={5}
            min={0}
            step={0.1}
            className="mb-2"
          />
          <Slider
            value={[filters.maxRating]}
            onValueChange={(value) => onFiltersChange({ maxRating: value[0] })}
            max={5}
            min={0}
            step={0.1}
          />
        </div>
      </div>

      {/* Trending Toggle */}
      <div className="flex items-center justify-between">
        <Label className="text-gray-200">Trending Only</Label>
        <Switch
          checked={filters.trending === true}
          onCheckedChange={(checked) => 
            onFiltersChange({ trending: checked ? true : null })
          }
        />
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <Label className="text-gray-200">Tags</Label>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {displayedTags.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.tags.includes(tag)
                    ? "bg-white text-black"
                    : "border-white/30 text-gray-400 hover:border-white hover:text-white"
                }`}
                onClick={() => {
                  const newTags = filters.tags.includes(tag)
                    ? filters.tags.filter(t => t !== tag)
                    : [...filters.tags, tag];
                  onFiltersChange({ tags: newTags });
                }}
              >
                {tag}
                {filters.tags.includes(tag) && (
                  <X size={12} className="ml-1" />
                )}
              </Badge>
            ))}
          </div>
          {availableTags.length > 10 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-blue-400 hover:text-blue-300"
            >
              {showAllTags ? (
                <>Show Less <ChevronUp size={16} /></>
              ) : (
                <>Show More ({availableTags.length - 10}) <ChevronDown size={16} /></>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(filters.categories.length > 0 || filters.priceModels.length > 0 || filters.tags.length > 0 || filters.trending) && (
        <div className="space-y-2 pt-4 border-t border-white/10">
          <Label className="text-gray-200">Active Filters</Label>
          <div className="flex flex-wrap gap-1">
            {filters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
                <X
                  size={10}
                  className="ml-1 cursor-pointer"
                  onClick={() => onFiltersChange({
                    categories: filters.categories.filter(c => c !== category)
                  })}
                />
              </Badge>
            ))}
            {filters.priceModels.map((price) => (
              <Badge key={price} variant="secondary" className="text-xs">
                {price}
                <X
                  size={10}
                  className="ml-1 cursor-pointer"
                  onClick={() => onFiltersChange({
                    priceModels: filters.priceModels.filter(p => p !== price)
                  })}
                />
              </Badge>
            ))}
            {filters.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
                <X
                  size={10}
                  className="ml-1 cursor-pointer"
                  onClick={() => onFiltersChange({
                    tags: filters.tags.filter(t => t !== tag)
                  })}
                />
              </Badge>
            ))}
            {filters.trending && (
              <Badge variant="secondary" className="text-xs">
                Trending
                <X
                  size={10}
                  className="ml-1 cursor-pointer"
                  onClick={() => onFiltersChange({ trending: null })}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
