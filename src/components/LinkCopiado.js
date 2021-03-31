import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function LinkCopiado() {
  const { copied } = useContext(RecipeContext);
  return (
    <span className="copied-link">{copied && 'Link copiado!'}</span>
  );
}

export default LinkCopiado;
