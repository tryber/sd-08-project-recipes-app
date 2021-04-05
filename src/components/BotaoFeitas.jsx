import React from 'react';
import PropTypes from 'prop-types';

function BotaoFeitas({ texto, testid, tipo, func }) {
  return (

    <button
      name={ tipo }
      type="button"
      data-testid={ testid }
      onClick={ func }
    >
      {texto}
    </button>
  );
}

BotaoFeitas.propTypes = {
  testid: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default BotaoFeitas;
