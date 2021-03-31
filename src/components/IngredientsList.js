import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PageProgress } from '../context/ContextProgress';
import {
  saveRecipeInProgressStorage,
  getLocalStorageRecipesInProgress,
} from '../localStorage/recipeProgressStorage';

function setInitStateRecipe(id, type) {
  const local = getLocalStorageRecipesInProgress();
  const mealOrDrink = type === 'drink' ? 'cocktails' : 'meals';
  if (!local[mealOrDrink].id) {
    const result = {
      ...local,
      [mealOrDrink]: { ...local[mealOrDrink], [id]: [] },
    };
    saveRecipeInProgressStorage(result);
  }
}

function setIngredientsStorage(idIngredient, id, recipe) {
  if (recipe[id]) {
    const currentRecipe = recipe[id];
    if (currentRecipe.includes(idIngredient)) {
      const result = currentRecipe.filter((item) => item !== idIngredient);
      if (result.length === 0) {
        delete recipe[id];
        return { ...recipe };
      }
      const newArrIngredients = { ...recipe, [id]: result };
      return newArrIngredients;
    }
    const result = currentRecipe.concat(idIngredient);
    const newCocktails = { ...recipe, [id]: result };
    return newCocktails;
  }
  const newCocktails = { ...recipe, [id]: [idIngredient] };
  return newCocktails;
}

function setDrinkChecked(cocktails, id, acc) {
  if (cocktails[id]) {
    const drink = cocktails[id];
    const result = drink.includes(acc.length.toString());
    return acc.concat(result);
  }
  return acc.concat(false);
}

function setMealChecked(meals, id, acc) {
  if (meals[id]) {
    const food = meals[id];
    const result = food.includes(acc.length.toString());
    return acc.concat(result);
  }
  return acc.concat(false);
}

function ListIngredients({ recipe, type }) {
  const [isChecked, setChecked] = useState([]);
  const { setRecipeCompleted } = useContext(PageProgress);
  const id = recipe.idDrink || recipe.idMeal;

  const verifyRecipeCompleted = useCallback(() => {
    if (isChecked.every((el) => el === true)) {
      setRecipeCompleted(false);
    } else {
      setRecipeCompleted(true);
    }
  }, [isChecked, setRecipeCompleted]);

  const taskComplete = (idingredient) => {
    const { cocktails, meals } = getLocalStorageRecipesInProgress();
    if (type === 'drink') {
      const currDrinks = setIngredientsStorage(idingredient, id, cocktails);
      saveRecipeInProgressStorage({ cocktails: currDrinks, meals });
    }
    if (type === 'meal') {
      const currMeal = setIngredientsStorage(idingredient, id, meals);
      saveRecipeInProgressStorage({ cocktails, meals: currMeal });
    }
  };

  const handleChange = ({
    target: {
      dataset: { idingredient },
    },
  }) => {
    const newArr = isChecked.map((el, index) => {
      if (Number(idingredient) === index) return !el;
      return el;
    });
    taskComplete(idingredient);
    setChecked(newArr);
  };

  const setCheckIngredient = useCallback(() => {
    const { cocktails, meals } = getLocalStorageRecipesInProgress();
    const ingredientChecked = Object.entries(recipe).reduce(
      (acc, [key, value]) => {
        if (key.includes('strIngredient') && value) {
          if (type === 'drink') {
            return setDrinkChecked(cocktails, id, acc);
          }

          if (type === 'meal') {
            return setMealChecked(meals, id, acc);
          }
        }
        return acc;
      },
      [],
    );
    return ingredientChecked;
  }, [id, recipe, type]);

  useEffect(() => {
    setChecked(setCheckIngredient());
  }, [setCheckIngredient]);

  useEffect(() => {
    if (id) {
      setInitStateRecipe(id, type);
    }
  }, [id, type]);

  useEffect(() => {
    verifyRecipeCompleted();
  }, [verifyRecipeCompleted]);

  return (
    <ul>
      {Object.entries(recipe).reduce((acc, [key, value], index) => {
        if (key.includes('strIngredient') && value) {
          return acc.concat(
            <li data-testid={ `${acc.length}-ingredient-step` } key={ index }>
              <label htmlFor={ `${acc.length + 1}-ingredient` }>
                {`${value} ${recipe[`strMeasure${acc.length + 1}`]}`}
                {value}
              </label>
              <input
                defaultChecked={ isChecked[acc.length] }
                data-idingredient={ acc.length }
                onClick={ (e) => {
                  handleChange(e);
                } }
                id={ `${acc.length + 1}-ingredient` }
                type="checkbox"
              />
            </li>,
          );
        }
        return acc;
      }, [])}
    </ul>
  );
}

ListIngredients.propTypes = {
  recipe: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  type: PropTypes.string.isRequired,
};

export default ListIngredients;
