import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import DoneRecipe from './DoneRecipe';
import FavRecipe from './FavRecipe';

const RecipesContainer = ({ type, recipes, filter, removeFav }) => {
  const filteredRecipes = recipes.filter((recipe) => recipe.type.includes(filter));
  const updatedRecipes = filteredRecipes.map((recipe) => ({ ...recipe, removeFav }));

  const Recipe = type === 'done' ? DoneRecipe : FavRecipe;

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      wrap="wrap"
      spacing={ 2 }
    >
      {updatedRecipes.map((recipe, index) => (
        <Recipe
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
        />
      ))}
    </Grid>
  );
};

RecipesContainer.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  removeFav: PropTypes.func,
};

RecipesContainer.defaultProps = {
  recipes: [],
  removeFav: () => {},
};

export default RecipesContainer;
