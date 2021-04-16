import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchMealThunk from '../redux/actions/fetchMealAction';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import MealCatsButtons from '../components/MealCatsButton';
import fetchRecipesMealCatsThunk from '../redux/actions/fetchMealCatRecipesAction';
import { fetchMealIFilterThunk } from '../redux/actions/fetchIngridientsAction';
import RecipesCards from '../components/RecipesCards';
import '../CSS/MealRecipePage.css';

function MealsRecipes() {
  const dispatch = useDispatch();

  const {
    inputValue,
    inputType,
    mealFilter,
    ingredientFilter,
  } = useSelector((state) => state.search);
  const { recipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    let fetchMeal;
    if (!ingredientFilter && !mealFilter) {
      fetchMeal = (inputf, typef) => dispatch(fetchMealThunk(inputf, typef));
      fetchMeal(inputValue, inputType);
    }
    if (mealFilter) {
      fetchMeal = (filterf) => dispatch(fetchRecipesMealCatsThunk(filterf));
      fetchMeal(mealFilter);
    }
    if (ingredientFilter && !mealFilter) {
      fetchMeal = (filteri) => dispatch(fetchMealIFilterThunk(filteri));
      fetchMeal(ingredientFilter);
    }
  }, [inputValue, inputType, mealFilter, ingredientFilter]);

  useEffect(() => () => {
    dispatch(clearRecipesAction());
    dispatch(clearSearchAction());
  }, []);

  useEffect(() => {
    if (recipes.length === 1) return <Redirect to={ `/comidas/${recipes[0].idMeal}` } />;
  }, []);

  return (
    <section className="meal-image main-container">
      {(recipes && recipes.length === 1 && mealFilter === '')
      && <Redirect to={ `/comidas/${recipes[0].idMeal}` } />}
      <section className="header-section">
        <Header />
        <MealCatsButtons />
      </section>
      <section className="cards-section">
        { recipes && recipes.map((elem, index) => (
          <RecipesCards
            key={ elem.idMeal }
            path="/comidas"
            elem={ elem }
            index={ index }
            type="Meal"
          />
        )) }
      </section>
      <Footer />
    </section>
  );
}

export default MealsRecipes;
