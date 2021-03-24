import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { filterIngAndMeasuresList } from '../../core';
// import api from '../../services';
import data from './data';
import MealRecipeInstruction from './MealRecipeInstruction';

const MealRecipeIngredients = () => {
  // const [recipe, setRecipe] = useState([]);
  // const [recipeData, setRecipeData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //   console.log(meals[Object.keys(meals)[0]]);
  //   // const mealId = Object.keys(meals)[0];
  //   // console.log(mealId);
  //   setRecipeData(meals[Object.keys(meals)[0]]);
  //   // api.fetchMealById(mealId)
  //   //   .then((response) => response.json()).then((result) => setRecipeData(result.meals));
  // }, []);
  // useEffect(() => {
  //   if (recipeData.length > 0) {
  //     setLoading(false);
  //   }
  // }, [recipeData]);
  const [progress, setProgress] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  // const [change, setchange] = useState(initialState)
  const recipe = [data[0]];
  const store = JSON.parse(localStorage.getItem('inProgressRecipe'));
  console.log(store);
  // const { meals: { prog } } = JSON.parse(localStorage.getItem('inProgressRecipe'));
  if (store === null) {
    localStorage.setItem('inProgressRecipe', JSON.stringify({
      cocktails: {},
      meals: { [data[0].idMeal]: [data[0]], prog: progress },
    }));
  }
  console.log(recipe);
  useEffect(() => {
    const retrieve = JSON.parse(localStorage.getItem('inProgressRecipe'));
    console.log(retrieve);
    // const inputs = document.getElementsByTagName('input');
    // console.log(inputs);
    setProgress(retrieve.meals.prog);
  }, []);
  useEffect(() => {
    // const { cocktails, meals } = JSON.parse(localStorage.getItem('inProgressRecipe'));
    // const inputs = document.getElementsByTagName('input');
    localStorage.setItem('inProgressRecipe', JSON.stringify({
      cocktails: {},
      meals: { [data[0].idMeal]: [data[0]], prog: progress },
    }));
    return localStorage.setItem('inProgressRecipe', JSON.stringify({
      cocktails: {},
      meals: { [data[0].idMeal]: [data[0]], prog: progress },
    }));
  }, [progress]);
  useEffect(() => {
    if (redirect) {
      // setLocalStorage(food[0]);
      return history.push('/receitas-feitas');
    }
  }, [redirect, history]);
  const steps = filterIngAndMeasuresList(recipe[0]);
  return (
    <div>
      <div>
        <p>Ingredients</p>
        <ol>
          {steps[0].map((ingredientsString, indx) => (
            <li key={ indx } data-testid={ `${indx}-ingredient-step` }>
              <label htmlFor={ `step-${indx}` }>
                <input
                  type="checkbox"
                  name={ `step-${indx}` }
                  id={ `step-${indx}` }
                  value={ ingredientsString[1] }
                  onChange={ (e) => setProgress([
                    ...progress,
                    e.target.value,
                  ]) }
                  checked={ progress.length > 0
                    ? progress.some((e) => e === ingredientsString[1]) : false }
                />
                {ingredientsString[1]}
                {' - '}
                {steps[1][indx][1]}
              </label>
            </li>
          ))}
        </ol>
        <MealRecipeInstruction />
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ progress.length !== steps[0].length }
          onClick={ () => setRedirect(true) }
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default MealRecipeIngredients;
