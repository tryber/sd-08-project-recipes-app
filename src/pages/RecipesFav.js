import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header';
import { Filter, RecipesContainer } from '../components/DoneAndFavRecipes';
import { getFavoriteRecipes, removeFavoritedRecipe } from '../services/localStorage';

const RecipesFav = () => {
  const favRecipes = getFavoriteRecipes();
  const [favoriteRecipes, setFavoriteRecipes] = useState(favRecipes);
  const [filter, setFilter] = useState('');

  const removeFavRecipeById = (id) => {
    const updatedFavRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(updatedFavRecipes);
    removeFavoritedRecipe(id);
  };

  return (
    <Grid container direction="column">
      <Header
        name="Receitas Favoritas"
        foodClass="Recipes-Fav"
        Show={ false }
      />
      <Filter updateState={ setFilter } type="fav" />
      <RecipesContainer
        type="favorite"
        recipes={ favoriteRecipes }
        filter={ filter }
        removeFav={ removeFavRecipeById }
      />
    </Grid>
  );
};

export default RecipesFav;
