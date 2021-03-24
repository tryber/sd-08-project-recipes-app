import React from 'react';
import data from './data';

const DrnkRecipeInstruction = () => {
  const recipe = [data[1]];
  // const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const recipe = meals[Object.keys(meals)[0]];
  console.log(recipe);
  return (
    <div>
      <div>
        <p data-testid="instructions">{recipe[0].strInstructions}</p>
      </div>
    </div>
  );
};

export default DrnkRecipeInstruction;
