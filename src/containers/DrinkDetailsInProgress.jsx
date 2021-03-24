import React, { useEffect, useState } from 'react';
import DrnkRecipeIngredients from '../components/recipeInProgress/DrinkRecipeIngredients';
import DrinkRecipeTop from '../components/recipeInProgress/DrinkRecipeTop';

const DrinkDetailsInProgress = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setRedirect(true);
    return () => {
      setRedirect(false);
    };
  }, [redirect]);
  return (
    <div>
      Drink Recipe In Progress
      <DrinkRecipeTop />
      <DrnkRecipeIngredients />
    </div>
  );
};

export default DrinkDetailsInProgress;
