import React from 'react';
import PropTypes from 'prop-types';

import blackHeartIcon from '../images/blackHeartIcon.svg';

import styles from '../styles/components/FavoriteButton.module.css';

const FavoriteButton = ({ onClick, testId }) => (
  <button
    type="button"
    onClick={ onClick }
    className={ styles.favoriteButton }
  >
    <img
      data-testid={ testId }
      src={ blackHeartIcon }
      alt="Share Icon"
    />
  </button>
);

FavoriteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
};

export default FavoriteButton;
