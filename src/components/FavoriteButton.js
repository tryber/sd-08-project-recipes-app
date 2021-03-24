import React from 'react';

import PropTypes from 'prop-types';

import favIconEnable from '../assets/images/blackHeartIcon.svg';
import favIconDisable from '../assets/images/whiteHeartIcon.svg';

import setStorage from '../helpers/setStorage';

export default function FavoriteButton({ beforeState, setFavorite, meal }) {
  const { favorite } = beforeState;
  function handleClickFavoriteButton() {
    if (!favorite) {
      setFavorite({ ...beforeState, favorite: true });
    } else {
      setFavorite({ ...beforeState, favorite: false });
    }
    setStorage({ favorite, meal });
  }

  return (
    <button
      type="button"
      onClick={ handleClickFavoriteButton }
    >
      <img
        src={ favorite ? favIconEnable : favIconDisable }
        alt="favorite"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  setFavorite: PropTypes.func.isRequired,
  beforeState: PropTypes.node.isRequired,
  meal: PropTypes.node.isRequired,
};
