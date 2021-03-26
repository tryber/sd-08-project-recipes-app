import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

export default function Button() {
  const { finishButtonState } = useContext(RecipesContext);
  return (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !finishButtonState }
      >
        Finalizar Receita
      </button>
    </Link>
  );
}
