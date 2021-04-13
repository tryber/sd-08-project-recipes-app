import React from 'react';
import PropTypes from 'prop-types';

import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';

export default function FavoriteButton({ handleFavBtn, fav }) {
  return (
    <button
      type="button"
      onClick={ handleFavBtn }
      className="action-button btn mt-3 p-1"
    >
      <img
        src={ (fav) ? favIconEnabled : favIconDisabled }
        alt="favorite"
        data-testid="favorite-btn"
        className="favorite-icon icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = ({
  handleFavBtn: PropTypes.func.isRequired,
  fav: PropTypes.bool.isRequired });
