import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function MealRecipeDetails() {
  const { meal } = useContext(RecipesContext);

  const { idMeal } = meal;

  return (
    <div>
      <Link to={ `/comidas/${idMeal}/in-progress` }>Fazer a receita</Link>
    </div>
  );
}

export default MealRecipeDetails;
