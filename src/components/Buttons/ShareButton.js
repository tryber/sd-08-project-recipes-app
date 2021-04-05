import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton({ recipeId, recipeType, testid, onClick }) {
  function shareLink() {
    // const LENGTH_OF_PATH = 16;
    // const domain = window.location.href.slice(0, -LENGTH_OF_PATH);
    const domain = window.location.origin;
    const path = `${domain}/${recipeType}s/${recipeId}`;
    copy(path);
    onClick(true);
  }
  return (
    <button type="button" onClick={ shareLink }>
      <img data-testid={ testid } src={ shareIcon } alt="share icon" />
    </button>
  );
}

ShareButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShareButton;
