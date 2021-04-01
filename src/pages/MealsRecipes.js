import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCatsButtons from '../components/MealCatsButton';

import fetchMealThunk from '../redux/actions/fetchMealAction';
import fetchRecipesMealCatsThunk from '../redux/actions/fetchMealCatRecipesAction';
import { fetchMealIngredientThunk } from '../redux/actions/fetchMealIngredientThunk';

import clearRecipesAction from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';

function MealsRecipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useSelector((state) => state.search.inputValue);
  const type = useSelector((state) => state.search.inputType);
  const meals = useSelector((state) => state.recipes.recipes);
  const filter = useSelector((state) => state.search.mealFilter);
  const ifilter = useSelector((state) => state.search.ingredientFilter);

  useEffect(() => {
    const fetchData = (inputf, typef) => dispatch(fetchMealThunk(inputf, typef));
    const ingredientFilter = (filteri) => dispatch(fetchMealIngredientThunk(filteri));
    const fetchDataCat = (filterf) => dispatch(fetchRecipesMealCatsThunk(filterf));
    if (!ifilter && !filter) fetchData(input, type);
    if (filter) fetchDataCat(filter);
    if (ifilter && !filter) ingredientFilter(ifilter);
  }, [input, type, filter, ifilter]);

  useEffect(() => () => {
    const clearDispatch = () => {
      dispatch(clearRecipesAction());
      dispatch(clearSearchAction());
    };
    clearDispatch();
  }, []);

  useEffect(() => {
    if (meals.length === 1) return <Redirect push to={ `/comidas/${meals[0].idMeal}` } />;
  }, []);

  return (
    <main>
      {(meals && meals.length === 1 && filter === '')
      && <Redirect push to={ `/comidas/${meals[0].idMeal}` } />}
      <Header />
      <MealCatsButtons />
      { meals && meals.map((elem, index) => (
        <button
          key={ elem.idMeal }
          type="button"
          onClick={ () => history.push(`/comidas/${elem.idMeal}`) }
          data-testid={ `${index}-recipe-card` }
        >
          <div>
            <h4 data-testid={ `${index}-card-name` }>{ elem.strMeal }</h4>
            <span>{ elem.idMeal }</span>
            <img
              className="card"
              src={ elem.strMealThumb }
              alt={ elem.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </button>
      ))}
      <Footer />
    </main>
  );
}

export default MealsRecipes;
