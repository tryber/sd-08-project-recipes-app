import React, { useContext, useEffect } from 'react';
import RecipesContext from '../core/RecipesContext';
import components from '../components/index';
import api from '../services';
import { MAIN_FOOD_CARD_LENGTH_12 } from '../constants';

function ExploreFoodsByIngredients() {
  const {
    ingredientsData,
    setIngredientsData,
  } = useContext(RecipesContext);

  useEffect(() => {
    api.fetchIngredients()
      .then((response) => response.json())
      .then((result) => setIngredientsData(
        result.meals.slice(0, MAIN_FOOD_CARD_LENGTH_12),
      ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <components.Header title="Explorar Ingredientes" />
      <div className="home-container">
        {
          ingredientsData.map((ingredient, index) => (
            <components.MainIngredientCard
              key={ index }
              ingredientsData={ ingredient }
              index={ index }
              id={ ingredient.idIngredient }
            />
          ))
        }
      </div>
      <components.Footer />
    </div>
  );
}

export default ExploreFoodsByIngredients;
