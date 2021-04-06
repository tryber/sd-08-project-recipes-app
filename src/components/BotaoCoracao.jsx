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
      style={ {
        backgroundColor: 'rgb(245, 187, 0)',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        border: 'none',
        height: '10vw',
        width: '10vw',
      } }
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
