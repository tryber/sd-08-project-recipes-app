import React from 'react';
import data from './data';

const MealRecipeInstruction = () => {
  const recipe = [data[0]];
  // const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const recipe = meals[Object.keys(meals)[0]];
  console.log(recipe);

  return (
    <div>
      <p data-testid="instructions">{recipe[0].strInstructions}</p>
    </div>
  );
};

export default MealRecipeInstruction;
