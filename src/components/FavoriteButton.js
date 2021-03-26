import React from 'react';

import PropTypes from 'prop-types';

import blackHeartIcon from '../assets/images/blackHeartIcon.svg';
import whiteHeartIcon from '../assets/images/whiteHeartIcon.svg';

import setStorageMeal from '../helpers/setStorageMeal';
import setStorageDrink from '../helpers/setStorageDrink';

export default function FavoriteButton({ beforeState, setFavorite, recipe, type }) {
  const { favorite } = beforeState;
  function handleClickFavoriteButton() {
    if (!favorite) {
      setFavorite({ ...beforeState, favorite: true });
    } else {
      setFavorite({ ...beforeState, favorite: false });
    }
    if (type === 'comida') return setStorageMeal({ favorite, recipe });
    if (type === 'bebida') return setStorageDrink({ favorite, recipe });
  }

  return (
    <button
      type="button"
      onClick={ handleClickFavoriteButton }
    >
      {favorite ? (
        <img
          src={ blackHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
        />)
        : (
          <img
            src={ whiteHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
          />)}
    </button>
  );
}

FavoriteButton.propTypes = {
  setFavorite: PropTypes.func.isRequired,
  beforeState: PropTypes.node.isRequired,
  recipe: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};
