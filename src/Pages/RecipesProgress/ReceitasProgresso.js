import React, { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import {
  DetailImage, DetailInstructions, DetailTitle, DetailVideo,
} from '../Details';
import { fetchItem } from '../../store/apiSlice';
import DetailRecommend from '../Details/DetailRecommend';
import DetailIngredientsProgress from './ReceitasProgressCheckbox';

const setLocal = (isFood, id, checkbox) => {
  if (!isFood) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
        [id]: checkbox,
      },
      meals: {},
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {
        [id]: checkbox,
      },
    }));
  }
};

const getRecipeInfo = (string, item) => Object.entries(item).reduce((array, entry) => (
  entry[0].includes(string) && entry[1] && entry[1].length > 0
    ? [...array, entry[1]] : array
), []);

const getLocalStorage = (id, isFood) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isFood) {
      return progressRecipes.meals[id];
    }
    return progressRecipes.cocktails[id];
  }
};

const checkboxAllMarked = (getRecipe, checkbox, item) => {
  const arrayIngredients = getRecipe('Ingredient', item);
  if (arrayIngredients.length === checkbox.length) {
    return false;
  }
  return true;
};

const doneRecipes = (id, item, redirect) => {
  const data = new Date();
  const dia = data.getDate();
  const mes = data.getMonth();
  const ano = data.getFullYear();
  const recipeObject = [{
    id,
    type: item.strMeal ? 'comida' : 'bebida',
    area: item.strArea || '',
    category: item.strCategory || '',
    alcoholicOrNot: item.strAlcoholic || '',
    name: item.strMeal,
    image: item.strMealThumb || item.strDrinkThumb,
    doneDate: `${dia}/0${mes + 1}/${ano}`,
    tags: item.strTags ? item.strTags.split(',') : [],
  }];

  localStorage.setItem('doneRecipes', JSON.stringify(recipeObject));
  redirect();
};

function DetailsProgress() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const isFood = url.includes('comidas');
  const { id } = useParams();
  const isLoading = useSelector((state) => state.api.loading === 'pending');
  const item = useSelector((state) => {
    if (state.api.data.meals) return state.api.data.meals[0];
    if (state.api.data.drinks) return state.api.data.drinks[0];
    return {};
  });
  const [checkbox, setCheckBox] = useState(getLocalStorage(id, isFood) || []);
  const history = useHistory();

  const handelClick = () => {
    history.push('/receitas-feitas');
  };

  const checkboxLocalStorage = (index, checked) => {
    if (checked === true) {
      setCheckBox([...checkbox, index]);
    } else if (checked === false) {
      const checkboxClone = [...checkbox];
      checkboxClone.splice(checkbox.indexOf(index), 1);
      setCheckBox(checkboxClone);
    }
  };

  useEffect(() => {
    const database = isFood ? 'themealdb' : 'thecocktaildb';
    const endpoint = `https://www.${database}.com/api/json/v1/1/lookup.php?i=${id}`;
    dispatch(fetchItem(endpoint));
  }, [isFood, id, dispatch]);

  useEffect(() => {
    setLocal(isFood, id, checkbox);
  }, [checkbox, isFood, id]);

  if (isLoading) return <Spinner animation="border" />;

  return (
    <main>
      <DetailImage src={ item.strMealThumb || item.strDrinkThumb } />
      <DetailTitle
        title={ item.strMeal || item.strDrink }
        cat={ item.strAlcoholic || item.strCategory }
      />
      <DetailIngredientsProgress
        checkbox={ checkbox }
        checkboxLocalStorage={ checkboxLocalStorage }
        ingredients={ getRecipeInfo('Ingredient', item) }
        measures={ getRecipeInfo('Measure', item) }
      />
      <DetailInstructions instructions={ item.strInstructions } />
      { isFood && <DetailVideo vidSrc={ item.strYoutube } />}
      <DetailRecommend isFood={ isFood } />
      <Button
        data-testid="finish-recipe-btn"
        disabled={ checkboxAllMarked(getRecipeInfo, checkbox, item) }
        onClick={ () => doneRecipes(id, item, handelClick) }
      >
        Finalizar Receita
      </Button>
    </main>
  );
}

export default DetailsProgress;
