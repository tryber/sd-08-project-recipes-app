import React from 'react';
import PropTypes from 'prop-types';

function Botao({ testid, tipo, src, func }) {
  return (

    <button
      type="button"
      data-testid={ testid }
      onClick={ func }
      style={ {
        backgroundColor: 'rgb(245, 187, 0)',
        border: 'none',
        height: '15vw',
        width: '15vw',
      } }
    >
      <img
        alt={ `Ícone do Botão de ${tipo}` }
        src={ src }
      />
    </button>

  );
}

Botao.propTypes = {
  testid: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default Botao;
