
import React from "react";
import { Link } from "react-router-dom";

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${category.id}`} className="category-card">
      <div className="w-12 h-12 flex items-center justify-center text-ai-purple-600">
        {category.icon}
      </div>
      <h3 className="font-medium text-lg">{category.name}</h3>
      <span className="text-xs text-muted-foreground">{category.count} tools</span>
    </Link>
  );
};

export default CategoryCard;
