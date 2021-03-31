import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Copy from 'clipboard-copy';
import {
  getLocalStorageDoneRecipe,
} from '../localStorage/doneRecipes';
import {
  saveRecipeFavorites, getRecipeFavoriteById } from '../localStorage/recipeFavorite';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipe({ typeFilter }) {
  const [recipeAll, setRecipeAll] = useState([]);
  const [favorite, setFavorite] = useState('');
  const [copyLink, setCopyLink] = useState(false);

  const onClickFavorite = ({ target }) => {
    const { dataset: { recipeid, indexstate } } = target;
    const recipeData = recipeAll.find((el) => el.id === recipeid);
    const newArrFavorite = favorite.map((el, index) => {
      if (index === Number(indexstate)) return !el;
      return el;
    });
    setFavorite(newArrFavorite);
    saveRecipeFavorites(recipeData, true);
  };

  const setArrThisFavorite = useCallback(() => {
    const getAllRecipe = getLocalStorageDoneRecipe();
    const result = getAllRecipe.reduce((ac) => ac.concat(false), []);
    getAllRecipe.forEach((el, index) => {
      if (getRecipeFavoriteById(el.id)) {
        result[index] = true;
      }
    });
    setFavorite(result);
    setRecipeAll(getAllRecipe);
  }, []);

  const renderTags = (getTags, index) => {
    if (!getTags) return null;
    let tagsArray = [];
    if (!Array.isArray(getTags)) {
      tagsArray = getTags.split(',' || ' ');
    } else {
      tagsArray = getTags.copyWithin();
    }
    return tagsArray.map((el, indice) => (
      <div key={ indice }>
        <span data-testid={ `${index}-${el}-horizontal-tag` }>
          { el }
        </span>
      </div>
    ));
  };

  const onClickCopyLink = ({ target: { dataset: { type } } }) => {
    const [typeRecipe, id] = type.split('-');
    setCopyLink(true);
    Copy(`http://localhost:3000/${typeRecipe}s/${id}`);
  };

  const filter = useCallback(() => {
    const doneRecipes = getLocalStorageDoneRecipe();
    if (typeFilter === 'all') {
      setRecipeAll(doneRecipes);
    } else {
      const result = doneRecipes.filter((el) => el.type === typeFilter);
      setRecipeAll(result);
    }
  }, [typeFilter]);

  useEffect(() => {
    setArrThisFavorite();
  }, [setArrThisFavorite]);

  useEffect(() => {
    filter();
  }, [typeFilter, filter]);

  return (
    <div>
      { recipeAll.map((el, index) => (
        <div key={ el.id }>
          <div>
            <a
              data-recipedatails={ `${el.type}-${el.id}` }
              href={ `http://localhost:3000/${el.type}s/${el.id}` }
            >
              <img
                data-recipedatails={ `${el.type}-${el.id}` }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '100px' } }
                src={ el.image }
                alt={ el.name }
              />
            </a>
          </div>
          <div>
            <button
              data-recipeid={ el.id }
              data-indexstate={ index }
              type="button"
              src={ favorite[index] ? blackHeartIcon : whiteHeartIcon }
              onClick={ onClickFavorite }
            >
              <img
                data-recipeid={ el.id }
                data-indexstate={ index }
                src={ favorite[index] ? blackHeartIcon : whiteHeartIcon }
                alt="favorite"
              />
            </button>
            <button
              onClick={ (e) => onClickCopyLink(e) }
              src={ shareIcon }
              type="button"
              data-type={ `${el.type}-${el.id}` }
            >
              <img
                data-type={ `${el.type}-${el.id}` }
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
              />
            </button>
          </div>
          <div>
            <a
              href={ `http://localhost:3000/${el.type}s/${el.id}` }
              data-recipedatails={ `${el.type}-${el.id}` }
            >
              <h1 data-testid={ `${index}-horizontal-name` }>{el.name}</h1>
            </a>
          </div>
          <div>
            { copyLink && <span>Link copiado!</span>}
          </div>
          <div>
            <h2
              data-testid={ `${index}-horizontal-top-text` }
            >
              {el.area ? `${el.area} - ${el.category}` : el.category}
            </h2>
          </div>
          { el.alcoholicOrNot
          && (
            <div>
              <h2 data-testid={ `${index}-horizontal-top-text` }>
                {el.alcoholicOrNot}
              </h2>
            </div>
          )}
          <div>
            <span data-testid={ `${index}-horizontal-done-date` }>{ el.doneDate}</span>
          </div>
          <div style={ { padding: '10px' } }>
            { renderTags(el.tags, index) }
          </div>
        </div>
      ))}
    </div>
  );
}

CardDoneRecipe.propTypes = {
  typeFilter: PropTypes.string.isRequired,
};

export default CardDoneRecipe;
