import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function FinishButton({ isDone }) {
  return (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn btn btn-danger"
        disabled={ !isDone }
      >
        Finalizar receita
      </button>
    </Link>
  );
}

FinishButton.propTypes = ({ isDone: PropTypes.bool.isRequired });
