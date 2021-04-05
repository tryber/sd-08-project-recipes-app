import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestMeals, requestDrinks } from '../../redux/actions';

import { fetchByIngredients, fetchApi } from '../../services/API';

export default function Ingredients({ path }) {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  async function getIngredients() {
    setIsLoading(true);
    const data = await fetchByIngredients(path);
    setIngredients(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getIngredients();
  }, []);

  async function handleRedirect(name) {
    if (path === 'comidas') {
      const resultsMeals = await fetchApi(name, 'ingredient', 'comidas');
      dispatch(requestMeals(resultsMeals));
      history.push('/comidas');
    } else {
      const resultsDrinks = await fetchApi(name, 'ingredient', 'bebidas');
      dispatch(requestDrinks(resultsDrinks));
      history.push('/bebidas');
    }
  }

  function renderMealsIng() {
    return (
      <div>
        {ingredients.map((element, index) => (
          <button
            type="button"
            className="card"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleRedirect(element.strIngredient) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${element.strIngredient}-Small.png` }
              alt="meal-ingredient"
            />
            <span data-testid={ `${index}-card-name` }>
              { element.strIngredient }
            </span>
          </button>
        )) }
      </div>
    );
  }

  function renderDrinksIng() {
    return (
      <div>
        {ingredients.map((element, index) => (
          <button
            className="card"
            type="button"
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            onClick={ () => handleRedirect(element.strIngredient1) }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${element.strIngredient1}-Small.png` }
              alt="drink-ingredient"
            />
            <span data-testid={ `${index}-card-name` }>
              { element.strIngredient1 }
            </span>
          </button>
        )) }
      </div>
    );
  }

  return (
    <main>
      {isLoading && (<h1>Loading...</h1>)}
      {path === 'comidas' && renderMealsIng()}
      {path === 'bebidas' && renderDrinksIng()}
    </main>
  );
}

Ingredients.propTypes = {
  path: PropTypes.string.isRequired,
};
