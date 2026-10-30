'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => boolean;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('npc_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // Ignore JSON parse errors
    }
  }, []);

  const toggleFavorite = (id: number): boolean => {
    let next: number[];
    let added = false;
    if (favorites.includes(id)) {
      next = favorites.filter((fid) => fid !== id);
    } else {
      next = [...favorites, id];
      added = true;
    }
    setFavorites(next);
    localStorage.setItem('npc_favorites', JSON.stringify(next));
    return added;
  };

  const isFavorite = (id: number): boolean => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
