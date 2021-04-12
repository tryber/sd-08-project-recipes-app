import React, { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import {
  DetailImage, DetailIngredients, DetailInstructions, DetailTitle, DetailVideo,
} from '.';
import { fetchItem } from '../../store/apiSlice';
import DetailRecommend from './DetailRecommend';

const isDoneRecipe = (id) => {
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  return done ? done.some((element) => element.id === id) : false;
};

const isInProgressRecipe = (id) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (!inProgress) return false;

  const cocktailCheck = inProgress.cocktails && id in inProgress.cocktails;
  const mealCheck = inProgress.meals && id in inProgress.meals;

  return Boolean(cocktailCheck || mealCheck);
};

const getRecipeInfo = (string, item) => Object.entries(item).reduce((array, entry) => (
  entry[0].includes(string) && entry[1] && entry[1].length > 0
    ? [...array, entry[1]] : array
), []);

function Details() {
  const { url } = useRouteMatch();
  const isFood = url.includes('comidas');
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.api.loading === 'pending');
  const item = useSelector((state) => {
    if (state.api.data.meals) return state.api.data.meals[0];
    if (state.api.data.drinks) return state.api.data.drinks[0];
    return {};
  });

  useEffect(() => {
    const database = isFood ? 'themealdb' : 'thecocktaildb';
    const endpoint = `https://www.${database}.com/api/json/v1/1/lookup.php?i=${id}`;
    dispatch(fetchItem(endpoint));
  }, [isFood, id, dispatch]);

  if (isLoading) return <Spinner animation="border" />;

  return (
    <main>
      <DetailImage src={ item.strMealThumb || item.strDrinkThumb } />
      <DetailTitle
        title={ item.strMeal || item.strDrink }
        cat={ item.strAlcoholic || item.strCategory }
      />
      <DetailIngredients
        ingredients={ getRecipeInfo('Ingredient', item) }
        measures={ getRecipeInfo('Measure', item) }
      />
      <DetailInstructions instructions={ item.strInstructions } />
      { isFood && <DetailVideo vidSrc={ item.strYoutube } />}
      <DetailRecommend isFood={ isFood } />
      <Button
        as={ Link }
        to={ `${url}/in-progress` }
        variant="primary"
        data-testid="start-recipe-btn"
        style={ {
          position: 'fixed',
          bottom: 0,
          visibility: isDoneRecipe(id) ? 'hidden' : 'visible',
        } }
        block
      >
        { isInProgressRecipe(id) ? 'Continuar Receita' : 'Iniciar Receita' }
      </Button>
    </main>
  );
}

export default Details;
