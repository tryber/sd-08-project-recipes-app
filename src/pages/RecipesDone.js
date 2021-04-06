import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import { Filter, RecipesContainer } from '../components/DoneAndFavRecipes';
import { getDoneRecipes } from '../services/localStorage';

const RecipesDone = () => {
  const doneRecipes = getDoneRecipes();
  const [filter, setFilter] = useState('');
  return (
    <Grid container direction="column">
      <Header
        name="Receitas Feitas"
        foodClass="Recipes-Done"
        Show={ false }
      />
      <Filter updateState={ setFilter } type="done" />
      <RecipesContainer type="done" recipes={ doneRecipes } filter={ filter } />
    </Grid>
  );
};

export default RecipesDone;
