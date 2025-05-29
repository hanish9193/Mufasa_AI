
import { useState, useEffect } from 'react';

export interface FavoriteTool {
  toolId: string;
  addedAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('ai-tools-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (toolId: string) => {
    const newFavorite: FavoriteTool = {
      toolId,
      addedAt: new Date().toISOString()
    };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('ai-tools-favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (toolId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.toolId !== toolId);
    setFavorites(updatedFavorites);
    localStorage.setItem('ai-tools-favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (toolId: string) => {
    return favorites.some(fav => fav.toolId === toolId);
  };

  const toggleFavorite = (toolId: string) => {
    if (isFavorite(toolId)) {
      removeFromFavorites(toolId);
    } else {
      addToFavorites(toolId);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};
