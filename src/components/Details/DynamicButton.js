import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useIsMeal } from '../../services/customHooks';
import { loadFromStorage } from '../../services/utils';

function continueRecipe(id, isMeal) {
  const inProgressRecipes = loadFromStorage('inProgressRecipes');
  let mealsCocktails = '';
  if (isMeal) {
    mealsCocktails = 'meals';
  } else {
    mealsCocktails = 'cocktails';
  }
  if (inProgressRecipes !== null) {
    const includeCurrent = Object.keys(inProgressRecipes).includes(mealsCocktails);
    if (includeCurrent) {
      return Object.keys(inProgressRecipes[mealsCocktails]).includes(id);
    }
  }
  return false;
}

function redirectTo(isMeal) {
  if (isMeal) {
    return 'comidas';
  }
  return 'bebidas';
}

export default function DynamicButton() {
  const { id } = useParams();
  const isMeal = useIsMeal();
  return (
    <Link to={ `/${redirectTo(isMeal)}/${id}/in-progress` }>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe"
      >
        {
          continueRecipe(id, isMeal) ? 'Continuar Receita' : 'Iniciar Receita'
        }
      </button>
    </Link>
  );
}
