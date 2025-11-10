import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites:vendors');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites:vendors', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const isFavorite = (id) => favorites.includes(id);
  const addFavorite = (id) => setFavorites((s) => (s.includes(id) ? s : [...s, id]));
  const removeFavorite = (id) => setFavorites((s) => s.filter((i) => i !== id));
  const toggleFavorite = (id) => setFavorites((s) => (s.includes(id) ? s.filter((i) => i !== id) : [...s, id]));

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

export default FavoritesContext;
