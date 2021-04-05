import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function BotaoDetalhes({ nome, id }) {
  return (
    <Link
      data-testid="start-recipe-btn"
      to={ `${id}/in-progress` }
      style={ { position: 'fixed', bottom: 0 } }
    >
      {nome}
    </Link>
  );
}

BotaoDetalhes.propTypes = {
  nome: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default BotaoDetalhes;
