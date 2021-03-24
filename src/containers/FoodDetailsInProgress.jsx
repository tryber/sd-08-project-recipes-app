import React, { useEffect, useState } from 'react';
import MealRecipeIngredients from '../components/recipeInProgress/MealRecipeIngredients';
// import MealRecipeInstruction from '../components/recipeInProgress/MealRecipeInstruction';
import MealRecipeTop from '../components/recipeInProgress/MealRecipeTop';

const FoodDetailsInProgress = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setRedirect(true);
    return () => {
      setRedirect(false);
    };
  }, [redirect]);
  return (
    <div>
      Food Recipe In Progress
      <MealRecipeTop />
      <MealRecipeIngredients />
      {/* <MealRecipeInstruction /> */}
      {/* <button type="button" data-testid="finish-recipe-btn">Finalizar</button> */}
    </div>
  );
};

export default FoodDetailsInProgress;
