import React, { useContext, useEffect } from 'react';
import components from '../components/index';
import RecipesContext from '../core/RecipesContext';
import api from '../services';
import { MAIN_FOOD_CARD_LENGTH_12 } from '../constants';

function ExploreDrinksByIngredients() {
  const {
    drinkIngredientsData,
    setDrinksIngredientsData } = useContext(RecipesContext);

  useEffect(() => {
    api.fetchDrinkIngredients()
      .then((response) => response.json())
      .then((result) => setDrinksIngredientsData(
        result.drinks.slice(0, MAIN_FOOD_CARD_LENGTH_12),
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <components.Header title="Explorar Ingredientes" />
      <div className="home-container">
        {drinkIngredientsData.map((element, index) => (
          <components.MainIngredientDrinkCard
            key={ index }
            ingredientsDrinksData={ element }
            index={ index }
            id={ index }
          />
        ))}
      </div>
      <components.Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
