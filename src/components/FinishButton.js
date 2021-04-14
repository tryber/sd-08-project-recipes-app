import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FinishButton({ isDone, recipe }) {
  function handleClick() {
    const type = (recipe.idMeal) ? 'Meal' : 'Drink';
    const recipeDoneObject = {
      id: recipe[`id${type}`],
      type,
      area: (recipe.strArea) ? recipe.strArea : '',
      category: (recipe.strCategory) ? recipe.strCategory : '',
      alcoholicOrNot: (recipe.strAlcoholic) ? recipe.strAlcoholic : '',
      name: (recipe[`str${type}`]),
      image: recipe[`str${type}Thumb`],
      doneDate: Date(),
      tags: (recipe.strTags) ? [recipe.strTags] : [],
    };
    const recipesDone = localStorage.getItem('doneRecipes')
      ? JSON.parse(localStorage.getItem('doneRecipes')) : [];
    recipesDone.push(recipeDoneObject);
    localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
  }

  return (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ !isDone }
      >
        Finalizar receita
      </button>
    </Link>
  );
}

FinishButton.propTypes = ({
  isDone: PropTypes.bool.isRequired,
  recipe: PropTypes.shape(PropTypes.string).isRequired,
});
