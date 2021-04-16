import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton({ dataTestId, recipeId, recipeType }) {
  const { pathname } = useLocation();
  const [message, setMessage] = useState('');

  function handleClick() {
    const path = (recipeId && recipeType) ? `/${recipeType}s/${recipeId}` : pathname;
    copy(`http://localhost:3000${path}`)
      .then(() => setMessage('Link copiado!'))
      .catch(() => setMessage('Não copiou!'));
  }

  if (message) { return (<span>{ message }</span>); }

  return (
    <button
      type="button"
      onClick={ handleClick }
      className="share-like-btn"
    >
      <img
        alt="share-icon"
        src={ share }
        data-testid={ dataTestId }
      />
    </button>
  );
}

ShareButton.propTypes = {
  dataTestId: PropTypes.string,
  recipeId: PropTypes.string,
  recipeType: PropTypes.string,
};

ShareButton.defaultProps = {
  dataTestId: 'share-btn',
  recipeId: '',
  recipeType: '',
};
