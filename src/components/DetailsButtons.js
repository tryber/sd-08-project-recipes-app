import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Context from '../context/Context';
// import { saveState } from '../services/LocalStorage';

function SaveFinishedRecipes(id, recipeDetails, route) {
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const recipe = Object.values(recipeDetails[0])[0][0];
  // const tag = Array.isArray(recipe.strTags) ? recipe.strTags.split(',') : recipe.strTags;

  // código que passa nos testes mas não renderiza
  const tag = Array.isArray(recipe.strTags) ? (
    recipe.strTags.split(',') || recipe.strTags) : '';

  // código que renderiza mas não passa nos testes
  // const tag = recipe.strTags ? recipe.strTags.split(',') : '';

  let a = [];
  a = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  if (route === 'comidas') {
    a.push({
      id,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: currentDate,
      tags: tag,
    });
  }
  if (route === 'bebidas') {
    a.push({
      id,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: currentDate,
      tags: tag,
    });
  }
  localStorage.setItem('doneRecipes', JSON.stringify(a));
}

function DetailsButtons({ route, id, page }) {
  const {
    disableButton,
    shouldRedirect,
    setShouldRedirect,
    recipeDetails,
  } = useContext(Context);
  const idsP = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const idsF = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  useEffect(() => {
    if (!Object.values(idsP).includes(id)
      && (window.location.href.endsWith(`/${route}/${id}`)
      || window.location.href.endsWith(`/${route}/${id}/`))) {
      document.getElementById('start-recipe-btn').innerText = 'Iniciar Receita';
    }
  }, []);

  function SaveProgressRecipes(idRecipe) {
    // const recipe = Object.values(recipeDetails[0])[0][0];
    let a = [];
    a = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (route === 'comidas') {
      a.push({
        idRecipe,
        type: route,
      });
    }
    if (route === 'bebidas') {
      a.push({
        idRecipe,
        type: route,
      });
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(a));
  }

  if (shouldRedirect === id) return <Redirect to="/receitas-feitas" />;

  return (
    <div className="d-grid gap-2 details-btns">
      {
        page === 'details' ? (
          <Link
            to={ `/${route}/${id}/in-progress` }
            className="last-btn btn btn-secondary"
            data-testid="start-recipe-btn"
            style={ { display: 'none' } }
            id="start-recipe-btn"
            onClick={ () => {
              idsP.push(id);
              SaveProgressRecipes(id);
            } }
          >
            Continuar Receita
          </Link>
        ) : (
          <button
            to="/receitas-feitas"
            type="submit"
            className={ disableButton ? 'last-btn disable btn btn-primary'
              : 'last-btn btn btn-primary' }
            data-testid="finish-recipe-btn"
            id="finish-recipe-btn"
            disabled={ disableButton }
            onClick={ () => {
              idsF.push(id);
              // localStorage.setItem('doneRecipes', JSON.stringify(idsF));
              SaveFinishedRecipes(id, recipeDetails, route);
              setShouldRedirect(id);
            } }
          >
            Finalizar Receita
          </button>
        )
      }
    </div>
  );
}

DetailsButtons.propTypes = {
  route: PropTypes.string,
  page: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default DetailsButtons;
