import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import notLikedBtn from '../images/whiteHeartIcon.svg';
import likedBtn from '../images/blackHeartIcon.svg';

export default function LikeButton() {
  const { pathname } = useLocation();
  const { singleRecipe } = useSelector((state) => state.recipes);
  const [liked, setLiked] = useState();

  const type = (pathname.includes('comidas') ? 'Meal' : 'Drink');
  const recipeStorage = (localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];
  const recipe = {
    id: singleRecipe[0][`id${type}`],
    type: (type === 'Meal' ? 'comida' : 'bebida'),
    area: (singleRecipe[0].strArea ? singleRecipe[0].strArea : ''),
    category: singleRecipe[0].strCategory,
    alcoholicOrNot: (type === 'Drink' ? singleRecipe[0].strAlcoholic : ''),
    name: singleRecipe[0][`str${type}`],
    image: singleRecipe[0][`str${type}Thumb`],
  };

  function verifyIfFavorite() {
    const isLiked = recipeStorage.some((e) => e.id === recipe.id);
    return isLiked;
  }

  useEffect(() => {
    setLiked((verifyIfFavorite()));
  }, []);

  function handleClick() {
    if (!liked) {
      recipeStorage.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipeStorage));
      setLiked(true);
    }
    if (liked) {
      const removeFavorite = recipeStorage.filter((e) => e.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(removeFavorite));
      setLiked(false);
    }
  }

  return (
    <button
      type="button"
      onClick={ handleClick }
      className="share-like-btn"
    >
      <img
        alt="like-icon"
        src={ (liked) ? likedBtn : notLikedBtn }
        data-testid="favorite-btn"

      />
    </button>
  );
}
