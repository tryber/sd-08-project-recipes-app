import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { PageProgress } from '../context/ContextProgress';
import { saveDoneRecipes } from '../localStorage/doneRecipes';

import {
  saveRecipeFavorites,
  getRecipeFavoriteById } from '../localStorage/recipeFavorite';
import IngredientList from './IngredientsList';

function CardInProgress({ recipe, type }) {
  const [favorite, setFavorite] = useState(false);
  const [copyLink, setCopyLink] = useState(false);

  const { recipeCompleted } = useContext(PageProgress);

  const idRecipe = recipe.idDrink || recipe.idMeal;
  const thisSave = getRecipeFavoriteById(idRecipe);

  const history = useHistory();

  const onClickFavorite = () => {
    saveRecipeFavorites(recipe);
    setFavorite(!favorite);
  };

  const onClickCopyLink = () => {
    setCopyLink(true);
    const linkType = type === 'drink' ? 'bebidas' : 'comidas';
    Copy(`http://localhost:3000/${linkType}/${idRecipe}`);
  };

  useEffect(() => {
    if (thisSave) {
      setFavorite(true);
    }
  }, [thisSave]);

  return (
    <>
      <div>
        <img
          data-testid="recipe-photo"
          style={ { width: '200px' } }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal }
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h1>
      </div>
      <div>
        <button
          onClick={ () => onClickCopyLink() }
          data-testid="share-btn"
          type="button"
        >
          <img typ="image/svg+xml" src={ shareIcon } alt="share-icon" />
        </button>
      </div>
      <div>
        <button
          onClick={ () => onClickFavorite() }
          data-testid="favorite-btn"
          type="button"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            type="image/svg+xml"
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="t"
          />
        </button>
      </div>
      <div>
        <h2 data-testid="recipe-category">{ recipe.strCategory }</h2>
        { recipe.strAlcoholic ? <h5>{ recipe.strAlcoholic }</h5> : null }
      </div>
      <div>
        { copyLink && <span>Link copiado!</span>}
      </div>
      <div>
        <IngredientList { ...{ recipe, type } } />
      </div>
      <div>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <div>
        <button
          disabled={ recipeCompleted }
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => {
            saveDoneRecipes(recipe);
            history.push({ pathname: '/receitas-feitas', state: { id: idRecipe } });
          } }
        >
          Finalizar receita
        </button>
      </div>
    </>
  );
}

CardInProgress.propTypes = {
  recipe: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.object, PropTypes.array],
  ).isRequired,
  type: PropTypes.string.isRequired,
};

export default CardInProgress;
