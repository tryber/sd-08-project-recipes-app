import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';

import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinkCatsButtons from '../components/DrinkCatsButtons';

import fetchDrinkThunk from '../redux/actions/fetchDrinkAction';
import fetchRecipesDrinkCatsThunk from '../redux/actions/fetchDrinkCatRecipesAction';
import { fetchDrinkIngredientThunk } from '../redux/actions/fetchDrinkIngredientThunk';

import clearRecipesAction from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';

function DrinksRecipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const input = useSelector((state) => state.search.inputValue);
  const type = useSelector((state) => state.search.inputType);
  const drinks = useSelector((state) => state.recipes.recipes);
  const filter = useSelector((state) => state.search.drinkFilter);
  const ifilter = useSelector((state) => state.search.ingredientFilter);

  useEffect(() => {
    const fetchData = (inputf, typef) => dispatch(fetchDrinkThunk(inputf, typef));
    const ingredientFilter = (filteri) => dispatch(fetchDrinkIngredientThunk(filteri));
    const fetchDataCat = (filterf) => dispatch(fetchRecipesDrinkCatsThunk(filterf));
    if (!ifilter && !filter) fetchData(input, type);
    if (filter) fetchDataCat(filter);
    if (ifilter && !filter) ingredientFilter(ifilter);
  }, [input, type, filter, ifilter]);

  useEffect(() => () => {
    dispatch(clearRecipesAction());
    dispatch(clearSearchAction());
  }, []);

  useEffect(() => {
    if (drinks.length === 1) {
      return (<Redirect
        push
        to={ `/bebidas/${drinks[0].idDrink}` }
      />);
    }
  }, []);

  return (
    <main>
      { drinks && drinks.length === 1
        && <Redirect push to={ `/bebidas/${drinks[0].idDrink}` } />}
      <Header />
      <DrinkCatsButtons />
      { drinks && drinks.map((elem, index) => (
        <button
          key={ elem.idDrink }
          type="button"
          onClick={ () => history.push(`/bebidas/${elem.idDrink}`) }
          data-testid={ `${index}-recipe-card` }
        >
          <div>
            <h4 data-testid={ `${index}-card-name` }>{ elem.strDrink }</h4>
            <span>{ elem.idDrink }</span>
            <img
              className="card"
              src={ elem.strDrinkThumb }
              alt={ elem.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </button>
      ))}
      <Footer />
    </main>
  );
}

export default DrinksRecipes;
