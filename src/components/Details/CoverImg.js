import React from 'react';
import { useSelector } from 'react-redux';
import { useIsMeal } from '../../services/customHooks';

export default function CoverImg() {
  const { actualRecipe } = useSelector((state) => state.detailsReducer);
  const isMeal = useIsMeal();
  if (isMeal) {
    const { strMeal, strMealThumb } = actualRecipe;
    return (
      <div className="image-container">
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid="recipe-photo"
        />
      </div>
    );
  }
  const { strDrink, strDrinkThumb } = actualRecipe;
  return (
    <div className="image-container">
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
    </div>
  );
}
