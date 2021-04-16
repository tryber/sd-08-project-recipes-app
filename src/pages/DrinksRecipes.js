import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchDrinkThunk from '../redux/actions/fetchDrinkAction';
import fetchRecipesDrinkCatsThunk from '../redux/actions/fetchDrinkCatRecipesAction';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import DrinkCatsButtons from '../components/DrinkCatsButtons';
import { fetchDrinkIFilterThunk } from '../redux/actions/fetchIngridientsAction';
import RecipesCards from '../components/RecipesCards';
import '../CSS/DrinkRecipePage.css';

function DrinksRecipes() {
  const dispatch = useDispatch();

  const {
    inputValue,
    inputType,
    drinkFilter,
    ingredientFilter,
  } = useSelector((state) => state.search);
  const { recipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    let fetchDrink;
    if (!ingredientFilter && !drinkFilter) {
      fetchDrink = (inputf, typef) => dispatch(fetchDrinkThunk(inputf, typef));
      fetchDrink(inputValue, inputType);
    }
    if (drinkFilter) {
      fetchDrink = (filterf) => dispatch(fetchRecipesDrinkCatsThunk(filterf));
      fetchDrink(drinkFilter);
    }
    if (ingredientFilter && !drinkFilter) {
      fetchDrink = (filteri) => dispatch(fetchDrinkIFilterThunk(filteri));
      fetchDrink(ingredientFilter);
    }
  }, [inputValue, inputType, drinkFilter, ingredientFilter]);

  useEffect(() => () => {
    dispatch(clearRecipesAction());
    dispatch(clearSearchAction());
  }, []);

  useEffect(() => {
    if (recipes.length === 1) return <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />;
  }, []);

  return (
    <section className="cocktail-image main-container">
      { recipes && recipes.length === 1
        && <Redirect to={ `/bebidas/${recipes[0].idDrink}` } /> }
      <div className="header-section">
        <Header />
        <DrinkCatsButtons />
      </div>
      <div className="cards-section">
        { recipes && recipes.map((elem, index) => (
          <RecipesCards
            key={ elem.idDrink }
            path="/bebidas"
            elem={ elem }
            index={ index }
            type="Drink"
          />
        )) }
      </div>
      <Footer />
    </section>
  );
}

export default DrinksRecipes;
