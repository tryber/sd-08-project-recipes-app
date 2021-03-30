import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import Recomendations from './Recomendations';
import '../css/Details.css';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';
import YtVideo from './YtVideo';
import buttonTextChanges from '../services/Complexity';

const copy = require('clipboard-copy');

function Details(props) {
  const history = useHistory();
  const { currentFood, ingredients } = props;
  const [disabled, setDisabled] = useState(false);
  const [btnLabel, setLabel] = useState('Iniciar Receita');
  const [doneList] = useState(JSON.parse(
    localStorage.getItem('doneRecipes') || '[]',
  ));
  const [message, setMessage] = useState(false);

  useEffect(() => {
    function disabledBtn() {
      const currentId = currentFood.idMeal || currentFood.idDrink;
      const filterFood = doneList.filter((filter) => (
        filter.id === currentId
      ));
      if (filterFood.length > 0) {
        setDisabled(true);
      }
      if (buttonTextChanges(currentFood)) {
        setLabel('Continuar Receita');
      }
    }
    disabledBtn();
  }, [currentFood]);

  const historyPath = () => (
    history.push(`${history.location.pathname}/in-progress`)
  );

  function loadingScreen() {
    return (
      <div>LOADING...</div>
    );
  }

  function renderMessage() {
    return (
      <span>Link copiado!</span>
    );
  }

  function shareButtonClick() {
    setMessage(true);
    copy(`http://localhost:3000${history.location.pathname}`);
  }

  function renderDetails() {
    return (
      <>
        <img
          src={ currentFood.strMealThumb || currentFood.strDrinkThumb }
          data-testid="recipe-photo"
          alt="Thumbnail"
        />
        <h1 data-testid="recipe-title">
          { currentFood.strMeal || currentFood.strDrink }
        </h1>
        <input
          type="image"
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
          onClick={ shareButtonClick }
        />
        { message ? renderMessage() : null }
        <FavoriteButton currentFood={ currentFood } />
        <h6
          data-testid="recipe-category"
        >
          { currentFood.strAlcoholic
            ? currentFood.strAlcoholic : currentFood.strCategory }
        </h6>
        <h2>Ingredientes</h2>
        <ul>
          { ingredients.map((curr, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              { curr }
            </li>
          ))}
        </ul>
        <h2>Instruções</h2>
        <p data-testid="instructions">{ currentFood.strInstructions }</p>
        <YtVideo currentFood={ currentFood } />
        <Recomendations />
        <Button
          disabled={ disabled }
          className="start-recipe-btn"
          datatestid="start-recipe-btn"
          label={ btnLabel }
          onClick={ historyPath }
        />
      </>
    );
  }

  return (
    <div className="detailsDiv">
      { currentFood.strCategory ? renderDetails() : loadingScreen() }
    </div>
  );
}

Details.propTypes = {
  currentFood: PropTypes.objectOf(PropTypes.any),
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

Details.defaultProps = {
  currentFood: {},
  ingredients: [],
};

export default Details;
