import React from 'react';
import PropTypes from 'prop-types';

import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ id, type }) {
  function copyLink(ID, TYPE) {
    if (TYPE === 'meal') {
      copy(`http://localhost:3000/comidas/${ID}`);
      document.getElementById('link').style = 'inline';
    } else {
      copy(`http://localhost:3000/bebidas/${ID}`);
      document.getElementById('link').style = 'inline';
    }
  }

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        className="action-button btn mt-3 p-1"
        onClick={ () => copyLink(id, type) }
      >
        <img src={ shareIcon } alt="share" className="share-icon icon" />
      </button>
      <p id="link" style={ { display: 'none' } }>Link copiado!</p>
    </>
  );
}

ShareButton.propTypes = ({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
