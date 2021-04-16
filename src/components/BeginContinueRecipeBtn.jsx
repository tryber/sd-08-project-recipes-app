import React from 'react';
import { useHistory, useLocation } from 'react-router';

function BeginContinueRecipeBtn() {
  const history = useHistory();
  const { pathname } = useLocation();
  const arrayId = pathname.split('/')[2];
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(pathname);
  return (
    (!doneRecipes || (doneRecipes && !doneRecipes.some(({ id }) => id === arrayId))) && (
      <button
        onClick={ () => history
          .push(`/${pathname.split('/')[1]}/${arrayId}/in-progress`) }
        data-testid="start-recipe-btn"
        type="button"
        className="beginRecipe-btn regular-button"
      >
        { (inProgressRecipes && pathname.split('/')[1] === 'comidas'
          && inProgressRecipes.meals[arrayId])
          || (inProgressRecipes && pathname.split('/')[1] === 'bebidas'
          && inProgressRecipes.cocktails[arrayId])
          ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>)
  );
}

export default BeginContinueRecipeBtn;
