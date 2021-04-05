import React from 'react';
import PropTypes from 'prop-types';

function BotaoCoracao({ testid, src, func, name }) {
  return (

    <button
      type="button"
      name={ name }
      data-testid={ testid }
      onClick={ func }
      src={ src }
      style={ { background: `url(${src})`,
        backgroundSize: 'cover',
        width: '50px',
        height: '50px' } }
    >
      { ' ' }
    </button>

  );
}

BotaoCoracao.propTypes = {
  testid: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default BotaoCoracao;
