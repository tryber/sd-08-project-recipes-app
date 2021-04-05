import React from 'react';
import { useSelector } from 'react-redux';
import { useIsMeal } from '../../services/customHooks';

export default function Title() {
  const { actualRecipe } = useSelector((state) => state.detailsReducer);
  const isMeal = useIsMeal();
  if (isMeal) {
    const { strMeal, strCategory } = actualRecipe;
    return (
      <div className="title-container">
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h2 data-testid="recipe-category">{strCategory}</h2>
      </div>
    );
  }
  const { strDrink, strAlcoholic } = actualRecipe;
  return (
    <div className="title-container">
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
    </div>
  );
}
