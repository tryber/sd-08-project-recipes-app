import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton(props) {
  const [message, setMessage] = useState(false);
  const { path } = props;

  function renderMessage() {
    return (
      <span>Link copiado!</span>
    );
  }

  return (
    <>
      <input
        type="image"
        src={ shareIcon }
        alt="share"
        data-testid="share-btn"
        onClick={ () => setMessage(true) || copy(`http://localhost:3000${path}`) }
      />
      { message ? renderMessage() : null }
    </>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ShareButton;
