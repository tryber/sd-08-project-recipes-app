import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import notLikedBtn from '../images/whiteHeartIcon.svg';
import likedBtn from '../images/blackHeartIcon.svg';
import favoriteRecipesAction from '../redux/actions/favoriteRecipeAction';

export default function LikeButton() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const recipes = useSelector((state) => state.recipes.singleRecipe);
  const [likedToogle, setLikedToogle] = useState(false);

  const type = (pathname.includes('comidas') ? 'Meal' : 'Drink');
  const recipeStorage = (localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];
  const recipe = {
    id: recipes[0][`id${type}`],
    type: (type === 'Meal' ? 'comida' : 'bebida'),
    area: (recipes[0].strArea ? recipes[0].strArea : ''),
    category: recipes[0].strCategory,
    alcoholicOrNot: (type === 'Drink' ? recipes[0].strAlcoholic : ''),
    name: recipes[0][`str${type}`],
    image: recipes[0][`str${type}Thumb`],
  };

  useEffect(() => {
    if (likedToogle) {
      dispatch(favoriteRecipesAction(recipeStorage));
    }
  }, [likedToogle]);

  function handleClick() {
    if (!likedToogle) {
      setLikedToogle(true);
      recipeStorage.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipeStorage));
    }

    if (likedToogle) {
      setLikedToogle(false);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(recipeStorage.filter((e) => e.id !== recipe.id)));
    }
  }

  return (
    <button
      type="button"
      onClick={ handleClick }
    >
      <img
        alt="like-icon"
        src={ (likedToogle) ? likedBtn : notLikedBtn }
        data-testid="favorite-btn"

      />
    </button>
  );
}
