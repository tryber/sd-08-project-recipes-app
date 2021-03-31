import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import '../styles/ButtonFinish.css';
import setDoneRecipes from '../services/setDoneRecipes';

function ButtonFinish({ objDetail }) {
  const { verifyCheckbox } = useContext(RecipeContext);
  const history = useHistory();
  const urlType = history.location.pathname.split('/');
  console.log(urlType);

  const handleFinish = () => {
    setDoneRecipes(objDetail[0], urlType[1]);
    history.push('/receitas-feitas');
  };

  return (
    <button
      className="button-finish"
      type="button"
      data-testid="finish-recipe-btn"
      disabled={ !verifyCheckbox.every((e) => e === true) }
      onClick={ handleFinish }
    >
      Finalizar Receita
    </button>
  );
}

ButtonFinish.propTypes = {
  objDetail: PropTypes.shape(
    PropTypes.any,
  ).isRequired,
};

export default ButtonFinish;
