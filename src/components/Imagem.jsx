import React from 'react';
import PropTypes from 'prop-types';
import '../styles/detalhesReceitas.css';

function Imagem({ testid, src, alt }) {
  return (
    <img
      data-testid={ testid }
      alt={ alt }
      src={ src }
      className="img-detalhes"
    />

  );
}

Imagem.propTypes = {
  testid: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Imagem;
