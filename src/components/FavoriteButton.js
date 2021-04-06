import React from 'react';
import PropTypes from 'prop-types';

import favIconEnabled from '../images/blackHeartIcon.svg';
import favIconDisabled from '../images/whiteHeartIcon.svg';

export default function FavoriteButton({ handleFavBtn, fav }) {
  return (
    <button
      type="button"
      onClick={ handleFavBtn }
      className="action-button"
    >
      <img
        src={ (fav) ? favIconEnabled : favIconDisabled }
        alt="favorite"
        data-testid="favorite-btn"
        className="favorite-icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = ({
  handleFavBtn: PropTypes.func.isRequired,
  fav: PropTypes.bool.isRequired });
