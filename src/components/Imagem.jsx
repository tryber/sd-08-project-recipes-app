import React from 'react';
import PropTypes from 'prop-types';

function Imagem({ testid, src, alt }) {
  const CEM = 100;

  return (
    <img
      data-testid={ testid }
      alt={ alt }
      src={ src }
      width={ `${CEM}vh` }
    />

  );
}

Imagem.propTypes = {
  testid: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Imagem;
