import React from 'react';
import PropTypes from 'prop-types';

import copy from 'clipboard-copy';

import shareIcon from '../assets/images/shareIcon.svg';

export default function ShareButton({ meal: { idMeal } }) {
  function copyLink(id) {
    copy(`http://localhost:3000/comidas/${id}`);
    document.querySelector('#link').style = 'inline';
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => { copyLink(idMeal); } }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <p id="link" style={ { display: 'none' } }>Link copiado!</p>
    </>
  );
}

ShareButton.propTypes = {
  meal: PropTypes.string.isRequired,
};
