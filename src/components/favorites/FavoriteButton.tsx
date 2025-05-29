
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
}

const FavoriteButton = ({ toolId, className }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(toolId);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(toolId);
      }}
      className={cn(
        "p-2 hover:bg-white/10 transition-colors",
        className
      )}
    >
      <Heart
        size={18}
        className={cn(
          "transition-colors",
          favorite
            ? "fill-red-500 text-red-500"
            : "text-gray-400 hover:text-red-400"
        )}
      />
    </Button>
  );
};

export default FavoriteButton;
