import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

export default function Button() {
  const [isDisabled, setIsDisabled] = useState(false);
  const { isFinished } = useContext(RecipesContext);

  // useEffect(() => { setIsDisabled(isFinished); }, []);
  useEffect(() => {
    if (isFinished) return setIsDisabled(isFinished);
  }, [isFinished]);
  console.log(isFinished);
  return (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isFinished }
      >
        Finalizar Receita
      </button>
    </Link>
  );
}
