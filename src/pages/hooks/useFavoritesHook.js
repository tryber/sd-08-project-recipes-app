import { useState, useEffect } from 'react';

const useFavoritesHook = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const localData = localStorage.getItem('favoriteRecipes');
    const newFav = localData ? JSON.parse(localData) : [];
    setFavorites(newFav);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  const updateFavorites = (recipe, isFav) => {
    if (!isFav) {
      const newFavorites = [...favorites, recipe];
      console.log('newfavorites: ', newFavorites);
      setFavorites(newFavorites);
    } else {
      const newFavorites = favorites.filter((fav) => fav.id !== recipe.id);
      setFavorites(newFavorites);
    }
  };

  return [favorites, updateFavorites];
};

export default useFavoritesHook;
